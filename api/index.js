if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../.env' });
}

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

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

const tourspotRoutes = require('./routes/tourspots');
// const reviewRoutes = require('./routes/reviews');
// const userRoutes = require('./routes/users');

// Routes
// app.use('/api/', userRoutes);
app.use('/api/tourspots', tourspotRoutes);
// app.use('/api/tourspots/:id/reviews', reviewRoutes);

app.listen(4000, () => {
    console.log('Serving on port 3000');
});
