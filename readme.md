# API for hotels in Nigeria
This is an API endpiont for hotels available in Nigeria. 

Created by crawling [hotels.ng](https://hotels.ng) using [web-crawljs](https://github.com/kayslay/web-crawljs).

The API endpoint : [https://hotels-apis.herokuapp.com/](https://hotels-apis.herokuapp.com/)

This a play project. Read this medium post to know more [https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f](https://medium.com/@badewakayode/how-i-scraped-8000-hotels-from-hotels-ng-abdc4fa2510f)

# Endpoints

## Get Hotel List
This endpoint returns an array of hotels.

[https://hotels-apis.herokuapp.com/:pageNum](https://hotels-apis.herokuapp.com/1)

| parameter | required | Description|
|-----------|:---------:|:---------:|
|**pageNum**| false| used to load the `nth` array of hotels|

## Search Hotels By Name
This endpoint returns an array of hotels that matches the name searched.

[https://hotels-apis.herokuapp.com/name/:nameToSearch/:pageNum](https://hotels-apis.herokuapp.com/name/ibis/1)

### Params
| parameter | required | Description|
|-----------|:---------:|:---------:|
|**nameToSearch**   | true      | The name used to serch for the hotels|
|**pageNum**| false| used to load the `nth` array of hotels|

## Get Hotels In A City
This endpoint returns hotels in a particular city.

[https://hotels-apis.herokuapp.com/city/:city/:pageNum](https://hotels-apis.herokuapp.com/city/ikeja/1)

| parameter | required | Description|
|-----------|:---------:|:---------:|
|**city**   | true      | The city to get the array of hotels from|
|**pageNum**| false| used to load the `nth` array of hotels|

## Get Hotels In a State
This endpoint returns hotels in a particular state

[https://hotels-apis.herokuapp.com/state/:state/:pageNum](https://hotels-apis.herokuapp.com/state/lagos/1)

| parameter | required | Description|
|-----------|:---------:|:---------:|
|**state**   | true      | The state to get the array of hotels from|
|**pageNum**| false| used to load the `nth` array of hotels|

