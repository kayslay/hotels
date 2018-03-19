const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
	hotel_name: {type: String, required: false},
	location: {type: String, required: false},
	city: {type: String, required: false},
	state: {type: String, required: false},
	present_price: {type: String, required: false},
	features: {type: [String]},
	hotelsNg_link: {type: String, required: false},
	description:String,
	room_types: {name:String,facilities:[String],price:String}
});

hotelSchema.index({hotel_name: 1, city: 1, state: 1}, {unique: true, dropDups: true});

//TODO: IGNORE DUPLICATE
module.exports = mongoose.model("hotel", hotelSchema);
