const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const { storage } = require('../utils/cloudinary');
// const upload = multer({ storage: storage });

// const catchAsync = require('../utils/catchAsync');
const tourspots = require('../controllers/tourspots');

// const { isLoggedIn, isAuthor, validateTourspot } = require('../middleware');

router.get('/', tourspots.index);

// router
//     .route('/new')
//     .get(isLoggedIn, tourspots.renderNewForm)
//     .post(
//         isLoggedIn,
//         upload.array('tourspot[image]'),
//         validateTourspot,
//         catchAsync(tourspots.createTourspot)
//     );

router.route('/:tourspotId').get(tourspots.showTourspot);
//     .put(
//         isLoggedIn,
//         isAuthor,
//         upload.array('tourspot[image]'),
//         validateTourspot,
//         catchAsync(tourspots.updateTourspot)
//     )
//     .delete(isLoggedIn, isAuthor, catchAsync(tourspots.deleteTourspot));

// router.get(
//     '/:id/edit',
//     isLoggedIn,
//     isAuthor,
//     catchAsync(tourspots.renderEditForm)
// );

module.exports = router;
