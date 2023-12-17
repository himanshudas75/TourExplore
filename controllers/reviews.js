const Tourspot = require('../models/tourspot');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.tourspotId);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.tourspot = tourspot._id;
    tourspot.reviews.push(review);
    await review.save();
    await tourspot.save();
    res.json({
        success: true,
        message: 'Review created',
        review: review._id,
    });
};

module.exports.deleteReview = async (req, res) => {
    const { tourspotId, reviewId } = req.params;
    await Tourspot.findByIdAndUpdate(tourspotId, {
        $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.json({
        success: true,
        message: 'Review deleted',
        review: reviewId,
    });
};
