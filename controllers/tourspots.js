const Tourspot = require("../models/tourspot");

module.exports.index = async (req, res) => {
    const tourspots = await Tourspot.find({});
    res.render("tourspots/index", { tourspots });
};

module.exports.renderNewForm = (req, res) => {
    res.render("tourspots/new");
};

module.exports.createTourspot = async (req, res) => {
    const tourspot = new Tourspot(req.body.tourspot);
    tourspot.author = req.user._id;
    await tourspot.save();
    req.flash("success", "Successfully created new Tourist Spot!");
    res.redirect(`/tourspots/${tourspot._id}`);
};

module.exports.showTourspot = async (req, res) => {
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
};

module.exports.renderEditForm = async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.id);
    if (!tourspot) {
        req.flash("error", "Cannot find that Tourist Spot!");
        return res.redirect("/tourspots");
    }
    res.render("tourspots/edit", { tourspot });
};

module.exports.updateTourspot = async (req, res) => {
    const { id } = req.params;
    const tourspot = await Tourspot.findByIdAndUpdate(id, {
        ...req.body.tourspot,
    });
    req.flash("success", "Successfully updated Tourist Spot!");
    res.redirect(`/tourspots/${tourspot._id}`);
};

module.exports.deleteTourspot = async (req, res) => {
    const { id } = req.params;
    await Tourspot.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted Tourist Spot!");
    res.redirect("/tourspots");
};
