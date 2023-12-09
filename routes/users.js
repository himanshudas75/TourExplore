const express = require('express');
const passport = require('passport');

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const User = require("../models/user");
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err)
                return next(err);
            req.flash('success', `Hey ${username}, welcome to TourExplore!`);
            res.redirect('/tourspots');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectURL = res.locals.returnTo || '/tourspots';
    delete res.locals.returnTo;
    res.redirect(redirectURL);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        req.flash('success', 'Logged out successfully');
        res.redirect('/tourspots');
    });
});

module.exports = router;