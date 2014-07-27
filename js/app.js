var locationIntervalId = null;

function initialization() {
    if (JSON.parse($("#geoOptionId").val())) {
        locationIntervalId = setInterval(locationEventListener, 60000);
        alert("Location Monitor has started.");
    }

    if (JSON.parse($("#autoDetectTZOp").val())) {
        TimeZoneListener(true);
    }

    if (JSON.parse($("#batteryOptionId").val())) {
        batteryEventListener(true);
    }

    if (JSON.parse($("#ambientOptionId").val())) {
        ambientLightEventListener(true);
    }
}

$("document").ready(function() {
    //when app start turn on location, battery, time zone, and ambient light monitor
    initialization();

    /*
        Page: settingPage
     */
    $("#settingPage").bind("pageshow", function() {
        //switch for notification which hint user to understand what function he/she using
        //below code currently unable to do something, it's a uncompleted code
        /*
        $("#tipsOptionId").bind("change", function() {
            alert($('#tipsOptionId').val());
        });
        */

        //on-off switch for geolocation watch
        $("#geoOptionId").bind("change", function(event) {
            var geo_bool = JSON.parse($("#geoOptionId").val());
            if (geo_bool) {
                locationIntervalId = setInterval(locationEventListener, 60000);
                alert("Location Monitor has started.");
            } else {
                clearInterval(locationIntervalId);
                alert("Location Monitor has stopped.");
            }
        });

        //on-off switch for auto detect time zone
        $("#autoDetectTZOp").bind("change", function(event) {
            var timeZone_bool = JSON.parse($("#autoDetectTZOp").val());
            TimeZoneListener(timeZone_bool);
        });

        //on-off switch for battery Monitor
        $("#batteryOptionId").bind("change", function(event) {
            var battery_bool = JSON.parse($("#batteryOptionId").val());
            batteryEventListener(battery_bool);
        });

        //on-off switch for ambient light monitor
        $("#ambientOptionId").bind("change", function(event) {
            var ambientLight_bool = JSON.parse($("#ambientOptionId").val());
            ambientLightEventListener(ambientLight_bool);
        });

        //on-off switch sleep Mode
        $("#sleepModeOptionId").bind("change", function(event) {
            var sleepMode_bool = JSON.parse($("#sleepModeOptionId").val());
            sleepMode(sleepMode_bool);
        });
    });
});
