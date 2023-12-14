const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/cloudinary');
const Tourspot = require('../models/tourspot');

const generateToken = (user, token_type) => {
    const payload = {
        user_id: user._id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    };
    var secret = process.env.REFRESH_TOKEN_SECRET;

    if (token_type === 'access') {
        secret = process.env.ACCESS_TOKEN_SECRET;
        options.expiresIn = '30s';
    }

    const token = jwt.sign(payload, secret, options);
    return token;
};

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    const check_username = await User.findOne({ username });
    const check_email = await User.findOne({ email });
    if (check_username || check_email) {
        return next({
            statusCode: 409,
            message: 'A user with this username or email already exists',
        });
    }
    const user = new User({
        username: username,
        email: email,
        password: hashSync(password, 12),
    });

    const accessToken = generateToken(user, 'access');
    const refreshToken = generateToken(user, 'refresh');

    user.refreshToken = refreshToken;
    const savedUser = await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
        accessToken: accessToken,
    });
};

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user || !compareSync(password, user.password)) {
        return next({
            statusCode: 401,
            message: 'Invalid username or password',
        });
    }

    const accessToken = generateToken(user, 'access');
    const refreshToken = generateToken(user, 'refresh');
    user.refreshToken = refreshToken;
    const savedUser = await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
        success: true,
        message: 'Logged in successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
        accessToken: accessToken,
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

module.exports.refresh = async (req, res, next) => {
    const accessToken = generateToken(req.user, 'access');
    const refreshToken = generateToken(req.user, 'refresh');

    const user = await User.findById(req.user._id);
    user.refreshToken = refreshToken;
    const savedUser = await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
        success: true,
        message: 'Token refreshed successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
        accessToken: accessToken,
    });
};

module.exports.logout = async (req, res, next) => {
    const cookies = req.cookies;
    const err = {
        statusCode: 204,
    };
    if (!cookies?.jwt) return next(err);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });
        return next(err);
    }

    foundUser.refreshToken = '';
    const savedUser = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({
        message: 'Logged out successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
    });
};

module.exports.changePassword = async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user._id);
    console.log(user);
    user.password = hashSync(password, 12);
    await user.save();
    res.json({
        success: true,
        message: 'Password changed successfully',
        user: {
            user_id: req.user._id,
            username: req.user.username,
        },
    });
};

module.exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    const tourspots = await Tourspot.find({
        author: {
            $eq: user._id,
        },
    });

    for (let tourspot of tourspots) {
        for (let image of tourspot.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
    }

    await User.findByIdAndDelete(req.user._id);
    res.json({
        success: true,
        message: 'User deleted successfully',
        user: {
            user_id: req.user._id,
            username: req.user.username,
        },
    });
};
