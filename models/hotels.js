const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
	hotel_name: {type: String, required: true},
	location: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	present_price: {type: String, required: false,default:"₦--.--"},
	features: {type: [String]},
	updated:{type:Boolean,default:false},
	hotelsNg_link: {type: String, required: true},
	description:String,
	room_types: [{name:String,facilities:[String],price:String}]
});

hotelSchema.index({hotel_name: 1, city: 1, state: 1}, {unique: true, dropDups: true});

//TODO: IGNORE DUPLICATE
module.exports = mongoose.model("hotel", hotelSchema);
