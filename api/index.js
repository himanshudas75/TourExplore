if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../.env' });
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const passport = require('./utils/passport');

// ENV vars
const dbUrl = process.env.MONGODB_URL;

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

const tourspotRoutes = require('./routes/tourspots');
// const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const { error } = require('console');

// Routes
app.use('/api/', userRoutes);
app.use('/api/tourspots', tourspotRoutes);
// app.use('/api/tourspots/:id/reviews', reviewRoutes);

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something went wrong';
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});

app.listen(4000, () => {
    console.log('Serving on port 3000');
});
