const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: String,
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tourspot: {
        type: Schema.Types.ObjectId,
        ref: 'Tourspot',
    },
});

module.exports = mongoose.model('Review', reviewSchema);
