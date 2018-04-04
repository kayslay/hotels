const crawler = require("web-crawljs");
const mongoose = require("mongoose");
require("dotenv").config();
const hotelModel = require("../models/hotels");
const updateFeatures = require("./hotels_update")


const env = process.env;

//Mongo set up
mongoose.Promise = Promise;

mongoose.connect(env.MONGO_URI);

/**
 * @description removes duplicate hotels from the hotels array
 * @param {hotelModel[]} arr an array of the hotels gotten from crawl
 * @returns {Array.<T>|*} the unique array
 */
function makeUnique(arr) {
	"use strict";
	const key = {};
	return arr.filter(hotel => {
		if (key[`${hotel.hotel_name}_${hotel.city}_${hotel.state}`]) {
			return false
		}
		key[`${hotel.hotel_name}_${hotel.city}_${hotel.state}`] = true;
		return true
	})
}

let allData = [];

const config = {
	fetchSelector: {
		hotel_name: "div.about-item > h2 > a",
		location: "div p.item-location span",
		city: "div p.item-location a:first-child",
		state: "div p.item-location a:nth-child(2)",
		present_price: "div.present-price span",
		features: ".item-features",
		hotelsNg_link: "div.about-item > h2 > a"
	},
	fetchSelectBy: {
		hotel_name: "text",
		location: "text",
		city: "text",
		state: "text",
		present_price: "text",
		features: "text",
		hotelsNg_link: ['attr', 'href']
	},
	nextSelector: {
		links: 'ul.pagination  a'
	},
	nextSelectBy: {
		links: ['attr', 'href']
	},

	fetchFn: (err, data, url) => {
		if (err) console.error(err.message);
		const val = [];
		// format data
		data.hotel_name.forEach((item, i) => {
			"use strict";
			//cre
			let f = data.features[i].trim().replace(/(\s{2,}|\n)/g, ":");
			f = (f.length > 0) ? f.split(":") : [];
			let location = data.location[i] ? data.location[i] : " ";
			val.push({
				hotel_name: item.trim(),
				location: location.trim().replace(/(\n|\s\s)/g, ""),
				city: data.city[i].replace(/,$/, ""),
				state: data.state[i],
				present_price: data.present_price[i],
				features: f,
				hotelsNg_link: data.hotelsNg_link[i]
			})
		});
		allData = allData.concat(val)
	},
	finalFn: function () {
		console.log("allData length ", allData.length, makeUnique(allData).length);
		hotelModel.create(makeUnique(allData)).then(model => {
				allData = [];
				console.log("model inserted", model.length)
				updateFeatures()
			})
			.catch(err => {
				allData = [];
				console.error(err)
			})
	},
	depth: process.env.DEPTH,
	//these are the links we start the crawl form
	urls: [
		"https://hotels.ng/hotels-in-abia",
		// "https://hotels.ng/hotels-in-abuja",
		// "https://hotels.ng/hotels-in-adamawa",
		// "https://hotels.ng/hotels-in-akwaibom",
		// "https://hotels.ng/hotels-in-anambra",
		// "https://hotels.ng/hotels-in-bauchi",
		// "https://hotels.ng/hotels-in-bayelsa",
		// "https://hotels.ng/hotels-in-benue",
		// "https://hotels.ng/hotels-in-borno",
		// "https://hotels.ng/hotels-in-crossriver",
		// "https://hotels.ng/hotels-in-delta",
		// "https://hotels.ng/hotels-in-ebonyi",
		// "https://hotels.ng/hotels-in-edo",
		// "https://hotels.ng/hotels-in-ekiti",
		// "https://hotels.ng/hotels-in-enugu",
		// "https://hotels.ng/hotels-in-gombe",
		// "https://hotels.ng/hotels-in-imo",
		// "https://hotels.ng/hotels-in-jigawa",
		// "https://hotels.ng/hotels-in-kaduna",
		// "https://hotels.ng/hotels-in-kano",
		// "https://hotels.ng/hotels-in-katsina",
		// "https://hotels.ng/hotels-in-kebbi",
		// "https://hotels.ng/hotels-in-kogi",
		// "https://hotels.ng/hotels-in-kwara",
		// "https://hotels.ng/hotels-in-lagos",
		// "https://hotels.ng/hotels-in-nasarawa",
		// "https://hotels.ng/hotels-in-niger",
		// "https://hotels.ng/hotels-in-ogun",
		// "https://hotels.ng/hotels-in-ondo",
		// "https://hotels.ng/hotels-in-osun",
		// "https://hotels.ng/hotels-in-oyo",
		// "https://hotels.ng/hotels-in-plateau",
		// "https://hotels.ng/hotels-in-rivers",
		// "https://hotels.ng/hotels-in-sokoto",
		// "https://hotels.ng/hotels-in-taraba",
		// "https://hotels.ng/hotels-in-yobe",
		// "https://hotels.ng/hotels-in-zamfara",
		// "https://hotels.ng/hotels-in-lagos/with-restaurants",
		// "https://hotels.ng/hotels-in-lagos/with-bar-and-lounge",
		// "https://hotels.ng/hotels-in-lagos/with-wireless-internet",
		// "https://hotels.ng/hotels-in-lagos/with-swimming-pool",
		// "https://hotels.ng/hotels-in-lagos/with-gym",
		// "https://hotels.ng/hotels-in-lagos/ikeja",
		// "https://hotels.ng/hotels-in-lagos/victoria-island",
		// "https://hotels.ng/hotels-in-lagos/lekki",
		// "https://hotels.ng/hotels-in-lagos/ikorodu",
		// "https://hotels.ng/hotels-in-lagos/surulere",
		// "https://hotels.ng/hotels-in-lagos/ikoyi",
		// "https://hotels.ng/hotels-in-lagos/badagry",
		// "https://hotels.ng/hotels-in-lagos/ikotun",
		// "https://hotels.ng/hotels-in-lagos/ojo",
		// "https://hotels.ng/hotels-in-lagos/apapa",
		// "https://hotels.ng/hotels-in-lagos/alimosho",
		// "https://hotels.ng/hotels-in-lagos/yaba",
		// "https://hotels.ng/hotels-in-lagos/ajah",
		// "https://hotels.ng/hotels-in-lagos/ajao-estate",
		// "https://hotels.ng/hotels-in-lagos/oshodi-isolo",
		// "https://hotels.ng/hotels-in-lagos/festac", "https://hotels.ng/hotels-in-lagos/agege",
		// "https://hotels.ng/hotels-in-lagos/lekki-phase-1",
		// "https://hotels.ng/hotels-in-lagos/ipaja",
		// "https://hotels.ng/hotels-in-lagos/amuwo-odofin",
		// "https://hotels.ng/hotels-in-lagos/isolo",
		// "https://hotels.ng/hotels-in-lagos/ogba", "https://hotels.ng/hotels-in-lagos/maryland",
		// "https://hotels.ng/hotels-in-lagos/egbeda",
		// "https://hotels.ng/hotels-in-lagos/igando",
		// "https://hotels.ng/hotels-in-lagos/abule-egba",
		// "https://hotels.ng/hotels-in-lagos/mushin",
		// "https://hotels.ng/hotels-in-lagos/lagos-island",
		// "https://hotels.ng/hotels-in-lagos/ketu",
		// "https://hotels.ng/hotels-in-lagos/alagbado",
		// "https://hotels.ng/hotels-in-lagos/ejigbo",
		// "https://hotels.ng/hotels-in-lagos/magodo",
		// "https://hotels.ng/hotels-in-lagos/ebute-metta",
		// "https://hotels.ng/hotels-in-lagos/okota",
		// "https://hotels.ng/hotels-in-lagos/okokomaiko",
		// "https://hotels.ng/hotels-in-lagos/epe",
		// "https://hotels.ng/hotels-in-lagos/gbagada",
		// "https://hotels.ng/hotels-in-lagos/ajegunle",
		// "https://hotels.ng/hotels-in-lagos/oshodi",
		// "https://hotels.ng/hotels-in-lagos/agbara",
		// "https://hotels.ng/hotels-in-lagos/ijanikin",
		// "https://hotels.ng/hotels-in-lagos/ojota",
		// "https://hotels.ng/hotels-in-lagos/satellite-town",
		// "https://hotels.ng/hotels-in-lagos/ifako-ijaiye",
		// "https://hotels.ng/hotels-in-lagos/akowonjo",
		// "https://hotels.ng/hotels-in-lagos/ojodu",
		// "https://hotels.ng/hotels-in-lagos/amuwo-odofin",
		// "https://hotels.ng/hotels-in-lagos/ikeja-gra",
		// "https://hotels.ng/hotels-in-lagos/idimu",
		// "https://hotels.ng/hotels-in-lagos/isheri",
		// "https://hotels.ng/hotels-in-lagos/mafoluku",
		// "https://hotels.ng/hotels-in-lagos/igbogbo",
		// "https://hotels.ng/hotels-in-lagos/bariga",
		// "https://hotels.ng/hotels-in-lagos/iju-ishaga",
		// "https://hotels.ng/hotels-in-lagos/shomolu",
		// "https://hotels.ng/hotels-in-lagos/orile",
		// "https://hotels.ng/hotels-in-lagos/egbe",
		// "https://hotels.ng/hotels-in-lagos/ojokoro",
		// "https://hotels.ng/hotels-in-lagos/ibeju-lekki",
		// "https://hotels.ng/hotels-in-lagos/iyana-ipaja",
		// "https://hotels.ng/hotels-in-lagos/ketu-alapere",
		// "https://hotels.ng/hotels-in-lagos/anthony",
		// "https://hotels.ng/hotels-in-lagos/oke-aro",
		// "https://hotels.ng/hotels-in-lagos/akute",
		// "https://hotels.ng/hotels-in-lagos/alakuko",
		// "https://hotels.ng/hotels-in-lagos/imota",
		// "https://hotels.ng/hotels-in-lagos/ijegun",
		// "https://hotels.ng/hotels-in-lagos/meiran",
		// "https://hotels.ng/hotels-in-lagos/victoria-garden-city",
		// "https://hotels.ng/hotels-in-lagos/ajeromi-ifelodun",
		// "https://hotels.ng/hotels-in-lagos/lekki-phase-2",
		// "https://hotels.ng/hotels-in-lagos/lagos-mainland",
		// "https://hotels.ng/hotels-in-lagos/ijede",
		// "https://hotels.ng/hotels-in-lagos/sangotedo",
		// "https://hotels.ng/hotels-in-lagos/orile-agege",
		// "https://hotels.ng/hotels-in-lagos/oko-afo",
		// "https://hotels.ng/hotels-in-lagos/palmgrove",
		// "https://hotels.ng/hotels-in-lagos/ilupeju",
		// "https://hotels.ng/hotels-in-lagos/amukoko",
		// "https://hotels.ng/hotels-in-lagos/ayobo",
		// "https://hotels.ng/hotels-in-lagos/agbado-ijaye",
		// "https://hotels.ng/hotels-in-lagos/kosofe",
		// "https://hotels.ng/hotels-in-lagos/ojuelegba",
		// "https://hotels.ng/hotels-in-lagos/aguda",
		// "https://hotels.ng/hotels-in-lagos/ijaye",
		// "https://hotels.ng/hotels-in-lagos/agboju",
		// "https://hotels.ng/hotels-in-lagos/ago",
		// "https://hotels.ng/hotels-in-lagos/owutu",
		// "https://hotels.ng/hotels-in-lagos/ikotun-egbe",
		// "https://hotels.ng/hotels-in-lagos/somolu",
		// "https://hotels.ng/hotels-in-lagos/arida-ikotu",
		// "https://hotels.ng/hotels-in-lagos/oyingbo",
		// "https://hotels.ng/hotels-in-lagos/iganmu",
		// "https://hotels.ng/hotels-in-lagos/akoka",
		// "https://hotels.ng/hotels-in-lagos/oke-odo",
		// "https://hotels.ng/hotels-in-lagos/alaba-oro",
		// "https://hotels.ng/hotels-in-lagos/fagba",
		// "https://hotels.ng/hotels-in-lagos/isashi",
		// "https://hotels.ng/hotels-in-lagos/eti-osa",
		// "https://hotels.ng/hotels-in-lagos/ilogbo-eremi",
		// "https://hotels.ng/hotels-in-lagos/iba",
		// "https://hotels.ng/hotels-in-lagos/ogudu",
		// "https://hotels.ng/hotels-in-lagos/victoria-island",
		// "https://hotels.ng/hotels-in-lagos/ikeja",
		// "https://hotels.ng/hotels-in-lagos/ajao-estate",
		// "https://hotels.ng/hotels-in-lagos/lekki",
		// "https://hotels.ng/hotels-in-lagos/ajao-estate",
		// "https://hotels.ng/hotels-in-lagos/ikeja",
		// "https://hotels.ng/hotels-in-lagos/yaba",
		// "https://hotels.ng/hotels-in-lagos/ikeja",
		// "https://hotels.ng/hotels-in-lagos/victoria-island",
		// "https://hotels.ng/hotels-in-lagos/ajao-estate",

		// "https://hotels.ng/hotels-in-lagos/ikeja",
		// "https://hotels.ng/hotels-in-lagos/victoria-island",
		// "https://hotels.ng/hotels-in-lagos/lekki",
		// "https://hotels.ng/hotels-in-lagos/ikorodu",
		// "https://hotels.ng/hotels-in-lagos/surulere",
		// "https://hotels.ng/hotels-in-lagos/ikoyi",
		// "https://hotels.ng/hotels-in-lagos/badagry",
		// "https://hotels.ng/hotels-in-lagos/ikotun",
		// "https://hotels.ng/hotels-in-lagos/ojo",
		// "https://hotels.ng/hotels-in-lagos/apapa",
		// "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/kubwa", "https://hotels.ng/hotels-in-abuja/garki", "https://hotels.ng/hotels-in-abuja/gwarinpa", "https://hotels.ng/hotels-in-abuja/nyanya", "https://hotels.ng/hotels-in-abuja/maitama", "https://hotels.ng/hotels-in-abuja/utako", "https://hotels.ng/hotels-in-abuja/gwagwalada", "https://hotels.ng/hotels-in-abuja/lugbe", "https://hotels.ng/hotels-in-abuja/asokoro", "https://hotels.ng/hotels-in-abuja/mpape", "https://hotels.ng/hotels-in-abuja/jabi", "https://hotels.ng/hotels-in-abuja/wuse-2", "https://hotels.ng/hotels-in-abuja/abuja", "https://hotels.ng/hotels-in-abuja/central-business-district", "https://hotels.ng/hotels-in-abuja/jikwoyi", "https://hotels.ng/hotels-in-abuja/apo", "https://hotels.ng/hotels-in-abuja/kado", "https://hotels.ng/hotels-in-abuja/life-camp", "https://hotels.ng/hotels-in-abuja/garki-2", "https://hotels.ng/hotels-in-abuja/katampe", "https://hotels.ng/hotels-in-abuja/wuse-zone-6", "https://hotels.ng/hotels-in-abuja/orozo", "https://hotels.ng/hotels-in-abuja/wuse-zone-5", "https://hotels.ng/hotels-in-abuja/wuye", "https://hotels.ng/hotels-in-abuja/mararaba", "https://hotels.ng/hotels-in-abuja/durumi", "https://hotels.ng/hotels-in-abuja/galadimawa", "https://hotels.ng/hotels-in-abuja/madalla", "https://hotels.ng/hotels-in-abuja/guzape", "https://hotels.ng/hotels-in-abuja/wuse-7", "https://hotels.ng/hotels-in-abuja/wuse-1", "https://hotels.ng/hotels-in-abuja/old-karu", "https://hotels.ng/hotels-in-abuja/wuse-5", "https://hotels.ng/hotels-in-abuja/kurudu", "https://hotels.ng/hotels-in-abuja/karmu", "https://hotels.ng/hotels-in-abuja/wuse-zone-4", "https://hotels.ng/hotels-in-abuja/wuse-zone-3", "https://hotels.ng/hotels-in-abuja/wuse-6", "https://hotels.ng/hotels-in-abuja/kuje", "https://hotels.ng/hotels-in-abuja/gudu", "https://hotels.ng/hotels-in-abuja/cadastral-zone", "https://hotels.ng/hotels-in-abuja/bwari", "https://hotels.ng/hotels-in-abuja/jahi", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/central-business-district", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/maitama", "https://hotels.ng/hotels-in-abuja/utako", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/gwarinpa", "https://hotels.ng/hotels-in-abuja/maitama", "https://hotels.ng/hotels-in-abuja/1", "https://hotels.ng/hotels-in-abuja/2", "https://hotels.ng/hotels-in-abuja/3", "https://hotels.ng/hotels-in-abuja/4", "https://hotels.ng/hotels-in-abuja/5", "https://hotels.ng/hotels-in-abuja/6", "https://hotels.ng/hotels-in-abuja/7", "https://hotels.ng/hotels-in-abuja/8", "https://hotels.ng/hotels-in-abuja/9", "https://hotels.ng/hotels-in-abuja/2", "https://hotels.ng/hotels-in-abuja/wuse", "https://hotels.ng/hotels-in-abuja/garki", "https://hotels.ng/hotels-in-abuja/kubwa", "https://hotels.ng/hotels-in-abuja/gwarinpa", "https://hotels.ng/hotels-in-abuja/maitama", "https://hotels.ng/hotels-in-abuja/asokoro", "https://hotels.ng/hotels-in-abuja/gwagwalada", "https://hotels.ng/hotels-in-abuja/utako", "https://hotels.ng/hotels-in-abuja/nyanya", "https://hotels.ng/hotels-in-abuja/jabi"

	]
};


//insert new hotels first start
// if (process.env.CREATE == "yep"){
	hotelModel.remove().then(q=>crawler(config).CrawlAllUrl())
// }
