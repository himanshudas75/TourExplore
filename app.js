const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const ExpressError = require("./utils/ExpressError");

// Routes
const tourspotRoutes = require("./routes/tourspots");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

require("dotenv").config();

const connection_string = process.env.MONGODB_URL;
mongoose.connect(connection_string);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());    // Make sure this line is after app.use(session())

// Passport configs
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for flash
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use("/", userRoutes);
app.use("/tourspots", tourspotRoutes);
app.use("/tourspots/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"))
});

app.use((err, req, res, next) => {
    if (!err.statusCode)
        err.statusCode = 500;
    if (!err.message)
        err.message = "Something went wrong";
    res.status(err.statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
