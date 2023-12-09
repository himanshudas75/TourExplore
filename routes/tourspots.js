const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const tourspots = require('../controllers/tourspots');

const { isLoggedIn, isAuthor, validateTourspots } = require('../middleware');

router.get('/', catchAsync(tourspots.index));

router
    .route('/new')
    .get(isLoggedIn, tourspots.renderNewForm)
    .post(isLoggedIn, validateTourspots, catchAsync(tourspots.createTourspot));

router
    .route('/:id')
    .get(catchAsync(tourspots.showTourspot))
    .put(
        isLoggedIn,
        isAuthor,
        validateTourspots,
        catchAsync(tourspots.updateTourspot)
    )
    .delete(isLoggedIn, isAuthor, catchAsync(tourspots.deleteTourspot));

router.get(
    '/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(tourspots.renderEditForm)
);

module.exports = router;
