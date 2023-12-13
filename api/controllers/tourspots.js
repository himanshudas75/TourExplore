const Tourspot = require('../models/tourspot');
const { cloudinary } = require('../utils/cloudinary');
const { findLocation } = require('../utils/findLocation');

module.exports.index = async (req, res) => {
    const tourspots = await Tourspot.find({});
    res.json(tourspots);
};

module.exports.createTourspot = async (req, res) => {
    const tourspot = new Tourspot(req.body.tourspot);
    tourspot.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    tourspot.author = req.user._id;
    tourspot.geometry = await findLocation(tourspot.location);
    await tourspot.save();
    res.json(tourspot);
};

module.exports.showTourspot = async (req, res) => {
    const tourspot = await Tourspot.findById(req.params.tourspotId)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('author');
    if (!tourspot) {
        res.json({ error: 'Not found' });
    }
    res.json(tourspot);
};

module.exports.updateTourspot = async (req, res, next) => {
    const { tourspotId } = req.params;
    const tourspot = await Tourspot.findByIdAndUpdate(tourspotId, {
        ...req.body.tourspot,
    });

    if (!tourspot) {
        const error = {
            statusCode: 404,
            message: 'Tourspot not found',
        };
        return next(error);
    }

    const images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
    }));
    tourspot.images.push(...images);
    await tourspot.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await tourspot.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } },
        });
    }

    res.json({
        success: true,
        message: 'Successfully updated tourspot',
    });
};

// module.exports.deleteTourspot = async (req, res) => {
//     const { id } = req.params;
//     await Tourspot.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted Tourist Spot!');
//     res.redirect('/tourspots');
// };
