const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAuthor, validateTourspots } = require("../middleware");

const Tourspot = require("../models/tourspot");

router.get(
    "/",
    catchAsync(async (req, res) => {
        const tourspots = await Tourspot.find({});
        res.render("tourspots/index", { tourspots });
    })
);

router.get("/new", isLoggedIn, (req, res) => {
    res.render("tourspots/new");
});

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const tourspot = await Tourspot.findById(req.params.id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            })
            .populate("author");
        if (!tourspot) {
            req.flash("error", "Cannot find that Tourist Spot!");
            return res.redirect("/tourspots");
        }
        res.render("tourspots/show", { tourspot });
    })
);

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res) => {
        const tourspot = await Tourspot.findById(req.params.id);
        if (!tourspot) {
            req.flash("error", "Cannot find that Tourist Spot!");
            return res.redirect("/tourspots");
        }
        res.render("tourspots/edit", { tourspot });
    })
);

router.post(
    "/new",
    isLoggedIn,
    validateTourspots,
    catchAsync(async (req, res) => {
        const tourspot = new Tourspot(req.body.tourspot);
        tourspot.author = req.user._id;
        await tourspot.save();
        req.flash("success", "Successfully created new Tourist Spot!");
        res.redirect(`/tourspots/${tourspot._id}`);
    })
);

router.put(
    "/:id",
    isLoggedIn,
    isAuthor,
    validateTourspots,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const tourspot = await Tourspot.findByIdAndUpdate(id, {
            ...req.body.tourspot,
        });
        req.flash("success", "Successfully updated Tourist Spot!");
        res.redirect(`/tourspots/${tourspot._id}`);
    })
);

router.delete(
    "/:id",
    isLoggedIn,
    isAuthor,
    catchAsync(async (req, res) => {
        const { id } = req.params;
        await Tourspot.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted Tourist Spot!");
        res.redirect("/tourspots");
    })
);

module.exports = router;
