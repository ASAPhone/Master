var locMonIntervalID = null;
(function() {
    "use strict";
    /*
   hook up event handlers
 */
    function register_event_handlers() {
        //open indexeddb current "blackListDB"
        openDb();
        scenarioTimeListener();
        //phoneEventListener(true);
        //timer
        var currentSecond = new Date().getSeconds();
        var delayTimer = 59 - currentSecond;
        setTimeout(function() {
            window.setInterval(function() {
                scenarioTimeListener();
            }, 60000);
        }, delayTimer * 1000);

        $(document).on("click", "#hm_btn_options", function(evt) {
            /* Other possible functions are:
            uib_sb.open_sidebar($sb)
            uib_sb.close_sidebar($sb)
            uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
            See js/sidebar.js for the full sidebar API */
            uib_sb.toggle_sidebar($("#home_sidebar"));
        });
        $(document).on("click", "#hm_sdb_addScense", function(evt) {
            addScenarioInit();
        });
        $(document).on("click", "#hm_sdb_blackList", function(evt) {
            uib_sb.close_sidebar($("#home_sidebar"));
            activate_page("#blackListPage");

            var transaction = dbBlackList.transaction([DB_STORE_NAME], "readonly");
            var readDataStore = transaction.objectStore(DB_STORE_NAME);
            var delayTime;
            readDataStore.openCursor().onsuccess = function(evt) {
                var cursor = evt.target.result;
                if (cursor) {
                    $(".blackListPagesubContent").html("");
                    delayTime = Loading();
                    setTimeout(function() {
                        printBlackList();
                    }, delayTime);
                }
            };
        });
        $(document).on("click", "#hm_sdb_settings", function(evt) {
            uib_sb.close_sidebar($("#home_sidebar"));
            activate_page("#settingsPage");
        });
        $(document).on("click", "#hm_sdb_about_us", function(evt) {
            uib_sb.close_sidebar($("#home_sidebar"));
            activate_page("#aboutUsPage");
        });
        $(document).on("click", "#btn_scene_add_cancel", function(evt) {
            if ($("#" + scenarioId + scenarioN).length) {
                $("#" + scenarioId + scenarioN).remove();
            }
            if ($("#addScenesPagesub > div > div > div > div#contentIF").length) {
                $("#addScenesPagesub > div > div > div > div#contentIF").remove();
                $("#addScenesPagesub > div > div > div > div#contentTHEN").remove();
                $("#addScenesPagesub > div > div > div").append('<div id="contentIF">IF</div>');
                $("#addScenesPagesub > div > div > div").append('<div id="contentTHEN">THEN</div>')
            }
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_scene_add_add", function(evt) {
            var ci = $("div#addScenesPagesub > div > div > div > div#contentIF > div:eq(0)");
            var ct = $("div#addScenesPagesub > div > div > div > div#contentTHEN > div:eq(0)");
            if (!ci.length && !ct.length) {
                alert("No set any condition and activities");
                return;
            } else if (!ci.length) {
                alert("No set any condition");
                return;
            } else if (!ct.length) {
                alert("No set any activities");
                return;
            }
            var conditionNumber = $("#addScenesPagesub").find("#contentIF").children().length;
            var actsNumber = $("#addScenesPagesub").find("#contentTHEN").children().length;
            var thisId = scenarioId + scenarioN;
            var sname = $("#tempScenarioName").val();

            $("<div/>", {
                'id': thisId,
                'class': 'scenarioForm',
                'data-scenarioname': sname,
                'data-conditionFlag': conditionNumber,
                'data-actFlag': actsNumber
            }).appendTo(".hm_content_senarios");

            $("#" + thisId).append('<div class="scenarioFormText"></div>');
            $("#" + thisId).append('<div class="scenarioFormBtn"></div>');

            $("<div/>", {
                'class': 'scenarioFormName',
                text: sname
            }).appendTo("#" + thisId + " > div.scenarioFormText");

            var stime = new Date();
            $("<div/>", {
                'class': 'scenarioFormTime',
                text: 'Time: ' + stime.getHours() + ":" + stime.getMinutes() + ":" + stime.getSeconds(),
            }).appendTo("#" + thisId + " > div.scenarioFormText");

            var d = '<div id="scenarioDel">' +
                '<i class="glyphicon glyphicon-trash" data-position="icon only"></i>' +
                '</div>';
            var e = '<div id="scenarioEdit">' +
                '<i class="glyphicon glyphicon-pencil" data-position="icon only"></i>' +
                '</div>';
            var i = '<div id="scenarioInfo">' +
                '<i class="glyphicon glyphicon-exclamation-sign" data-position="icon only"></i>' +
                '</div>';
            $("#" + thisId + " > div.scenarioFormBtn").append(d);
            $("#" + thisId + " > div.scenarioFormBtn").append(e);
            $("#" + thisId + " > div.scenarioFormBtn").append(i);

            $("#addScenesPagesub").find("#contentIF").appendTo("#" + thisId);
            $("#addScenesPagesub").find("#contentTHEN").appendTo("#" + thisId);
            $("#" + thisId).find("#contentIF").addClass("hidden");
            $("#" + thisId).find("#contentTHEN").addClass("hidden");
            $("#tempScenarioName").val("");
            var n = $("#addScenesPagesub").find("#contentIF");
            if (!n.length) {
                $("#cIFAndcTHEN").append('<div id="contentIF">IF</div>');
                $("#cIFAndcTHEN").append('<div id="contentTHEN">THEN</div>');
            }

            //driver condition check
            if ($("#" + thisId).find("#contentIF").find("#Ifdriver").length) {
                if (carListenerCheck == "none") {
                    carListenerCheck = "yes";
                    toFindTheKey(true);
                }
            }

            scenarioN++;
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_scene_edit_cancel", function(evt) {
            //title
            $("#addScenarioT").removeClass("hidden");
            $("#editScenarioT").addClass("hidden");
            $("#editScenarioT").text("Edit: " + name);
            //buttons
            $("#btn_scene_add_add").removeClass("hidden");
            $("#btn_scene_add_cancel").removeClass("hidden");
            $("#btn_scene_edit_save").addClass("hidden");
            $("#btn_scene_edit_cancel").addClass("hidden");
            //clear temp stored zone for scenario name and div id
            if ($("#addScenesPagesub > div > div > div > div#contentIF").length) {
                $("#addScenesPagesub > div > div > div > div#contentIF").remove();
                $("#addScenesPagesub > div > div > div > div#contentTHEN").remove();
                $("#addScenesPagesub > div > div > div").append('<div id="contentIF">IF</div>');
                $("#addScenesPagesub > div > div > div").append('<div id="contentTHEN">THEN</div>')
            }
            $("#scenarioEditName").val("");
            $("#scenarioEditId").val("");
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_scene_edit_save", function(evt) {
            var n = $("#scenarioEditName").val();
            var si = $("#scenarioEditId").val();

            if ($("#" + si + " > div#contentIF").length) {
                $("#" + si + " > div#contentIF").remove();
                $("#" + si + " > div#contentTHEN").remove();
            }

            if ($("#addScenesPagesub > div > div > div > div#contentIF").length) {
                $("#addScenesPagesub > div > div > div > div#contentIF").appendTo("#" + si);
                $("#addScenesPagesub > div > div > div > div#contentTHEN").appendTo("#" + si);
                $("#" + si + " > div#contentIF").addClass("hidden");
                $("#" + si + " > div#contentTHEN").addClass("hidden");
            }

            //title
            $("#addScenarioT").removeClass("hidden");
            $("#editScenarioT").addClass("hidden");
            $("#editScenarioT").text("Edit: " + name);
            //buttons
            $("#btn_scene_add_add").removeClass("hidden");
            $("#btn_scene_add_cancel").removeClass("hidden");
            $("#btn_scene_edit_save").addClass("hidden");
            $("#btn_scene_edit_cancel").addClass("hidden");
            //clear temp stored zone for scenario name and div id
            if ($("#addScenesPagesub > div > div > div > div#contentIF").length) {
                $("#addScenesPagesub > div > div > div > div#contentIF").remove();
                $("#addScenesPagesub > div > div > div > div#contentTHEN").remove();
                $("#addScenesPagesub > div > div > div").append('<div id="contentIF">IF</div>');
                $("#addScenesPagesub > div > div > div").append('<div id="contentTHEN">THEN</div>')
            }
            $("#scenarioEditName").val("");
            $("#scenarioEditId").val("");
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_blist_back", function(evt) {
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_hd_bl_clear_all", function(evt) {
            clearAllBlackListDB();
        });
        $(document).on("click", "#btn_bl_bt_add", function(evt) {
            activate_page("#blackListAdd");
            $("#inp_bl_add_name").focus();
        });
        $(document).on("click", "#btn_bl_add_clear", function(evt) {
            $("#inp_bl_add_name").val("");
            $("#inp_bl_add_phNum").val("");
            $("#inp_bl_add_name").focus();
        });
        $(document).on("click", "#btn_bl_add_cancel", function(evt) {
            if ($("#inp_bl_add_name").val())
                $("#inp_bl_add_name").val("");
            if ($("#inp_bl_add_phNum").val())
                $("#inp_bl_add_phNum").val("");
            activate_page("#blackListPage");
        });
        $(document).on("click", "#btn_bl_add_add", function(evt) {
            addDataToBL();
        });
        $(document).on("click", "#btn_bl_edit_cancel", function(evt) {
            activate_page("#blackListPage");
        });
        $(document).on("click", "#btn_settings_back", function(evt) {
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_about_us_back", function(evt) {
            activate_page("#homePage");
        });
        $(document).on("click", "#btn_loc_select_cancel", function(evt) {
            activate_page("#addScenesPage");
        });
        $(".blackListPagesubContent").on("click", "div.bl_select", function(evt) {
            var getSelectedKey = $(this).data("key");
            var getSelectDiv = $(this).attr("id");
            //alert($(this).children(".bl_left_content").text());
            deleteOrEdit(getSelectedKey, getSelectDiv);
        });
        $("#btn_bl_edit_save").on("click", function(evt) {
            var key = $("#inp_bl_edit_key").val();
            var oldData = {
                name: $("#BListID_" + key + "_name").text(),
                phNum: $("#BListID_" + key + "_phNum").text(),
            };
            editPersonData(oldData);
        });
        //handler location monitor #inp_set_locMon_min #set_locMon_check
        //locMonIntervalID
        $("#set_locMon_check").change(function(evt) {
            var locMonCheck = $(this).prop("checked");
            var locMonTime = $("#inp_set_locMon_min").val();
            if (locMonCheck) {
                if (locMonTime < 1 || isNaN(locMonTime)) {
                    $("#inp_set_locMon_min").val("");
                    alert("The time for location monitor must be greater or equal(s) to 1 minute,\nand must enter number");
                    $(this).prop("checked", false).checkboxradio("refresh");
                    return;
                }
                locMonIntervalID = setInterval(locationEventListener, locMonTime * 60000);
                alert("Location Monitor has started.");
                console.log(locMonCheck);
                return;
            }
            clearInterval(locMonIntervalID);
            alert("Location Monitor has stopped.");
            console.log(locMonCheck);
        });
        //handler battery monitor #set_btyMon_check
        $("#set_btyMon_check").change(function(evt) {
            var btyMonCheck = $(this).prop("checked");
            if (btyMonCheck) {
                batteryEventListener(btyMonCheck);
                alert("Battery Monitor has started.");
                return;
            }
            batteryEventListener(btyMonCheck);
            alert("Battery Monitor has stopped.");
        });

        //add scenes functions select
        //if or then block "#btn_scene_add_funs"
        $(document).on("click", "#btn_scene_add_funs", function(evt) {
            //prepend confirm div
            $("<div/>", {
                "id": "add_scene_confirm",
                "title": "What you want to...",
                "style": "padding: 5px",
                text: "You can select [IF-condition],\nor [THEN-in that condition what you want to do]"
            }).prependTo("body");

            //display dialog
            $("#add_scene_confirm").dialog({
                autoOpen: true,
                dialogClass: "no-close",
                height: "auto",
                modal: true,
                buttons: [{
                    text: "--IF--",
                    "class": "ui-button-primary",
                    click: function() {
                        // alert("if");
                        // selCondition($(this).parent());
                        selCondition($("#add_scene_confirm"));
                        $(this).dialog("close");
                        //$(this).parent().addClass("hidden");
                    }
                }, {
                    text: "-THEN-",
                    "class": "ui-button-success",
                    click: function() {
                        // selActivity($(this).parent());
                        selActivity($("#add_scene_confirm"));
                        $(this).dialog("close");
                        // $(this).parent().addClass("hidden");
                        //alert("then");
                    }
                }, {
                    text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                        $(this).remove();
                    }
                }]
            });
        });
        $(document).on("click", "#condition_time", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime");
            if (!e.length)
                IfTimeFunc(1);
            else
                IfTimeFunc(2);
        });
        $(document).on("click", "#condition_battery", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery");
            if (!e.length)
                IfBatteryFunc(1);
            else
                IfBatteryFunc(2);
        });
        $(document).on("click", "#condition_loc", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc");
            if (!e.length)
                IfLocFunc(1);
            else
                IfLocFunc(2);
        });
        $(document).on("click", "#condition_speed", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed");
            if (!e.length)
                IfSpeedFunc(1);
            else
                IfSpeedFunc(2);
        });
        /*$(document).on("click", "#condition_phCall", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall");
            if (!e.length)
                IfPhoneCallFunc(1);
            else
                IfPhoneCallFunc(2);
        });*/
        $(document).on("click", "#condition_driver", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver");
            if (!e.length)
                IfdriverFunc(1);
            else
                IfdriverFunc(2);
        });
        $(document).on("click", "#condition_motion", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion");
            if (!e.length)
                IfBodyActFunc(1);
            else
                IfBodyActFunc(2);
        });
        $(document).on("click", "#btn_loc_sel_cance", function() {
            locSelRemove();
            activate_page("#addScenesPage");
            $("#loc_panel").dialog("open");
        });
        /*$(document).on("click", "#condition_settings", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings");
            if (!e.length)
                IfSettingsFunc(1);
            else
                IfSettingsFunc(2);
        });*/
        $(document).on("click", "#activities_sounds", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound");
            if (!e.length)
                ThenSoundFunc(1);
            else
                ThenSoundFunc(2);
        });
        $(document).on("click", "#activities_vibration", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate");
            if (!e.length)
                ThenVibrateFunc(1);
            else
                ThenVibrateFunc(2);
        });
        $(document).on("click", "#activities_screenlight", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt");
            if (!e.length)
                ThenScreenLtFunc(1);
            else
                ThenScreenLtFunc(2);
        });
        $(document).on("click", "#activities_settins", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings");
            if (!e.length)
                ThenSettingsFunc(1);
            else
                ThenSettingsFunc(2);
        });
        $(document).on("click", "#activities_phonecall", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall");
            if (!e.length)
                ThenPhCallFunc(1);
            else
                ThenPhCallFunc(2);
        });
        /*$(document).on("click", "#activities_camera", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera");
            if (!e.length)
                ThenCameraFunc(1);
            else
                ThenCameraFunc(2);
        });*/
        $(document).on("click", "#activities_sleepmode", function() {
            var e = $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM");
            if (!e.length)
                ThenSleepModeFunc(1);
            else
                ThenSleepModeFunc(2);
        });
        $(document).on("click", "#scenarioDel", function() {
            $(this).parent().parent().remove();
        });
        $(document).on("click", "#scenarioInfo", function() {
            var n = $(this).parent().parent().attr("data-scenarioname");
            var i = $(this).parent().parent().attr("id");
            scenarioDisplayInfo(n, i);
        });
        $(document).on("click", "#scenarioEdit", function() {
            var n = $(this).parent().parent().attr("data-scenarioname");
            var i = $(this).parent().parent().attr("id");
            scenarioEdit(n, i);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion", function() {
            sceneDeleteOrEdit("Ifmotion", IfBodyActFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver", function() {
            sceneDeleteOrEdit("Ifdriver", IfdriverFunc);
        });
        /*$(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall", function() {
            sceneDeleteOrEdit("IfphCall", IfPhoneCallFunc);
        });*/
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed", function() {
            sceneDeleteOrEdit("IfSpeed", IfSpeedFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc", function() {
            sceneDeleteOrEdit("IfLoc", IfLocFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery", function() {
            sceneDeleteOrEdit("IfBattery", IfBatteryFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfTime", function() {
            sceneDeleteOrEdit("IfTime", IfTimeFunc);
        });
        /*$(document).on("click", "#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings", function() {
            sceneDeleteOrEdit("IfSettings", IfSettingsFunc);
        });*/
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound", function() {
            sceneDeleteOrEdit("ThenSound", ThenSoundFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate", function() {
            sceneDeleteOrEdit("ThenVibrate", ThenVibrateFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt", function() {
            sceneDeleteOrEdit("ThenSrcLt", ThenScreenLtFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings", function() {
            sceneDeleteOrEdit("ThenSettings", ThenSettingsFunc);
        });
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall", function() {
            sceneDeleteOrEdit("ThenPhCall", ThenPhCallFunc);
        });
        /*$(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera", function() {
            sceneDeleteOrEdit("ThenCamera", ThenCameraFunc);
        });*/
        $(document).on("click", "#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM", function() {
            sceneDeleteOrEdit("ThenSlpM", ThenSleepModeFunc);
        });
    }
    $(document).ready(register_event_handlers);
})();

