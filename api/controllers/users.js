const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/cloudinary');
const Tourspot = require('../models/tourspot');

const generateToken = (user) => {
    const payload = {
        user_id: user._id,
        username: user.username,
    };

    const options = {
        expiresIn: '1d',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
};

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: hashSync(password, 12),
    });

    const savedUser = await user.save();
    const token = generateToken(user);

    res.json({
        success: true,
        message: 'User created successfully',
        user: {
            user_id: savedUser._id,
            username: savedUser.username,
        },
        token: 'Bearer ' + token,
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

    const token = generateToken(user);

    res.json({
        success: true,
        message: 'Logged in successfully',
        user: {
            user_id: user._id,
            username: user.username,
        },
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
