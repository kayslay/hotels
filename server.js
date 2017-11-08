const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const crawler = require("./lib/hotels_crawl");

const env = process.env;

//Mongo set up
mongoose.Promise = Promise;

mongoose.connect(env.MONGO_URI);

//
server.listen((env.PORT || 8000), () => {
	console.log(`server ${server.name} running on port ${server.address().port}`)
});

//run this function when u want to crawl
crawler()


process.on("uncaughtException", (arg) => {
	console.log(arg)
});