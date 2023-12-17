const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');
const {
    validateReview,
    isAuthenticated,
    isReviewAuthor,
    isReview,
    isTourspot,
} = require('../middleware');

router.post(
    '/',
    isAuthenticated,
    isTourspot,
    validateReview,
    catchAsync(reviews.createReview)
);
router.delete(
    '/:reviewId',
    isAuthenticated,
    isTourspot,
    isReview,
    isReviewAuthor,
    catchAsync(reviews.deleteReview)
);

module.exports = router;
