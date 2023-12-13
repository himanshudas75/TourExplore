const { tourspotSchema, reviewSchema, userSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.returnTo = req.originalUrl;
//         req.flash('error', 'You must be signed in to access this page!');
//         return res.redirect('/login');
//     }
//     next();
// };

// module.exports.storeReturnTo = (req, res, next) => {
//     if (req.session.returnTo) {
//         res.locals.returnTo = req.session.returnTo;
//     }
//     next();
// };

// module.exports.isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const tourspot = await Tourspot.findById(id);
//     if (!tourspot.author.equals(req.user._id)) {
//         req.flash('error', 'You do not have the permission to do that');
//         return res.redirect(`/tourspots/${id}`);
//     }
//     next();
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//     const { id, reviewId } = req.params;
//     const review = await Review.findById(reviewId);
//     if (!review.author.equals(req.user._id)) {
//         req.flash('error', 'You do not have the permission to do that');
//         return res.redirect(`/tourspots/${id}`);
//     }
//     next();
// };

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
