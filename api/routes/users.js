const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { validateUser, isAuthenticated } = require('../middleware');

router.route('/register').post(validateUser, catchAsync(users.register));

router.route('/login').post(catchAsync(users.login));

router.route('/verify').get(isAuthenticated, users.verify);

router
    .route('/changePassword')
    .put(isAuthenticated, catchAsync(users.changePassword));

router
    .route('/deleteUser')
    .delete(isAuthenticated, catchAsync(users.deleteUser));

module.exports = router;
