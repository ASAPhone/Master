/*
    setting.js
    檔案主要是放置改變手機內部的設定的function，沒有回傳值
 */

/*
    開啓或關閉wifi功能
 */
function setWifi(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'wifi.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    }

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    }
}

/*
    開啓或關閉GPS裝置
 */
function setGps(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'geolocation.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    }

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    }
}

/*
    開啓或關閉行動上網功能
 */
function setWap(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'ril.data.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    }

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    }
}

/*
    改變手機目前時間，此部分就是時間改為目前偵測到的時區的時間
 */
function setDeviceTime(time) {
    navigator.mozTime.set(time);
}

/*
    設定螢幕的亮度
 */
function setScreenBrightness(BrightValue) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'screen.brightness': BrightValue
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
    開啓或關閉藍牙功能
 */
function setBluetooth(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'bluetooth.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

function setSound(SDvalue) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'audio.volume.dtmf': SDvalue,
        'audio.volume.content': SDvalue,
        'audio.volume.notification': SDvalue,
        'audio.volume.tts': SDvalue
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
 * Setting device alarm sound.
 */
function set_DeviceAlarmSound(ALSound_value) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'audio.volume.alarm': ALSound_value
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
    開啓或關閉震動
 */
function setVibration(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'vibration.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
    開啟省電模式
 */
function setPowerSaving(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'powersave.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    }

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    }
}

/*
    設定手機開啓自動螢幕亮度調節
 */
function SetScreenAutoBrightness(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'screen.automatic-brightness': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
 * Setting device Screen brightness.(0~1)
 */

function set_DeviceScreenBrightness(Bright_Value) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'screen.brightness': Bright_Value
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
    設定通話限制
 */
function SetPhoneCallLimited(check) {
    var lock = navigator.mozSettings.createLock();
    var result = lock.set({
        'ring.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}

/*
    設定是否可以使用相機
 */
/*function setCameraLimited(check) {
    var lock = Navigator.mozSettings.createLock();
    var result = lock.set({
        'camera.shutter.enabled': check
    });

    result.onsuccess = function() {
        console.log("the settings has been changed");
    };

    result.onerror = function() {
        console.log("An error occure, the settings remain unchanged");
    };
}*/

/*
 * Setting device vibration.(constant time, interval time, isInterval
 * switch(bool)) Remember to call stop function to stop vibration.
 */

var vibrateInterval = null;
var vibrateTimes = 0;

function vibrationExe(time, checkTill) {
    navigator.vibrate(time * 1000);
    vibrateInterval = setInterval(function() {
        vibrateTimes++;
        navigator.vibrate(time * 1000);

        if (!checkTill) {
            if (vibrateTimes == 3) {
                clearInterval(vibrateInterval);
                vibrateTimes = 0;
            }
        }
    }, time * 1000 + 2000);
}

/*
    發送通知的function 傳入通知的title 跟 通知內容 皆為string
 */
function sendNotification(titleStr, bodyStr) {
    var notification = new Notification(titleStr, {
        dir: "auto",
        body: bodyStr
    });
}

function dialPhoneCall(number) {
    var dialcall = telephoneCall.dial(number);

    dialcall.onactive = function(evt) {
        console.log("Connected!");
        console.log(evt);
    }

    dialcall.ondisconnected = function(evt) {
        console.log("Disconnected!");
        console.log(evt);
    }

    dialcall.onerror = function(evt) {
        console.log("Something wrong!");
        console.log(evt);
    }
}
