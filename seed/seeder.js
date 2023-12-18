const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../utils/mongoConnect');
const { hashSync } = require('bcrypt');
const { cloudinary } = require('../utils/cloudinary');
const fs = require('fs');

const User = require('../models/user');
const Tourspot = require('../models/tourspot');
const Review = require('../models/review');

// Seeding data
const { getCountryData } = require('countries-list');
const cities = require('cities.json');
const users = require('./seed_users.json');
const tourspot_names = require('./seed_tourspot_names.json');
const tourspot_descriptions = require('./seed_tourspot_descriptions.json');
const reviews = require('./seed_reviews.json');

const db = connectDB();

const user_ids = [];
const tourspot_images = [];

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const clearDatabase = async () => {
    console.log('Clearing database...');
    await User.deleteMany({});
    await Tourspot.deleteMany({});
    await Review.deleteMany({});
};

const generatePassword = (username) => {
    // const passowrd = 'test'; // Implement password generating logic here
    const encrypted_password = hashSync(password, 12);
    return encrypted_password;
};

const getRandom = (array, num = 1) => {
    if (array.length === 0) {
        return null;
    }
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    const randomElements = shuffledArray.slice(0, num);

    if (num === 1) return randomElements[0];
    else return randomElements;
};

const getAllImages = async (remote_dir) => {
    tourspot_images.length = 0;
    const result = await cloudinary.search
        .expression(`folder:${remote_dir}`)
        .execute();
    result.resources.forEach((resource) => {
        tourspot_images.push({
            filename: resource.public_id,
            url: resource.secure_url,
        });
    });
};

const deleteAllImages = async (remote_dir) => {
    console.log('Deleting all images from cloudinary...');
    const result = await getAllImages(remote_dir);
    await sleep(1000);
    const filenames = tourspot_images.map((image) => image.filename);
    await cloudinary.uploader.destroy(filenames);
    tourspot.length = 0;
};

const getRandomLocation = () => {
    city = getRandom(cities);
    country = getCountryData(city.country);
    const data = {
        location: city.name + ', ' + country.name,
        geometry: {
            type: 'Point',
            coordinates: [parseFloat(city.lat), parseFloat(city.lng)],
        },
    };
    return data;
};

const getRandomReview = () => {
    const review = new Review({
        ...getRandom(reviews),
        author: getRandom(user_ids),
    });

    return review;
};

const uploadImage = async (folder, image) => {
    try {
        await cloudinary.uploader.upload(image, {
            folder: folder,
        });
    } catch (e) {
        console.error(e);
    }
};

const getUsers = async () => {
    const users = await User.find({});
    users.forEach((user) => {
        user_ids.push(user._id.toString());
    });
};

const seedImages = async (img_dir, remote_dir) => {
    console.log('Seeding images...');
    full_path = path.join(__dirname, img_dir);
    const filenames = fs.readdirSync(full_path);
    const filePaths = filenames.map((filename) =>
        path.join(full_path, filename)
    );

    for (const image of filePaths) {
        await uploadImage(remote_dir, image);
        console.log('Uploaded ' + image);
        await sleep(1000);
    }
};

const seedUsers = async () => {
    console.log('Seeding users...');
    for (const user of users) {
        user.password = generatePassword(user.username);
        const created_user = new User(user);
        await created_user.save();
    }
};

const seedTourspots = async () => {
    console.log('Seeding tourspots...');
    for (const [index, name] of tourspot_names.entries()) {
        process.stdout.write(`\rSeeding tourspot ${index + 1}         `);
        const data = {
            title: name,
            images: getRandom(tourspot_images, 2),
            expected_budget: Math.floor(Math.random() * 1001),
            description: getRandom(tourspot_descriptions),
            author: getRandom(user_ids),
            ...getRandomLocation(),
        };
        const tourspot = new Tourspot(data);
        for (let i = 0; i < 4; i++) {
            const review = getRandomReview();
            review.tourspot = tourspot._id;
            tourspot.reviews.push(review._id);
            await review.save();
        }
        await tourspot.save();
    }
    console.log();
};

const seed = async () => {
    await clearDatabase();
    // await deleteAllImages('TourExplore');
    // await seedImages('./images', 'TourExplore');
    // await getAllImages('TourExplore');
    await seedUsers();
    await getUsers();
    await seedTourspots();
};

seed().then(() => {
    db.closeDB();
});
