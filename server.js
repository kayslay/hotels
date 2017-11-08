const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const crawler = require("./lib/hotels_crawl");

const env = process.env;

mongoose.Promise = Promise;

mongoose.connect(env.MONGO_URI);


server.listen((env.PORT || 8000), () => {
	console.log(`server ${server.name} running on port ${server.address().port}`)
});

//Todo run once and once alone
crawler()


process.on("uncaughtException", (arg) => {
	console.log(arg)
});