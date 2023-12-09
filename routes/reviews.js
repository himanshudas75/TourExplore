const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const Tourspot = require("../models/tourspot");
const Review = require("../models/review");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

router.post(
    "/",
    isLoggedIn,
    validateReview,
    catchAsync(async (req, res) => {
        const tourspot = await Tourspot.findById(req.params.id);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        review.tourspot = tourspot._id;
        tourspot.reviews.push(review);
        await review.save();
        await tourspot.save();
        req.flash("success", "Successfully added a review!");
        res.redirect(`/tourspots/${tourspot._id}`);
    })
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Tourspot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Successfully deleted review!");
        res.redirect(`/tourspots/${id}`);
    })
);

module.exports = router;
