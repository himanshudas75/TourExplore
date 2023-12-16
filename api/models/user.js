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
        const tourspots = await Tourspot.find({
            author: {
                $eq: doc._id,
            },
        });

        for (let tourspot of tourspots) {
            await Review.deleteMany({
                _id: {
                    $in: tourspot.reviews,
                },
            });
        }

        await Review.deleteMany({
            author: {
                $eq: doc._id,
            },
        });

        await Tourspot.deleteMany({
            author: {
                $eq: doc._id,
            },
        });
    }
});

module.exports = mongoose.model('User', userSchema);
