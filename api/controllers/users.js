const User = require('../models/user');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log(req.body);
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
