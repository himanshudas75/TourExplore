const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
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

module.exports = passport;
