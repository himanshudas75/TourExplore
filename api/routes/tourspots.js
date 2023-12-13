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
} = require('../middleware');

router.get('/', tourspots.index);

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
    .get(tourspots.showTourspot)
    .put(
        isAuthenticated,
        isTourspotAuthor,
        upload.array('tourspot[image]'),
        validateTourspot,
        catchAsync(tourspots.updateTourspot)
    );
//     .delete(isLoggedIn, isAuthor, catchAsync(tourspots.deleteTourspot));

module.exports = router;
