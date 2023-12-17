const Tourspot = require('../models/tourspot');
const { cloudinary } = require('../utils/cloudinary');
const { findLocation } = require('../utils/findLocation');

module.exports.getAllTourspots = async (req, res) => {
    const tourspots = await Tourspot.find({})
        .populate('author', 'username')
        .sort({ createdAt: -1 });
    tourspots.forEach((tourspot) => {
        tourspot.images.sort((a, b) => b.createdAt - a.createdAt);
    });

    res.json({
        success: true,
        message: 'Successfully fetched all tourspots',
        tourspots: tourspots,
    });
};

module.exports.getTourspot = async (req, res) => {
    const tourspot = await Tourspot.findOne({ _id: req.params.tourspotId })
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                select: 'username',
            },
        })
        .populate('author', 'username');

    // Sort the data
    tourspot.reviews = tourspot.reviews.sort(
        (a, b) => b.createdAt - a.createdAt
    );
    tourspot.images = tourspot.images.sort((a, b) => b.createdAt - a.createdAt);

    // Add thumbnail info
    const imagesWithVirtual = tourspot.images.map((image) => ({
        ...image.toJSON(),
        thumbnail: image.thumbnail,
    }));
    const tourspotJSON = tourspot.toJSON();
    tourspotJSON.images = imagesWithVirtual;

    res.json({
        success: true,
        message: 'Successfully fetched tourspot',
        tourspot: tourspotJSON,
    });
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
    res.json({
        success: true,
        message: 'Tourspot created',
        tourspot: tourspot._id,
    });
};

module.exports.updateTourspot = async (req, res, next) => {
    const { tourspotId } = req.params;
    const tourspot = await Tourspot.findByIdAndUpdate(tourspotId, {
        ...req.body.tourspot,
    });

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
        tourspot: tourspot._id,
    });
};

module.exports.deleteTourspot = async (req, res) => {
    const { tourspotId } = req.params;
    const tourspot = await Tourspot.findById(tourspotId);

    for (let image of tourspot.images) {
        await cloudinary.uploader.destroy(image.filename);
    }

    await Tourspot.findByIdAndDelete(tourspotId);
    res.json({
        success: true,
        message: 'Successfully deleted tourspot',
        tourspot: tourspotId,
    });
};
