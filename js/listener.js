/*
    listener.js
    放置需要及時知道的資訊的監看式，同時也是背景執行時的function
 */

/*
    監看電池資訊
 */
var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

function chargingChangeListener() {
    if (battery.charging) {
        setGps(true);
        setPowerSaving(false);
        setScreenBrightness(0.95);
        setVibration(true);
    }
    console.warn("Battery charge: " + battery.charging);
    alert("Battery charge: " + battery.charging);
}

function levelChangeListener() {
    if (!battery.charging) {
        if (battery.level < 0.15) {
            alert("Battery level is less than 15%, turn on power save.");
            setScreenBrightness(0.3);
            setVibration(false);
            setPowerSaving(true);
        }
    }
    console.warn("Battery level: " + battery.level);
}

function batteryEventListener(check) {
    if (check) {
        battery.addEventListener("chargingchange", chargingChangeListener, false);
        battery.addEventListener("levelchange", levelChangeListener, false);
        alert("Battery monitor has started.");
    } else {
        battery.removeEventListener("chargingchange", chargingChangeListener, false);
        battery.removeEventListener("levelchange", levelChangeListener, false);
        alert("Battery monitor has stopped.");
    }
}

/*
    監看目前位置
 */
function locationEventListener() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                if (typeof(Storage) != "undefined") {
                    localStorage.setItem("CURRENT_LATITUDE", lat);
                    localStorage.setItem("CURRENT_LONGITUDE", lng);
                } else {
                    alert("Not support web storage.");
                }
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
    } else {
        alert("Not support geolocation");
    }
}

/*
    監看手機光源感測器的資訊
 */
function ambientLightEventListener(check) {
    if (!('ondevicelight' in window)) {
        alert("Your device is unsupported Light detect sensor.");
    } else {
        if (check) {
            window.addEventListener('devicelight', Auto_ScreenLight, false);
            alert("Ambient Light Monitor has started.");
        } else {
            window.removeEventListener("devicelight", Auto_ScreenLight, false);
            alert("Ambient Light Monitor has stopped.");
        }
    }
}

/*
    取得目前所在地的時區資料

    $.getJSON() :
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    TIME ZONE API:
    Example
    https://maps.googleapis.com/maps/api/timezone/json?location=22.989213673366027,120.22729197123137&timestamp=1405069682.986&key=AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os

    API KEY
    AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os

    RETURN DATA FORM
    {
       "dstOffset" : 0,
       "rawOffset" : 28800,
       "status" : "OK",
       "timeZoneId" : "Asia/Taipei",
       "timeZoneName" : "Taipei Standard Time"
    }
 */
function getTimeZone(position, use_geoLoc) {
    var lat, lng;
    if (use_geoLoc) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    } else {
        lat = localStorage.getItem("CURRENT_LATITUDE");
        lng = localStorage.getItem("CURRENT_LONGITUDE");
    }

    var timestamp = new Date().getTime() / 1000;
    var google_time_zone_key = "AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os";
    var google_time_zone_api = "https://maps.googleapis.com/maps/api/timezone/json";
    var timeZoneSrc = google_time_zone_api + "?location=" + lat + "," + lng + "&timestamp=" + timestamp + "&key=" + google_time_zone_key;
    $.getJSON(timeZoneSrc, function(data) {
        var localHoursPlus = (data.dstOffset / 3600) + (data.rawOffset / 3600);
        setDeviceTime(localHoursPlus);
    });
}

function TimeZonePosCheck() {
    var latCheck = localStorage.getItem("CURRENT_LATITUDE");
    var lngCheck = localStorage.getItem("CURRENT_LONGITUDE");

    if (latCheck == undefined || lngCheck == undefined) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    getTimeZone(position, true)
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
        getTimeZone(0, false);
    }
}

var tzIntervalId = null;

function TimeZoneListener(check) {
    if (check) {
        //12 hours detect where's user local time
        tzIntervalId = setInterval(TimeZonePosCheck, 4320000);
        alert("Auto detect time zone is \'on\'");
    } else {
        clearInterval(tzIntervalId);
        alert("Auto detect time zone is \'off\'");
    }
}
