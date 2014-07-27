var VirtualOSProcess = function(job) {
    setTimeout(job.work, 500);
};

var VirtualOSSetting = {
    wifi: {
        enabled: false
    },

    geolocation: {
        enabled: false
    },
    ril: {
        data: {
            enabled: false
        }
    },

    'screen': {
        brightness: 1
    },

    bluetooth: {
        enabled: false
    },

    //set sound
    audio: {
        volume: {
            dtmf: 1,
            content: 1,
            notification: 1,
            tts: 1
        }
    },

    vibration: {
        enabled: false
    },

    powersave: {
        enabled: false
    },

    'screen': {
        'automatic-brightness': false
    },

    ring: {
        enabled: false
    },

    camera: {
        shutter: {
            enabled: false
        }
    }
};

var Navigator = {
    mozSettings: {
        createLock: function() {
            var Lock = {
                set: function(object) {
                    var key = Object.keys(object);
                    var object_name = new Array(key.length);
                    for (var i = 0; i < key.length; i++) {
                        object_name[i] = key[i];
                        //alert(object_name[i] + "<br>");
                    }

                    var SettingsEnabled = this.settings.enabled;
                    var name_s_value;
                    for (var i = 0; i < key.length; i++) {
                        name_s_value = object_name[i];
                        VirtualOSSetting.name_s_value = object[key[i]];
                        //alert(VirtualOSSetting.name_s_value + ": " + object[key[i]]);
                    }

                    //VirtualOSSetting.object_name = object[key[0]];
                    VirtualOSProcess(SettingsEnabled);
                    return SettingsEnabled.result;
                    /*
                    switch (key[0]) {
                        case 'wifi.enabled':
                            var WifiEnabled = this.wifi.enabled;
                            VirtualOSSetting.wifi.enabled = object[key[0]];
                            VirtualOSProcess(WifiEnabled);
                            return WifiEnabled.result;
                            break;
                    }
                    */
                },
                settings: {
                    enabled: {
                        work: function() {
                            try {
                                //alert(VirtualOSSetting.wifi.enabled);
                                Lock.settings.enabled.result.onsuccess();
                            } catch (err) {
                                Lock.settings.enabled.result.onerror();
                            }
                        },
                        result: {
                            onsuccess: function() {},
                            onerror: function() {}
                        }
                    }
                }
            };
            return Lock;
        }
    },
    mozTime: {
        set: function(tzHours) {
            var utcTime = {
                'year': new Date().getUTCFullYear(),
                'month': new Date().getUTCMonth() + 1,
                'day': new Date().getUTCDate(),
                'hours': new Date().getUTCHours(),
                'Minutes': new Date().getUTCMinutes(),
                'seconds': new Date().getUTCSeconds()
            };

            var timeString = utcTime.year + "-" + utcTime.month + "-" + utcTime.day + "__" +
                (utcTime.hours + tzHours) + ":" + utcTime.Minutes + ":" + utcTime.seconds;
            alert(timeString);
        }
    }
};
