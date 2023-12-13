const { tourspotSchema, reviewSchema, userSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');

const Tourspot = require('./models/tourspot');
const Review = require('./models/review');

const validateMongoId = (id) => {
    if (id.length !== 24) return false;
    const hexRegex = /^[0-9A-Fa-f]+$/;
    return hexRegex.test(id);
};

module.exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = {
                statusCode: 401,
                message: 'Unauthorized',
            };
            return next(error);
        }

        req.user = user;
        next();
    })(req, res, next);
};

module.exports.isTourspotAuthor = async (req, res, next) => {
    const { tourspotId } = req.params;
    const tourspot = await Tourspot.findById(tourspotId);
    if (!tourspot.author.equals(req.user._id)) {
        const error = {
            statusCode: 401,
            message: 'Unauthorized',
        };
        return next(error);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        const error = {
            statusCode: 401,
            message: 'Unauthorized',
        };
        return next(error);
    }
    next();
};

module.exports.isTourspot = async (req, res, next) => {
    const error = {
        statusCode: 404,
        message: 'Tourspot not found',
    };
    const { tourspotId } = req.params;
    if (!validateMongoId(tourspotId)) return next(error);
    const tourspot = await Tourspot.findById(tourspotId);

    if (!tourspot) {
        return next(error);
    }
    next();
};

module.exports.isReview = async (req, res, next) => {
    const error = {
        statusCode: 404,
        message: 'Review not found',
    };
    const { tourspotId, reviewId } = req.params;
    if (!validateMongoId(reviewId)) return next(error);
    const review = await Review.findById(reviewId);
    if (!review || review.tourspot.toString() !== tourspotId) {
        return next(error);
    }
    next();
};

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateTourspot = (req, res, next) => {
    const { error } = tourspotSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};
