const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage: storage });

const catchAsync = require('../utils/catchAsync');
const tourspots = require('../controllers/tourspots');

const {
    validateTourspot,
    isAuthenticated,
    isTourspotAuthor,
    isTourspot,
} = require('../middleware');

router.get('/', catchAsync(tourspots.index));

router
    .route('/new')
    .post(
        isAuthenticated,
        upload.array('tourspot[image]'),
        validateTourspot,
        catchAsync(tourspots.createTourspot)
    );

router
    .route('/:tourspotId/')
    .get(isTourspot, catchAsync(tourspots.showTourspot))
    .put(
        isAuthenticated,
        isTourspot,
        isTourspotAuthor,
        upload.array('tourspot[image]'),
        validateTourspot,
        catchAsync(tourspots.updateTourspot)
    )
    .delete(
        isAuthenticated,
        isTourspot,
        isTourspotAuthor,
        catchAsync(tourspots.deleteTourspot)
    );

module.exports = router;
