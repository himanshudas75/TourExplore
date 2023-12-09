const Tourspot = require("../models/tourspot");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.tourspot = tourspot._id;
    tourspot.reviews.push(review);
    await review.save();
    await tourspot.save();
    req.flash("success", "Successfully added a review!");
    res.redirect(`/tourspots/${tourspot._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Tourspot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/tourspots/${id}`);
};
