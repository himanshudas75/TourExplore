const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tourspot = require('../models/tourspot');
const Review = require('../models/review');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // Delete all the tourspots and their reviews whose author is this user
        const tourspots = await Tourspot.find(
            {
                author: {
                    $eq: doc._id,
                },
            },
            'reviews'
        );

        for (let tourspot of tourspots) {
            await Review.deleteMany({
                _id: {
                    $in: tourspot.reviews,
                },
            });
        }

        await Tourspot.deleteMany({
            author: {
                $eq: doc._id,
            },
        });

        // Now delete all the reviews written by this user
        const userReviews = await Review.find(
            {
                author: { $eq: doc._id },
            },
            '_id tourspot'
        );

        const temp_set = new Set();
        userReviews.forEach((review) => {
            if (!temp_set.has(review.tourspot.toString())) {
                temp_set.add(review.tourspot.toString());
            }
        });
        const tourspotIds = Array.from(temp_set);

        temp_set.clear();
        userReviews.forEach((review) => {
            if (!temp_set.has(review._id.toString())) {
                temp_set.add(review._id.toString());
            }
        });
        const reviewIds = Array.from(temp_set);

        await Tourspot.updateMany(
            {
                _id: {
                    $in: tourspotIds,
                },
            },
            {
                $pull: {
                    reviews: {
                        $in: reviewIds,
                    },
                },
            }
        );

        await Review.deleteMany({
            _id: {
                $in: reviewIds,
            },
        });
    }
});

module.exports = mongoose.model('User', userSchema);
