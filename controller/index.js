const hotelModel = require("../models/hotels");
const limit = parseInt(process.env.LIMIT || 50);

/**
 *
 * @param req
 * @param res
 * @param next
 */
function index(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;

	hotelModel.find({}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotel => {
			if(hotels){
			res.send(Object.assign(hotels,{Notice:"switch to api v2 before the 1st of April ;)."}));
			}else{
				res.status(404)
				res.send({error:"empty object returned"})
			}
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send({error:err.message});
			next()
		})
}

function findByName(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.params.page) || 1)) - 1;
	hotelModel.find({hotel_name: new RegExp(req.params.name, "gi")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotel => {
			if(hotels){
			res.send(Object.assign(hotels,{Notice:"switch to api v2 before the 1st of April ;)."}));
			}else{
				res.status(404)
				res.send({error:"empty object returned"})
			}
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send({error:err.message});
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
	hotelModel.find({city: new RegExp(`^${req.params.city}$`, "i")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotel => {
			if(hotels){
			res.send(Object.assign(hotels,{Notice:"switch to api v2 before the 1st of April ;)."}));
			}else{
				res.status(404)
				res.send({error:"empty object returned"})
			}
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send({error:err.message});
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
	hotelModel.find({state: new RegExp(`^${req.params.state}$`, "i")}, {__v: 0})
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotel => {
			if(hotels){
			res.send(Object.assign(hotels,{Notice:"switch to api v2 before the 1st of April ;)."}));
			}else{
				res.status(404)
				res.send({error:"empty object returned"})
			}
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send({error:err.message});
			next()
		})
}

//api v2
function apiV2Index(req, res, next) {
	"use strict";
	const page = Math.max(1, (parseInt(req.query.page) || 1)) - 1;
	const q = req.query.q ? {hotel_name:new RegExp(req.query.q, "gi")}: {};
	const city = req.query.city ? {city: new RegExp(`^${req.query.city}$`, "i")} : {};
	const state = req.query.state ? {state: new RegExp(`^${req.query.state}$`, "i")} : {};
	const select = req.query.select ? selectParams(req.query.select): {__v:0}
	const findBy = Object.assign({},q,state,city)
	hotelModel.find(findBy, select)
		.limit(limit)
		.skip(page * limit)
		.exec()
		.then(hotel => {
			if(hotels){
				res.send(hotels);
			}else{
				res.status(404)
				res.send({error:"empty object returned"})
			}
			next()
		})
		.catch(err => {
			res.status(503); //Todo find the right status
			res.send({error:err.message});
			next()
		})
}

function apiV2Single(req,res,next){
	const page = Math.max(1, (parseInt(req.query.page) || 1)) - 1;
	const select = req.query.select ? selectParams(req.query.select): {__v:0}
	const id = 	req.params.id 
	const findBy = {_id:id}
	console.log
	hotelModel.findOne(findBy,select)
	.exec()
	.then(hotel => {
		if(hotel){
			res.send(hotel);
		}else{
			res.status(404)
			res.send({error:"empty object returned"})
		}
		next()
	})
	.catch(err => {
		res.status(503); //Todo find the right status
		res.send({error:err.message});
		next()
	})
}

/**
 * 
 * @param {string} str 
 * @returns {Object}
 */
function selectParams(str) {
	const arr = str.split(",")
	let obj = {};
	arr.forEach(f => {
		obj[f] = 1
	});
	return obj
}


module.exports = {
	index,
	findByName,
	findByCity,
	findByState,
	apiV2Index,
	apiV2Single
};