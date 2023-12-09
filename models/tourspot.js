const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const tourspotSchema = new Schema({
    title: String,
    image: String,
    expected_budget: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
});

tourspotSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Tourspot', tourspotSchema);