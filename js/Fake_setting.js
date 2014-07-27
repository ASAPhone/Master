/**
 * This is a Fake data setting below.
 * Follow the rules to make your set JS become Fake data.
 */

/*
    開啓或關閉wifi功能
    */
function setWifi(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'wifi.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Wifi is \'on\'");
        } else {
            alert("Wifi is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error wifi");
    };
}

/*
開啓或關閉GPS裝置
*/
function setGps(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'geolocation.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("GPS is \'on\'");
        } else {
            alert("GPS is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error gps");
    };
}

/*
開啓或關閉行動上網功能
*/
function setWap(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'ril.data.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Mobile internet is \'on\'");
        } else {
            alert("Mobile internet is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error wap");
    };
}

/*
改變手機目前時間，此部分就是時間改為目前偵測到的時區的時間
*/
function setDeviceTime(new_time_hours) {
    Navigator.mozTime.set(new_time_hours);
}

/*
設定螢幕的亮度
*/
function setScreenBrightness(BrightValue) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'screen.brightness': BrightValue
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        alert("Screen brightness is " + BrightValue);
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error screen brightness");
    };
}

/*
開啓或關閉藍牙功能
*/
function setBluetooth(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'bluetooth.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("bluetooth is \'on\'");
        } else {
            alert("bluetooth is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error bluetooth");
    };
}

/*
這function可能會更改，因為不知道Firefox os的手機是否有區分三種聲音：鈴聲、鈴聲、遊戲影片等聲音（除了前兩個）
*/
function setSound(SDvalue) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'audio.volume.dtmf': SDvalue,
        'audio.volume.content': SDvalue,
        'audio.volume.notification': SDvalue,
        'audio.volume.tts': SDvalue
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        alert("All sound value is set " + SDvalue);
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error sound");
    };
}

/*
開啓或關閉震動
*/
function setVibration(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'vibration.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Vibration is \'on\'");
        } else {
            alert("Vibration is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error vibration");
    };
}

/*
開啟省電模式
*/
function setPowerSaving(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'powersave.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Power Save is \'on\'");
        } else {
            alert("Power Save is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error powersave");
    };
}

/*
    設定手機開啓自動螢幕亮度調節
 */
function SetScreenAutoBrightness(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'screen.automatic-brightness': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Screen Auto brightness is \'on\'");
            //sendNotification("Set screen auto brightness", "Auto Brightness: on");
        } else {
            alert("Screen auto brightness is \'off\'");
            //sendNotification("Set screen auto brightness", "Auto Brightness: off");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error auto brightness");
    };
}

/*
    設定通話限制
 */
function SetPhoneCallLimited(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'ring.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (check) {
            alert("Phone call limited is \'on\'");
        } else {
            alert("Phone call limited is \'off\'");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error phone call limited");
    };
}

/*
    設定是否可以使用相機
 */
function setCameraLimited(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'camera.shutter.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
        if (!check) {
            alert("Unabled to use camera.");
        } else {
            alert("Enbled to use camera.");
        }
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
        alert("error camera limited");
    };
}