/**
 * Loading function is to load while data is not stored
 * @param {[number, unit "milliseconds"]} time [how much time you want to delay, default is 1000 milliseconds]
 * @return {[number], unit "milliseconds"} [return whole time loading function used, can be used in setTimeout function]
 */
function Loading(time) {
    //disable all button
    $("button").attr("disabled", "disabled");
    //append div to body
    $("<div/>", {
        "id": "dropElem"
    }).prependTo("body");
    $("<div/>", {
        "id": "dropContent",
        text: 'Loading... '
    }).append('<img src="img/ajax-loader.gif" height="20" width="20">').appendTo("#dropElem");
    $("<div/>", {
        "id": "shadowElem"
    }).prependTo("body");

    //variables
    //showSpeed is start and end speed
    var showSpeed = 200;
    //appearTime is this div appear time
    var appearTime = 1000;
    if (time != undefined && time != null)
        appearTime = time;
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    var elemWidth = $('#dropElem').outerWidth(true);
    var elemHeight = $('#dropElem').outerHeight(true)
    var leftPosition = (screenWidth / 2) - (elemWidth / 2);
    var topPosition = (screenHeight / 2) - (elemHeight / 2);

    //animation
    $('#dropElem').css({
        'left': leftPosition + 'px',
        'top': topPosition + 'px',
        'opacity': 0
    });

    $("#shadowElem").animate({
        'opacity': 0.7
    }, showSpeed).delay(appearTime);

    $('#dropElem').show().animate({
        'opacity': 1
    }, showSpeed).delay(appearTime);

    $("#shadowElem").animate({
        'opacity': 0
    }, showSpeed);
    $('#dropElem').animate({
        'opacity': 0
    }, showSpeed, function() {
        $("#shadowElem").remove();
        $(this).remove();
        $("button").removeAttr("disabled");
    });
    return ((showSpeed * 2) + appearTime);
}

function scenarioTimeListener() {
    console.log("4--" + Date().toString());
    var scenarioNum = $(".hm_content_senarios").children().length;
    for (var i = 0; i < scenarioNum; i++) {
        if (!$(".hm_content_senarios").children().filter(":eq(" + i + ")").find("#IfTime").length) {
            continue;
        }
        var currentHr = new Date().getHours();
        var currentMin = new Date().getMinutes();
        console.log("current hours: " + currentHr);
        console.log("current minutes: " + currentMin);
        var $thisScenario = $(".hm_content_senarios").children().filter(":eq(" + i + ")");
        var chour = $thisScenario.find("#IfTime").attr("data-hours");
        var cminute = $thisScenario.find("#IfTime").attr("data-minutes");
        if (chour == currentHr && cminute == currentMin) {
            executeActs($thisScenario);
        }
    }
}
