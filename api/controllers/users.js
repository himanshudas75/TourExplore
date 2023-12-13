const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');

// module.exports.renderRegisterForm = (req, res) => {
//     res.render('users/register');
// };

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: hashSync(password, 12),
    });

    const savedUser = await user.save();

    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
    });
};

// module.exports.renderLoginForm = (req, res) => {
//     res.render('users/login');
// };

module.exports.login = async (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user || !compareSync(password, user.password)) {
        return next({
            statusCode: 401,
            message: 'Invalid username or password',
        });
    }

    const payload = {
        user_id: user._id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    res.json({
        success: true,
        message: 'Logged in successfully',
        token: 'Bearer ' + token,
    });
};

module.exports.verify = (req, res) => {
    res.json({
        success: true,
        message: 'User verified successfully',
        user: {
            user_id: req.user._id,
            username: req.user.username,
        },
    });
};
// module.exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         req.flash('success', 'Logged out successfully');
//         res.redirect('/tourspots');
//     });
// };
