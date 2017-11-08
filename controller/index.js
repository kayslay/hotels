const hotelModel = require("../models/hotels");

/**
 *
 * @param req
 * @param res
 * @param next
 */
function index(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;

	const limit = parseInt(process.env.LIMIT || 50);
	hotelModel.find({}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotels => {
			res.send(hotels);
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send("error: " + err.message);
			next()
		})
}

function findByName(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;
	const limit = parseInt(process.env.LIMIT || 50);
	hotelModel.find({hotel_name: new RegExp(req.params.name, "gi")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotels => {
			res.send(hotels);
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send("error: " + err.message);
			next()
		})
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function findByCity(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;
	const limit = parseInt(process.env.LIMIT || 50);
	hotelModel.find({city: new RegExp(`^${req.params.city}$`, "i")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotels => {
			res.send(hotels);
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send("error: " + err.message);
			next()
		})
}

/**
 *
 * @param req {http.} request
 * @param res response
 * @param next next
 */
function findByState(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;
	const limit = parseInt(process.env.LIMIT || 50);
	hotelModel.find({state: new RegExp(`^${req.params.state}$`, "i")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotels => {
			res.send(hotels);
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send("error: " + err.message);
			next()
		})
}

module.exports = {
	index,
	findByName,
	findByCity,
	findByState
};