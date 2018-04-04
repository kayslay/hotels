const crawler = require("web-crawljs");
const mongoose = require("mongoose");
require("dotenv").config();
const hotelModel = require("../models/hotels");


const env = process.env;
if (module.parent == null) {
    //Mongo set up
    mongoose.Promise = Promise;

    mongoose.connect(env.MONGO_URI);

    updateFeatures()
}



async function updateFeatures() {
    let updateArr = []
    const updateConfig = {
        fetchSelector: {
            // description: "div.random-content",
            features: "div.other-facilities > div.faci",
            room_types: "div.list-of-rooms div.room-details > p:nth-child(1)",
            room_types_facilities: "div.list-of-rooms div.room-details > p:nth-child(2)",
            room_type_price: "div.add-room p.price",
            title: "title"
        },
        fetchSelectBy: {
            // description: "text",
            title: "text",
            features: "text",
            room_types: "text",
            room_types_facilities: "text",
            room_type_price: "text"
        },
        fetchFn: function (err, data, url) {
            if (err) return console.error(err.message)
            const features = (!!data.features.length) ? {
                features: data.features.map(f => f.replace(/\s{2,}/g, ""))
            } : {}
            const obj = Object.assign({}, features, {
                updated: true
            })
            obj.room_types = genRoomInstance(data.room_types, data.room_types_facilities, data.room_type_price)
            updateArr.push([obj, url])
            //update the db
            // save the first 100
            if (updateArr.length == 100) {
                save(updateArr)
            }
        },
        nextSelector: {
            links: 'ul.pagination  a'
        },
        nextSelectBy: {
            links: ['attr', 'href']
        },
        finalFn: function () {
            save(updateArr)
            console.log("done")
        },
        depth: 1,
        rateLimit: 20,
        urls: (await hotelModel.find({
            // updated: {
            //     $not: {
            //         $eq: true
            //     }
            // }
        }, {
            _id: 0,
            hotelsNg_link: 1
        })).map(model => model.hotelsNg_link) /* .slice(parseInt(process.env.START),parseInt(process.env.END)) */
    }

    function genRoomInstance(name, facilities, price) {
        const bool = (name.length == price.length)
        const bool2 = (name.length == facilities.length)
        return name.map((room, i) => {
            if (name) {
                return {
                    name: name[i].replace(/\s{2,}/g, ""),
                    facilities: bool2 ? facilities[i].replace(/\s{2,}/g, "").trim() : "",
                    price: (bool ? price[i] : "")
                }
            }

        })
    }
    crawler(updateConfig).CrawlAllUrl();
}

function save(updateArr) {
    const _updateArr = [...updateArr]
    updateArr.splice(0, updateArr.length)
    let failedCount = 0
    let urls = []
    _updateArr.forEach(data => {
            hotelModel.update({
                    hotelsNg_link: data[1]
                }, data[0])
                .then(data => {})
    })
    console.log(`${failedCount} features could not be added ${urls}`)
}
module.exports = updateFeatures