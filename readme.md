# API for hotels in Nigeria

This is an API endpoint for hotels available in Nigeria.

Created by crawling [hotels.ng](https://hotels.ng) using
[web-crawljs](https://github.com/kayslay/web-crawljs), created by [me](https://twitter.com/Kayslaycode).

The API endpoint :
[https://hotels-apis.herokuapp.com/api/v2](https://hotels-apis.herokuapp.com/api/v2)

This a play project. Read this medium post to know more
[https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f](https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f)

# Endpoints API V2
This API version support every thing from v1 and more. Now user can now make multiple query request to a single endpoint.
It now possible to search by name, by city and by state in a single request.

API V2 supports fetching fields that are needed by the request as response. Get only the parameters you need returned from an hotel.

## Get Hotel List
Get multiple hotels [https://hotels-apis.herokuapp.com/api/v2/](https://hotels-apis.herokuapp.com/api/v2)

The request query parameters

| parameter   | required |              Description               |
| ----------- | :------: | :------------------------------------: |
| **page** |  false   | used to load the `nth` array of hotels |
| **city** |  false   |the city to get the hotels from |
| **state** |  false   | the state to get the hotels from |
| **select** |  false   | the parameter to select in each hotel. the parameters are separated by a ",". ex: `"hotel_name,city"` |

## Get a Single Hotel
Get a single hotel [https://hotels-apis.herokuapp.com/api/v2/:id](https://hotels-apis.herokuapp.com/api/v2/5a0075853438c300122bbda0)

The route parameter

| parameter   | required |              Description               |
| :-----------: | :------: | :------------------------------------: |
| **id** |  true   | the id of the hotel to get |

The request query parameter

| parameter   | required |              Description               |
| :-----------: | :------: | :------------------------------------: |
| **select** |  false   |  the parameter to select in each hotel. the parameters are separated by a ",". ex: `"hotel_name,city"` |

# Endpoints API V1

## **NOTICE:** This API version would be moved to `/api/v1` endpoint on the 1st of July, 2018.

## Get Hotel List

This endpoint returns an array of hotels.

[https://hotels-apis.herokuapp.com/:pageNum](https://hotels-apis.herokuapp.com/1)

| parameter   | required |              Description               |
| ----------- | :------: | :------------------------------------: |
| **pageNum** |  false   | used to load the `nth` array of hotels |

## Search Hotels By Name

This endpoint returns an array of hotels that matches the name searched.

[https://hotels-apis.herokuapp.com/name/:nameToSearch/:pageNum](https://hotels-apis.herokuapp.com/name/ibis/1)

### Params

| parameter        | required |              Description               |
| ---------------- | :------: | :------------------------------------: |
| **nameToSearch** |   true   | The name used to search for the hotels  |
| **pageNum**      |  false   | used to load the `nth` array of hotels |

## Get Hotels In A City

This endpoint returns hotels in a particular city.

[https://hotels-apis.herokuapp.com/city/:city/:pageNum](https://hotels-apis.herokuapp.com/city/ikeja/1)

| parameter   | required |               Description                |
| ----------- | :------: | :--------------------------------------: |
| **city**    |   true   | The city to get the array of hotels from |
| **pageNum** |  false   |  used to load the `nth` array of hotels  |

## Get Hotels In a State

This endpoint returns hotels in a particular state

[https://hotels-apis.herokuapp.com/state/:state/:pageNum](https://hotels-apis.herokuapp.com/state/lagos/1)

| parameter   | required |                Description                |
| ----------- | :------: | :---------------------------------------: |
| **state**   |   true   | The state to get the array of hotels from |
| **pageNum** |  false   |  used to load the `nth` array of hotels   |

# Response

The `content-type` header of the response is `application/json`.

The data returned is an array Objects that has the following attribute.

| Atribute          |   Type   |                            Description                             |
| ----------------- | :------: | :----------------------------------------------------------------: |
| **_id**           |  String  |                        The _id of the hotel                        |
| **hotel_name**    |  String  |                       The name of the hotel                        |
| **location**      |  String  |                     The location of the hotel                      |
| **city**          |  String  |                       The city of the hotel                        |
| **state**         |  String  |                       The state of the hotel                       |
| **present_price** |  String  | The price of the hotel when it was last crawled `(not up to date)` |
| **hotelsNg_link** |  String  |                The link to description on hotels.ng                |
| **features**      | String[] |                 the list of features in the hotel                  |
| **room_types**      | room_type[] |                 list of room_type                 |

## room_type
The room_type property defines a room available in the hotel. the room_type property holds information like, `room name`,`room price` and `facilities`.

| Atribute          |   Type   |                            Description                             |
| ----------------- | :------: | :----------------------------------------------------------------: |
| **_id**           |  String  |                        The _id of the room                        |
| **name**           |  String  |                        The name of the room                        |
| **price**           |  String  |                        The prices of the room                        |
| **facilities**           |  String[]  |                        The facilities available in the room                        |


### Example Response Data for multiple hotel search

```javascript
[
      {
      "_id": "5ac47027f8f61744ee2b0908",
      "hotel_name": "Enitona Hotel",
      "location": "8 Margaret Avenue G.R.A P.O. Box 148",
      "city": "Aba",
      "state": "Abia",
      "hotelsNg_link": "https://hotels.ng/hotel/87182-enitona-hotel-abia",
      "room_types": [
        {
          "_id": "5ac471c2cb17eb46884d0b60",
          "price": "₦7,000",
          "name": "Standard ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5f",
          "price": "₦7,000",
          "name": "Single ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5e",
          "price": "₦8,000",
          "name": "Standard Deluxe ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5d",
          "price": "₦10,000",
          "name": "Double Room ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5c",
          "price": "₦11,000",
          "name": "Double Deluxe ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5b",
          "price": "₦11,000",
          "name": "Mini Double ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b5a",
          "price": "₦25,000",
          "name": "Executive Suite ",
          "facilities": [
            ""
          ]
        }
      ],
      "updated": true,
      "features": [
        "Bar/Lounge",
        "Security",
        "Air Conditioning",
        "24 Electricity",
        "Adequate Parking",
        "Parking Garage",
        "Laundry",
        "Event Hall",
        "Restaurant(s)",
        "Gym",
        "Gym",
        "Suya Spot",
        "Taxi Pickup",
        "Cyber Cafe",
        "Chinese Cuisines",
        "CCTV camera",
        "Car rental",
        "Live Band Entertainment",
        "Toiletries",
        "Key Card system",
        "Gift Shop",
        "Luggage Storage",
        "Karaoke"
      ],
      "present_price": "₦7,000"
      },
      {
      "_id": "5ac47027f8f61744ee2b0909",
      "hotel_name": "Hotel Helson",
      "location": "66/71 Asaba Street, Amuzukwu Layout",
      "city": "Umuahia",
      "state": "Abia",
      "hotelsNg_link": "https://hotels.ng/hotel/27426-hotel-helson-abia",
      "room_types": [
        {
          "_id": "5ac471c2cb17eb46884d0b66",
          "price": "₦3,500",
          "name": "Standard Room (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b65",
          "price": "₦4,500",
          "name": "Executive Standard (Pre-payment only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b64",
          "price": "₦5,000",
          "name": "Double (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b63",
          "price": "₦5,375",
          "name": "Executive Double (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b62",
          "price": "₦6,000",
          "name": "Classic Executive ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b61",
          "price": "₦6,525",
          "name": "Suites ",
          "facilities": [
            ""
          ]
        }
      ],
      "updated": true,
      "features": [
        "Restaurant(s)",
        "Bar/Lounge",
        "Security",
        "24 Electricity",
        "DSTV",
        "Adequate Parking",
        "Air Conditioning",
        "In House Dining",
        "King sized bed",
        "Sofa",
        "Fenced compound"
      ],
      "present_price": "₦3,500"
      },
];
```

### Example Response Data For Single Hotel

```javascript
  {
      "_id": "5ac47027f8f61744ee2b0909",
      "hotel_name": "Hotel Helson",
      "location": "66/71 Asaba Street, Amuzukwu Layout",
      "city": "Umuahia",
      "state": "Abia",
      "hotelsNg_link": "https://hotels.ng/hotel/27426-hotel-helson-abia",
      "room_types": [
        {
          "_id": "5ac471c2cb17eb46884d0b66",
          "price": "₦3,500",
          "name": "Standard Room (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b65",
          "price": "₦4,500",
          "name": "Executive Standard (Pre-payment only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b64",
          "price": "₦5,000",
          "name": "Double (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b63",
          "price": "₦5,375",
          "name": "Executive Double (Pre-payment Only) Prepayment Only Rate",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b62",
          "price": "₦6,000",
          "name": "Classic Executive ",
          "facilities": [
            ""
          ]
        },
        {
          "_id": "5ac471c2cb17eb46884d0b61",
          "price": "₦6,525",
          "name": "Suites ",
          "facilities": [
            ""
          ]
        }
      ],
      "updated": true,
      "features": [
        "Restaurant(s)",
        "Bar/Lounge",
        "Security",
        "24 Electricity",
        "DSTV",
        "Adequate Parking",
        "Air Conditioning",
        "In House Dining",
        "King sized bed",
        "Sofa",
        "Fenced compound"
      ],
      "present_price": "₦3,500"
      }
```
