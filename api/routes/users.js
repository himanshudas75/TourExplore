const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { validateUser } = require('../middleware');

router
    .route('/register')
    // .get(users.renderRegisterForm)
    .post(validateUser, catchAsync(users.register));

router.route('/login').post(catchAsync(users.login));
// .get(users.renderLoginForm)
// .post(
//     storeReturnTo,
//     passport.authenticate('local', {
//         failureFlash: true,
//         failureRedirect: '/login',
//     }),
//     users.login
// );

router
    .route('/verify')
    .get(passport.authenticate('jwt', { session: false }), users.verify);

// router.get('/logout', users.logout);

module.exports = router;
