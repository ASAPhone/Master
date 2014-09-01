/*
 * This is a JS code to limit phone call when speed exceed 20 km/h.
 */
function SpeedShow(position) {
    //var speed = position.coords.speed;
    var speed = 40; //fake speed
    if (speed > 5.55555556) {
        SetPhoneCallLimited(true);
    } else {
        SetPhoneCallLimited(false);
    }
}

function showError(error) {
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
}

function Auto_SpeedLimited() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(SpeedShow, showError);
    } else {
        alert("Something is Error on geolocation.");
    }
}

/*
    sleep mode
    Precodition: input a boolean parameter to control off or on
    Postcodition: turn on powersaving mode to avoid power down after sleeping
                    and set all sound quietly
 */
function sleepMode(check) {
    if (check) {
        alert("Sleep Mode has started.");
        setPowerSaving(check);
        setSound(0);
        alert("Have you set clock?");
    } else {
        setPowerSaving(check);
        alert("Sleep Mode has stopped.");
    }
}
