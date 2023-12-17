const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const accessOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: accessSecret,
};

passport.use(
    'access',
    new JwtStrategy(accessOptions, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({ _id: jwt_payload.user_id });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies.jwt;
    }
    return token;
};

const refreshOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: refreshSecret,
    passReqToCallback: true,
};

passport.use(
    'refresh',
    new JwtStrategy(refreshOptions, async (req, jwt_payload, done) => {
        try {
            const user = await User.findOne({ refreshToken: req.cookies.jwt });
            // delete refresh token from db over here for multiple refresh tokens
            if (jwt_payload.user_id === user._id.toString()) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

module.exports = passport;
