if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Tourspot = require('../models/tourspot');

const connection_string = process.env.MONGODB_URL;
mongoose.connect(connection_string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => Math.floor(Math.random() * array.length);
const seedDB = async () => {
    await Tourspot.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random_index = sample(cities);
        const expected_budget = Math.floor(Math.random() * 20) + 10;
        const tourspot = new Tourspot({
            author: '6574555ae2774951a10233d9',
            location: `${cities[random_index].city}, ${cities[random_index].state}`,
            title: `${descriptors[sample(descriptors)]} ${
                places[sample(places)]
            }`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quibusdam doloribus blanditiis repellat soluta nesciunt corrupti iste saepe, quaerat magnam rem quod voluptatibus commodi, perferendis ipsam officia tempora fugiat iusto.',
            images: [
                {
                    url: 'https://res.cloudinary.com/dmkghofuf/image/upload/v1702126131/TourExplorer/qd6i6awc0rjqp6rk3qdy.jpg',
                    filename: 'TourExplorer/qd6i6awc0rjqp6rk3qdy',
                },
                // {
                //     url: 'https://res.cloudinary.com/dmkghofuf/image/upload/v1702121838/TourExplore/s85jjar2ttqdaxh3snet.png',
                //     filename: 'TourExplore/s85jjar2ttqdaxh3snet',
                // },
            ],
            expected_budget: expected_budget,
            geometry: {
                type: 'Point',
                coordinates: [47.60322952, -122.33027649],
            },
        });
        await tourspot.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
