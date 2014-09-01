/*
    listener.js
    放置需要及時知道的資訊的監看式，同時也是背景執行時的function
 */

/*
    監看電池資訊
 */
var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

function chargingChangeListener() {
    var $scenarions = $(".hm_content_senarios").children();
    var scenarionNum = $scenarions.length;
    for (var i = 0; i < scenarionNum; i++) {
        var $thisScenario = $scenarions.filter(":eq(" + i + ")");
        var checkCondition = $thisScenario.find("#IfBattery").attr("data-bcharging");
        if (checkCondition == 1) {
            executeActs($thisScenario);
        }
    }
    console.warn("Battery charge: " + battery.charging);
}

function levelChangeListener() {
    var $scenarions = $(".hm_content_senarios").children();
    var scenarionNum = $scenarions.length;
    for (var i = 0; i < scenarionNum; i++) {
        var $thisScenario = $scenarions.filter(":eq(" + i + ")");
        var checkCondition = $thisScenario.find("#IfBattery").attr("data-blevel");
        if (checkCondition != "" && checkCondition != null && checkCondition != undefined) {
            if (battery.level == checkCondition) {
                executeActs($thisScenario);
            }
        }
    }
    console.warn("Battery level: " + battery.level);
}

function batteryEventListener(check) {
    if (check) {
        battery.addEventListener("chargingchange", chargingChangeListener, false);
        battery.addEventListener("levelchange", levelChangeListener, false);
    } else {
        battery.removeEventListener("chargingchange", chargingChangeListener, false);
        battery.removeEventListener("levelchange", levelChangeListener, false);
    }
}

/*
    location and time zone simultaneously detect
    and change the settings of the phone

    HOW TO GET CURRENT POSITION DATA:

    get latitude:
        localStorage.getItem("CURRENT_LATITUDE");

        longitude:
        localStorage.getItem("CURRENT_LONGITUDE");

        time zone id:
        localStorage.getItem("CURRENT_ZONE");

 */
function locationEventListener() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                //store latitude and longitude to localStorage
                if (typeof(Storage) != "undefined") {
                    localStorage.setItem("CURRENT_LATITUDE", lat);
                    localStorage.setItem("CURRENT_LONGITUDE", lng);
                } else {
                    console.log("Not support web storage");
                    alert("Not support web storage.");
                }

                //detect current time zone and change time or do nothing
                var timestamp = new Date().getTime() / 1000;
                var google_time_zone_key = "AIzaSyBp37T05asGoDR1Yxfs4NQ3GrvQqSBD0Os";
                var google_time_zone_api = "https://maps.googleapis.com/maps/api/timezone/json";
                var timeZoneSrc = google_time_zone_api + "?location=" + lat + "," + lng + "&timestamp=" + timestamp + "&key=" + google_time_zone_key;

                //access google time zone data
                $.getJSON(timeZoneSrc, function(data) {
                    var localZoneId = localStorage.getItem("CURRENT_ZONE");
                    //first time to detect current time zone
                    if ((localZoneId == undefined) || (localZoneId == null)) {
                        localStorage.setItem("CURRENT_ZONE", data.timeZoneId);
                        var localHoursPlus = (data.dstOffset / 3600) + (data.rawOffset / 3600);
                        setDeviceTime(localHoursPlus);
                    } else if (localZoneId != data.timeZoneId) {
                        localStorage.setItem("CURRENT_ZONE", data.timeZoneId);
                        var localHoursPlus = (data.dstOffset / 3600) + (data.rawOffset / 3600);
                        setDeviceTime(localHoursPlus);
                    }
                });
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
    hang up all phone call in black list
 */
var telephoneCall = window.navigator.mozTelephony;

function phoneCallEventListener(check) {
    if (check) {
        telephoneCall.addEventListener("incoming", phoneCallLimit, false);
    } else {
        telephoneCall.removeEventListener("incoming", phoneCallLimit, false);
    }
}

function phoneCallLimit(event) {
    for (var i in dbBlackListNumberStore) {
        if (event.call.id.number == dbBlackListNumberStore[i]) {
            event.call.hangUp();
        }
    }
}

/*
    get the specific IP as the car's key,
    Firefox OS can automatic catch hotspot that have used before
 */
var mozWifim = navigator.mozWifiManager;
var carListenerCheck = "none";

function connectCar(evt) {
    if (evt.status == "connected") {
        if (evt.target.macAddress == "48:28:2f:f9:bd:d4") {
            var scenarioNumber = $(".hm_content_senarios").children().length;
            var $scenarios = $(".hm_content_senarios").children();

            for (var i = 0; i < scenarioNumber; i++) {
                var $thisScenario = $scenarios.filter(":eq(" + i + ")");

                if ($thisScenario.find("#Ifdriver").length) {
                    executeActs($thisScenario);
                }
            }
        }
    }
}

function toFindTheKey(check) {
    if (check) {
        mozWifim.addEventListener("statuschange", connectCar, false);
    } else {
        mozWifim.removeEventListener("statuschange", connectCar, false);
    }
}
