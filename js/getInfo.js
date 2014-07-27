/*
    這個js檔案主要是放置取得感測器、手機上...等等資料的function，
    每個function可能有回傳值，兩個以上的回傳值，會以物件或陣列的方式回傳

    Google API Key:
    AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os


 */

/*
    取得手機上目前的時間
 */
function getDeviceTime() {
    var device_time = new Date();
    return device_time;
}

/*
    取得Google Place API回傳的資料

    Google Place API:
    https://developers.google.com/places/documentation/?hl=zh-tw

    Google Map API:
    https://developers.google.com/maps/documentation/javascript/?hl=zh-tw

    Need including URL:https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places

    You can find types on: https://developers.google.com/places/documentation/supported_types?hl=zh-tw

    Limitation: Radius < 50000 meters.

    If match the target place, localstorage set true for user.

    ps:
        Call getPlacesService(placeRequest, successFunction) function pass two parameters
    1. placeRequest: it's an object that contain some property by following
        example:
        var MyPlaceRequest = {
            keyword: "國立臺南大學榮譽校區",     //Optional, a string variable
            location: "empty",                   //this you don't need to assign it value.
            radius: 300,                         //a number limited less than 50000 meters
            types: ['school']                    //assign an string array to types
        };
-------------------------------------------------------------------------------------
    2.successFunction: it's function, just pass function name to getPlacesService
                        not need () {} symbol.
        =====================================================
        implicit parameter "results":
        "results" is an object that Google PlacesService's nearbyseach return.
        Contain some information of the near location's name, latitude, and longitude...etc.
        You can use this to display some information you want to display,
        or give some if... then... condition.

        You can see the following url to understand what is results object:
        https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=22.976209,120.217240&radius=500&types=school&sensor=false&key=AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os
        =====================================================
        meaning: what you want to do when user's position is the target you set.
        =====================================================
        example:
        closeVibrationAndSound() {
            setVibration(true);
            setSound(0);
        }
---------------------------------------------------------------------
        below nothing just for debug
        =====================================================
             for (var i = 0; i < results.length; i++)
                alert("success__" + results[i].name);
        =====================================================
*/

function searchSuccessCallback(results, status, successFunction) {
    switch (status) {
        case "OK":
            console.log("Google Places Service success");
            successFunction(results);
            break;
        case "INVALID_REQUEST":
            console.log("This request was invalid.");
            alert("This request was invalid.");
            break;
        case "OVER_QUERY_LIMIT":
            console.log("The application has gone over its request quota.");
            alert("The application has gone over its request quota.");
            break;
        case "REQUEST_DENIED":
            console.log("The application is not allowed to use the PlacesService.");
            alert("The application is not allowed to use the PlacesService.");
            break;
        case "UNKNOWN_ERROR":
            console.log("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.");
            alert("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.");
            break;
        case "ZERO_RESULTS":
            console.log("No result was found for this request.");
            alert("No result was found for this request.");
            break;
    }
}

function placeSearch(position, placeRequest, successFunction, use_geoLoc) {
    var pyrmont;
    if (use_geoLoc) {
        pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    } else {
        pyrmont = new google.maps.LatLng(localStorage.getItem("CURRENT_LATITUDE"), localStorage.getItem("CURRENT_LONGITUDE"));
    }

    placeRequest.location = pyrmont;

    var placeId = document.getElementById("googleplace");
    var service = new google.maps.places.PlacesService(placeId);
    service.nearbySearch(placeRequest, function(results, status) {
        searchSuccessCallback(results, status, successFunction);
    });
}

function getPlacesService(placeRequest, successFunction) {
    var latCheck = localStorage.getItem("CURRENT_LATITUDE");
    var lngCheck = localStorage.getItem("CURRENT_LONGITUDE");

    if (latCheck == undefined || lngCheck == undefined) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    placeSearch(position, placeRequest, successFunction, true)
                },
                function(error) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.log("An unknown error occurred.");
                            break;
                    }
                }, {
                    enableHighAccuracy: true,
                    timeout: Infinity,
                    maximumAge: 0
                });
        }
    } else {
        placeSearch(0, placeRequest, successFunction, false);
    }
}
