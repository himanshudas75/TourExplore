const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const Tourspot = require("../models/tourspot");
const Review = require("../models/review");

const { reviewSchema } = require("../schemas");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
};

router.post("/", validateReview, catchAsync(async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.id);
    const review = new Review(req.body.review);
    tourspot.reviews.push(review);
    await review.save();
    await tourspot.save();
    req.flash('success', 'Successfully added a review!');
    res.redirect(`/tourspots/${tourspot._id}`);
}));

router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Tourspot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/tourspots/${id}`);
}));

module.exports = router;