const express = require('express');
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const Tourspot = require("../models/tourspot");

const { tourspotSchema } = require("../schemas");

const validateTourspots = (req, res, next) => {
    const { error } = tourspotSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
};

router.get("/", catchAsync(async (req, res) => {
    const tourspots = await Tourspot.find({});
    res.render("tourspots/index", { tourspots });
}));

router.get("/new", (req, res) => {
    res.render("tourspots/new");
});

router.get("/:id", catchAsync(async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.id).populate('reviews');
    if (!tourspot) {
        req.flash('error', 'Cannot find that Tourist Spot!');
        return res.redirect("/tourspots");
    }
    res.render("tourspots/show", { tourspot });
}));

router.get("/:id/edit", catchAsync(async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.id);
    if (!tourspot) {
        req.flash('error', 'Cannot find that Tourist Spot!');
        return res.redirect("/tourspots");
    }
    res.render("tourspots/edit", { tourspot });
}));

router.post("/", validateTourspots, catchAsync(async (req, res) => {
    const tourspot = new Tourspot(req.body.tourspot);
    await tourspot.save();
    req.flash('success', 'Successfully created new Tourist Spot!');
    res.redirect(`/tourspots/${tourspot._id}`);
}));

router.put("/:id", validateTourspots, catchAsync(async (req, res) => {
    const { id } = req.params;
    const tourspot = await Tourspot.findByIdAndUpdate(id, { ...req.body.tourspot });
    req.flash('success', 'Successfully updated Tourist Spot!');
    res.redirect(`/tourspots/${tourspot._id}`);
}));

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Tourspot.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Tourist Spot!');
    res.redirect('/tourspots');
}));

module.exports = router;