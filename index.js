// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config({ path: './.env' });
// }

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('./utils/passport');

const dbUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

require('./models/user');
require('./models/review');
require('./models/tourspot');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    })
);

app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    mongoSanitize({
        replaceWith: '_',
    })
);

app.use(helmet());
const scriptSrcUrls = [
    'https://stackpath.bootstrapcdn.com/',
    'http://www.bing.com',
    'http://r.bing.com',
    'https://kit.fontawesome.com/',
    'https://cdnjs.cloudflare.com/',
    'https://cdn.jsdelivr.net',
    'https://dev.virtualearth.net',
];
const styleSrcUrls = [
    'https://cdn.jsdelivr.net',
    'http://r.bing.com',
    'https://kit-free.fontawesome.com/',
    'https://stackpath.bootstrapcdn.com/',
    'https://fonts.googleapis.com/',
    'https://use.fontawesome.com/',
];
const connectSrcUrls = [
    'http://www.bing.com',
    'https://t.ssl.ak.tiles.virtualearth.net',
];
const fontSrcUrls = [];
const imgSrcUrls = [
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
    'https://images.unsplash.com/',
    'https://wallpapercave.com/',
    'https://images.pexels.com/',
    'https://t.ssl.ak.dynamic.tiles.virtualearth.net',
    'http://r.bing.com',
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", 'blob:'],
            objectSrc: [],
            imgSrc: ["'self'", 'blob:', 'data:', ...imgSrcUrls],
            fontSrc: ["'self'", 'data:', ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());

const tourspotRoutes = require('./routes/tourspots');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

// Routes
app.use('/api/', userRoutes);
app.use('/api/tourspots', tourspotRoutes);
app.use('/api/tourspots/:tourspotId/reviews', reviewRoutes);

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something went wrong';
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
