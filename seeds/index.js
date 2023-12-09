const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Tourspot = require("../models/tourspot");

require("dotenv").config();

const connection_string = process.env.MONGODB_URL;
mongoose.connect(connection_string);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => Math.floor(Math.random() * array.length);
const seedDB = async () => {
    await Tourspot.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random_index = sample(cities);
        const expected_budget = Math.floor(Math.random() * 20) + 10;
        const tourspot = new Tourspot({
            author: "6574190fd46f2e47fabfbadc",
            location: `${cities[random_index].city}, ${cities[random_index].state}`,
            title: `${descriptors[sample(descriptors)]} ${
                places[sample(places)]
            }`,
            image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quibusdam doloribus blanditiis repellat soluta nesciunt corrupti iste saepe, quaerat magnam rem quod voluptatibus commodi, perferendis ipsam officia tempora fugiat iusto.",
            expected_budget: expected_budget,
        });
        await tourspot.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
