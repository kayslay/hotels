# API for hotels in Nigeria

This is an API endpoint for hotels available in Nigeria.

Created by crawling [hotels.ng](https://hotels.ng) using
[web-crawljs](https://github.com/kayslay/web-crawljs).

The API endpoint :
[https://hotels-apis.herokuapp.com/](https://hotels-apis.herokuapp.com/)

This a play project. Read this medium post to know more
[https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f](https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f)

# Endpoints API V2
This API version support every thing from v1 and more. Now user can now make multiple query request to a single endpoint.
It now possible to search by name, by city and by state in a single request.

Support for selecting now included. Get only the parameters you need returned from an hotel.

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
| ----------- | :------: | :------------------------------------: |
| **id** |  true   | the id of the hotel to get |

The request query parameter
| parameter   | required |              Description               |
| ----------- | :------: | :------------------------------------: |
| **select** |  false   |  the parameter to select in each hotel. the parameters are separated by a ",". ex: `"hotel_name,city"` |

# Endpoints API V1

## **NOTICE:** This API version would be moved to `/api/v1` endpoint on the 1st of April, 2018.

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

#### Example Data returned
```javascript
[
  {
    _id: "5a0075853438c300122bbda0",
    hotel_name: "Arede Hotels Limited",
    location: "87, Agbado Road, Iju Ishaga, Agege, Lagos",
    city: "Agege",
    state: "Lagos",
    present_price: "₦4,000",
    hotelsNg_link: "https://hotels.ng/hotel/47885-arede-hotels-limited-lagos",
    features: ["Restaurant", "Bar"]
  },
  {
    _id: "5a0075853438c300122bbda1",
    hotel_name: "Offshoreroomz Hotel",
    location: "1, Odumosu Street, Off Iju Road",
    city: "Agege",
    state: "Lagos",
    present_price: "₦5,500",
    hotelsNg_link: "https://hotels.ng/hotel/1006144-offshore-roomz-hotel-lagos",
    features: ["Internet", "Restaurant", "Bar"]
  }
];
```