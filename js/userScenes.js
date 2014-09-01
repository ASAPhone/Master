var conditionID = ["time", "battery", "loc", "speed", "driver", "motion"];
var conditionText = ["Time", "Battery", "Location", "Moving Speed", "Driver", "Activity Recognition"];
var conditionImg = ["time_1.png" ,"battery_1.png", "location.png", "speed.png", "driver.png", "runner.png"];
var activitiesID = ["sounds", "vibration", "screenlight", "settins", "phonecall", "sleepmode"];
var activitiesText = ["Sounds", "Vibration", "Screen Light", "Settings", "Phone Call", "Sleep Mode"];
var activitiesImg = ["volume_2.png", "vibrate.png", "brightness_2.png", "setting_2.png", "phone_1.png", "sleep_1.png"];
var scenarioN = 1;
const scenarioId = 'scenario_';
/**
 * [addScenarioInit is a function to add scenario,
 * prompt user to input current name of the scenario,
 * if not, cancel this process]
 */
function addScenarioInit() {
    $("<div/>", {
        'id': 'scenarioInitName',
        'title': 'Scenario Name',
    }).prependTo('body');
    var st = '<p style="padding: 0px 10px 0px; margin: 0px">Enter this name of the scenario you are going to add</p>';
    $("#scenarioInitName").append(st);

    $("#scenarioInitName").dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: "auto",
        width: "auto",
        modal: true,
        buttons: [{
            text: "Confirm",
            "class": "ui-button-success",
            click: function() {
                var n = $("#scInitName").val();
                var $tp = $("#scenarioInitName > p");
                var f = $("#scenarioInitName > p > span:eq(0)");
                if (n == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Must enter scenario name</span>');
                    return;
                }
                $("#tempScenarioName").val(n);
                uib_sb.close_sidebar($("#home_sidebar"));
                activate_page("#addScenesPage");
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    $("#scenarioInitName").append('<div id="scenarioInitNameContent"></div>');
    $("#scenarioInitNameContent").append('<label class="narrow-control label-top-left">Scenario Name</label>');
    $("#scenarioInitNameContent").append('<input class="wide-control form-control" type="text" placeholder="text (ex. back home, 回家)" id="scInitName">');
    $("#scenarioInitNameContent").find("#scInitName").focus();
}

function scenarioDisplayInfo(name, scenarioId) {
    $("<div/>", {
        "id": "sdinfo",
        "title": name
    }).prependTo("body");
    var dwidth = $(window).width();
    var dheight = $(window).height();
    $("#sdinfo").dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    $("#sdinfo").append('<div class="scenario_info_fixed_scroll"></div>');
    $("div#sdinfo > div.scenario_info_fixed_scroll").html("");

    var ci = "#" + scenarioId + " > div#contentIF";
    var ct = "#" + scenarioId + " > div#contentTHEN";
    $(ci).clone().appendTo(".scenario_info_fixed_scroll");
    $(ct).clone().appendTo(".scenario_info_fixed_scroll");
    var ti = ".scenario_info_fixed_scroll > div#contentIF";
    var tt = ".scenario_info_fixed_scroll > div#contentTHEN";
    $(ti).removeClass("hidden");
    $(tt).removeClass("hidden");
    /*//info contentIF children div length and contentTHEN
    var lengthNewCIF = $(ti).children().length;
    var lengthNewCTHEN = $(tt).children().length;
    for (var i = 0; i < lengthNewCIF; i++) {
        $(ti).children().filter(':eq(' + i + ')').removeAttr('onclick');
    }
    for (var i = 0; i < lengthNewCTHEN; i++) {
        $(tt).children().filter(':eq(' + i + ')').removeAttr('onclick');
    }*/
}

function scenarioEdit(name, scenarioId) {
    //pre-store current scenario name and div id
    $("#scenarioEditName").val(name);
    $("#scenarioEditId").val(scenarioId);
    //clone and append origin contentIF and contentTHEN to addscenesPage
    if ($("#addScenesPagesub > div > div > div > div#contentIF").length) {
        $("#addScenesPagesub > div > div > div > div#contentIF").remove();
        $("#addScenesPagesub > div > div > div > div#contentTHEN").remove();
    }
    //use clone avoid data lose
    $("#" + scenarioId + " > div#contentIF").clone().appendTo("#addScenesPagesub > div > div > div.widget-container");
    $("#" + scenarioId + " > div#contentTHEN").clone().appendTo("#addScenesPagesub > div > div > div.widget-container");
    $("#addScenesPagesub > div > div > div > div#contentIF").removeClass("hidden");
    $("#addScenesPagesub > div > div > div > div#contentTHEN").removeClass("hidden");
    activate_page("#addScenesPage");

    //title
    $("#addScenarioT").addClass("hidden");
    $("#editScenarioT").removeClass("hidden");
    $("#editScenarioT").text("Edit: " + name);
    //buttons
    $("#btn_scene_add_add").addClass("hidden");
    $("#btn_scene_add_cancel").addClass("hidden");
    $("#btn_scene_edit_save").removeClass("hidden");
    $("#btn_scene_edit_cancel").removeClass("hidden");
}

/**
 * [selCondition is to display list which give user select some condition]
 */
function selCondition(lastDia) {
    $("<div/>", {
        "id": "sel_condition_confirm",
        "title": "Select condition...",
    }).prependTo("#addScenesPagesub");

    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#sel_condition_confirm").dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                lastDia.dialog("open");
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });

    $("<div/>", {
        "id": "conditionPanel",
    }).appendTo("#sel_condition_confirm");

    for (var i in conditionID) {
        $("<div/>", {
            "id": "condition_" + conditionID[i],
            "class": "conditionForm",
            "data-condition": conditionID[i],
            //text: conditionText[i]
        }).appendTo("#conditionPanel");
        $("#condition_" + conditionID[i]).html('<img src="img/' + conditionImg[i] + '" width="30px" height="30px" alt="' + conditionText[i] + '"><span style="padding-left: 10px">' + conditionText[i] + '</span>');
    }
}

/**
 * [selActivity is to display list which give user select some function to execute]
 */
function selActivity(lastDia) {
    $("<div/>", {
        "id": "sel_execute_confirm",
        "title": "Select activities...",
    }).prependTo("body");

    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#sel_execute_confirm").dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                lastDia.dialog("open");
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });

    $("<div/>", {
        "id": "activitiesPanel",
    }).appendTo("#sel_execute_confirm");

    for (var i in activitiesID) {
        $("<div/>", {
            "id": "activities_" + activitiesID[i],
            "class": "activitiesForm",
            "data-activities": activitiesID[i],
            //text: activitiesText[i]
        }).appendTo("#activitiesPanel");
        $("#activities_" + activitiesID[i]).html('<img src="img/' + activitiesImg[i] + '" width="30px" height="30px" alt="' + activitiesText[i] + '"><span style="padding-left: 10px">' + activitiesText[i] + '</span>');
    }
}

function sceneDeleteOrEdit(selectedId, selectedFunc) {
    var confirmId = selectedId + "_confirm";
    $("<div/>", {
        "id": confirmId,
        "title": "What you want to...",
        "style": "padding: 10px 10px",
        text: "You can delete or edit selected data."
    }).prependTo("body");

    $("#" + confirmId).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: "auto",
        modal: true,
        buttons: [{
            text: "Delete",
            "class": "ui-button-danger",
            click: function() {
                $("#" + selectedId).remove();
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Edit",
            "class": "ui-button-warning",
            click: function() {
                selectedFunc(2);
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
}

/**
 * [IfBodyActFunc condition while if standing, walking, running, and sitting]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function IfBodyActFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Activity Recognition...";
        btn = "Add";
        headT = "Select activity for Standing, Walking, Running, and Sitting...";
    } else if (mode == 2) {
        titleT = "Activity Recognition...";
        btn = "Edit";
        headT = "Select activity for Standing, Walking, Running, and Sitting...";
    }

    var dialogID = "motion_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var act = $("#" + dialogID + "_acts").val();
                var actsd = "Activity : ";

                switch (act) {
                    case "0":
                        actsd += "Sitting";
                        break;
                    case "1":
                        actsd += "Standing";
                        break;
                    case "2":
                        actsd += "Walking";
                        break;
                    case "3":
                        actsd += "Running";
                        break;
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "Ifmotion",
                        "class": "contentIfForm",
                        "data-bodyacts": act,
                        // "onclick": 'sceneDeleteOrEdit("Ifmotion", IfBodyActFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("Ifmotion", IfBodyActFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion").html(actsd);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion").attr("data-bodyacts", act);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion").html(actsd);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    var actsCondition = '<div class="motion_panel_content">' +
        '<label class="narrow-control label-top-left">Activities</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_acts">' +
        '<option value="0">Sitting</option>' +
        '<option value="1">Standing</option>' +
        '<option value="2">Walking</option>' +
        '<option value="3">Running</option>' +
        '</select>' + '</div>';
    $dialogPanel.append(actsCondition);
    if (mode == 2) {
        var th = $("#" + dialogID + "_acts");
        th.val($("#addScenesPagesub > div > div > div > div#contentIF > div#Ifmotion").attr("data-bodyacts"));
        var c = th.val();
        switch (c) {
            case "0":
                th.filter(":selected").text("Sitting");
                break;
            case "1":
                th.filter(":selected").text("Standing");
                break;
            case "2":
                th.filter(":selected").text("Walking");
                break;
            case "3":
                th.filter(":selected").text("Running");
                break;
        }
    }
}

/**
 * [IfdriverFunc condition whether you are driving]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function IfdriverFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Driver...";
        btn = "Add";
        headT = "Whether you are driving, if so select Yes, or No...<br>Otherwise, Cancel";
    } else if (mode == 2) {
        titleT = "Driver...";
        btn = "Edit";
        headT = "Whether you are driving, if so select Yes, or No...<br>Otherwise, Cancel";
    }

    var dialogID = "driver_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var dr = $("#" + dialogID + "_sel").val();

                var driverC = "";
                if (parseInt(dr)) {
                    driverC = "Driving : on";
                } else {
                    driverC = "Driving : off";
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "Ifdriver",
                        "class": "contentIfForm",
                        "data-driving": dr,
                        // "onclick": 'sceneDeleteOrEdit("Ifdriver", IfdriverFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("Ifdriver", IfdriverFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver").html(driverC);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver").html(driverC);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver").attr("data-driving", dr);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    var drivingCondition = '<div class="driver_panel_content">' +
        '<label class="narrow-control label-top-left">Whether driving...</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_sel">' +
        '<option value=1>On</option>' +
        '<option value=0>Off</option>' +
        '</select>' +
        '</div>';
    $dialogPanel.append(drivingCondition);
    if (mode == 2) {
        var th = $("#" + dialogID + "_sel");
        th.val($("#addScenesPagesub > div > div > div > div#contentIF > div#Ifdriver").attr("data-driving"));
        if (th.val())
            th.filter(":selected").text("On");
        else
            th.filter(":selected").text("Off");
    }
}

/**
 * [IfPhoneCallFunc condition while who call in]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
/*function IfPhoneCallFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "While someone call in...";
        btn = "Add";
        headT = "Enter name and phone number";
    } else if (mode == 2) {
        titleT = "While someone call in...";
        btn = "Edit";
        headT = "Edit name and phone number";
    }
    //append div for produce dialog
    var dialogID = "phCall_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var Iname = $("#if_phCall_name").val();
                var Iph = $("#if_phCall_phNum").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (Iname == "" && Iph == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter name and phone number,<br>or Cancel</span>');
                    $("#if_phCall_name").val("");
                    $("#if_phCall_phNum").val("");
                    $("#if_phCall_name").focus();
                    return;
                } else if (isNaN(Iph)) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Phone must be number</span>');
                    $("#if_phCall_phNum").val("");
                    $("#if_phCall_phNum").focus();
                    return;
                } else if (Iname == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter name, or Cancel</span>');
                    $("#if_phCall_name").focus();
                    return;
                } else if (Iph == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter phone number, or Cancel</span>');
                    $("#if_phCall_phNum").focus();
                    return;
                }

                var phd = "Name : " + Iname + "<br>Phone number : " + Iph;

                if (mode == 1) {
                    $("<div/>", {
                        "id": "IfphCall",
                        "class": "contentIfForm",
                        "data-name": Iname,
                        "data-phnum": Iph,
                        // "onclick": 'sceneDeleteOrEdit("IfphCall", IfPhoneCallFunc);'
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").html(phd);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").html(phd);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").attr("data-name", Iname);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").attr("data-phnum", Iph);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });

    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="phCall_panel_content"></div>');
    $(".phCall_panel_content").append('<label class="narrow-control label-top-left">Name</label>');
    $(".phCall_panel_content").append('<input class="wide-control form-control" type="text" placeholder="Text (ex. John)" name="if_phCall_name" id="if_phCall_name">');
    $(".phCall_panel_content").append('<label class="narrow-control label-top-left">Phone Number</label>');
    $(".phCall_panel_content").append('<input class="wide-control form-control" type="text" placeholder="Only Number" name="if_phCall_phNum" id="if_phCall_phNum">');
    $("#if_phCall_name").focus();
    if (mode == 2) {
        $("#if_phCall_name").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").attr("data-name"));
        $("#if_phCall_phNum").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfphCall").attr("data-phnum"));
    }
}*/

/**
 * [IfSpeedFune condition moving speed]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function IfSpeedFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Set device moving speed...";
        btn = "Add";
        headT = "While device moving speed over...";
    } else if (mode == 2) {
        titleT = "Edit device moving speed...";
        btn = "Edit";
        headT = "While device moving speed over...";
    }
    //append div for produce dialog
    var dialogID = "speed_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var spd = $("#" + dialogID + "_inp_speed").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (spd == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please enter speed as number,<br>or you can cancel</span>');
                    $("#" + dialogID + "_inp_speed").val("");
                    return;
                } else if (spd < 0) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Speed is not less than 0</span>');
                    $("#" + dialogID + "_inp_speed").val("");
                    return;
                }

                var sdc;
                if (spd < 10) {
                    sdc = "Speed : 0" + spd + "km\/hr";
                } else {
                    sdc = "Speed : " + spd + "km\/hr";
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "IfSpeed",
                        "class": "contentIfForm",
                        "data-speed": spd,
                        // "onclick": 'sceneDeleteOrEdit("IfSpeed", IfSpeedFunc);',
                        /*click: function() {
                            sceneDeleteOrEdit("IfSpeed", IfSpeedFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed").html(sdc);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed").html(sdc);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed").attr("data-speed", spd);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });

    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    var speedCondition = '<div class="speed_panel_content">' +
        '<input class="wide-control form-control" type="number" placeholder="km/hr" id="' + dialogID + '_inp_speed">' +
        '</div>';
    $dialogPanel.append(speedCondition);
    if (mode == 2) {
        $("#" + dialogID + "_inp_speed").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfSpeed").attr("data-speed"));
    }
}
/**
 * [IfLocFunc condition location]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function IfLocFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Add location...";
        btn = "Add";
        headT = "Location for latitude, longitude and radius<br>When you are in the range of you select,<br>do something you set.";
    } else if (mode == 2) {
        titleT = "Edit location...";
        btn = "Edit";
        headT = "Location for latitude, longitude and radius<br>When you are in the range of you select, do something you set.";
    }
    //append div for produce dialog
    var dialogID = "loc_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT
    }).prependTo("body");

    var dwidth = $(window).width() * 0.9;
    var dheight = $(window).height() * 0.9;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: "Select Location",
            "class": "ui-button-info",
            click: function() {
                $("#loc_panel").dialog("close");
                activate_page("#locSelectPage");
                if (!$("#loc_sel_inp_search").length)
                    $("#locSelectPageSub").append('<input id="loc_sel_inp_search" class="loc_sel_controls" type="text" placeholder="Search Box">');
                if (!$("#loc_sel_map_canvas").length)
                    $("#locSelectPageSub").append('<div id="loc_sel_map_canvas"></div>');
                $submitP = $(".loc_panel_content").find("#submit_place");
                if ($submitP.length) {
                    $submitP.remove();
                }
                locSelSearchInit();
            }
        }, {
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var r = $("#loc_panel_radius").val();
                var pn = $("#submit_place").attr("data-placename");
                var paddress = $("#submit_place").attr("data-address");
                var lat = $("#submit_place").attr("data-lat");
                var lng = $("#submit_place").attr("data-lng");
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");
                //check value
                if (r < 0 || r > 50000) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please enter radius<br>as number from 0 to 50,000</span>');
                    $("#loc_panel_radius").val("");
                    return;
                } else if (r == "") {
                    r = 20;
                } else if (pn == undefined) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>You don\'t select any location,<br>or you can cancel</span>');
                    return;
                }

                var dispalyInfo = 'Place: ' + pn + '<br>Address: ' + paddress + '<br>Within: ' + r + ' meter(s)';

                if (mode == 1) {
                    $("<div/>", {
                        "id": "IfLoc",
                        "class": "contentIfForm",
                        "data-pname": pn,
                        "data-lat": lat,
                        "data-lng": lng,
                        "data-address": paddress,
                        "data-locradius": r,
                        // "onclick": 'sceneDeleteOrEdit("IfLoc", IfLocFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("IfLoc", IfLocFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").html(dispalyInfo);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").html(dispalyInfo);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-pname", pn);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-lat", lat);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-lng", lng);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-address", paddress);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-locradius", r);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    //The distance from the given location within which to search for Places, in meters. The maximum allowed value is 50 000.
    var locCondition = '<div class="loc_panel_content"></div>';
    // var locTextContent = 'Default: ';
    var locR = '<label class="narrow-control label-top-left">Add Location and Radius(0~50000 mmeters, default 100m)</label>' +
        '<input class="wide-control form-control input-sm" type="number" placeholder="number" id="' + dialogID + '_radius" value=20>';
    //append content
    $dialogPanel.append(locCondition);
    $(".loc_panel_content").append(locR);
    if (mode == 2) {
        $("#" + dialogID + "_radius").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-locradius"));
        var tarPlaceC = '<span>Place:<br></span>' +
            '<span style="font-weight: normal;">' + $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-pname") + '</span><br>' +
            '<span>Address:<br></span>' +
            '<span style="font-weight: normal;">' + $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-address") + '</span>';
        /* +
                                '<br>Latitude: ' + marker.position.lat() +
                                '<br>Longitude: ' + marker.position.lng()*/
        $("<div/>", {
            "id": "submit_place",
            "style": 'padding-top: 10px; font-size: 14px; font-weight: bold;',
            "data-lat": $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-lat"),
            "data-lng": $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-lng"),
            "data-address": $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-address"),
            "data-placename": $("#addScenesPagesub > div > div > div > div#contentIF > div#IfLoc").attr("data-pname")
        }).appendTo(".loc_panel_content");
        $("#submit_place").append(tarPlaceC);
    }
}

/**
 * [IfBatteryFunc condition Battery]
 * @param {[number integer]} mode [selectmod Add: 1, Edit: 2]
 */
function IfBatteryFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Select Info of Battery...";
        btn = "Add";
        headT = 'Condition of Battery or level of Battery<br><span style="color: orange">(0%~100%, without character \"\%\")</span>';
    } else if (mode == 2) {
        titleT = "Edit Info of Battery...";
        btn = "Edit";
        headT = 'Condition of Battery or level of Battery<br><span style="color: orange">(0%~100%, without character \"\%\")</span>';
    }
    //append div for produce dialog
    var dialogID = "battery_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var bc = $("#" + dialogID + "_charge").val();
                var blv = $("#" + dialogID + "_level").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(1)");
                if (isNaN(blv)) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please enter battery level<br>as number from 0 to 100</span>');
                    $("#" + dialogID + "_level").val("");
                    return;
                } else if (blv < 0 || blv > 100) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Battery level must be between 0 to 100</span>');
                    $("#" + dialogID + "_level").val("");
                    return;
                }
                //display data for level
                var dbc = "",
                    dbl = "";
                switch (bc) {
                    case "2":
                        dbc = "";
                        break;
                    case "1":
                        dbc = "Battery charging: true";
                        break;
                    case "0":
                        dbc = "Battery charging: false";
                        break;
                }
                if (blv != "") {
                    if (blv < 10)
                        dbl = "Battery Level: 0" + blv + "\%";
                    else
                        dbl = "Battery Level: " + blv + "\%";
                }
                //append to add scene
                if (dbc != "" || dbl != "") {
                    if (mode == 1) {
                        $("<div/>", {
                            "id": "IfBattery",
                            "class": "contentIfForm",
                            "data-bcharging": bc,
                            "data-blevel": blv,
                            // "onclick": 'sceneDeleteOrEdit("IfBattery", IfBatteryFunc);'
                            /*click: function() {
                                sceneDeleteOrEdit("IfBattery", IfBatteryFunc);
                            }*/
                        }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                        if (dbc == "")
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbl);
                        else if (dbl == "")
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbc);
                        else
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbc + "<br>" + dbl);
                    } else if (mode == 2) {
                        if (dbc == "")
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbl);
                        else if (dbl == "")
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbc);
                        else
                            $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").html(dbc + "<br>" + dbl);
                        $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").attr("data-bcharging", bc);
                        $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").attr("data-blevel", blv);
                    }
                    $(this).dialog("close");
                    $(this).remove();
                } else {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>You don\'t select any condition</span>');
                    return;
                }
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    var btyCondition = '<div class="battery_panel_charge">' +
        '<label class="narrow-control label-top-left">Battery condition</label>' +
        '<select class="wide-control form-control input-xsm" id="' + dialogID + '_charge">' +
        '<option value=2>None</option>' +
        '<option value=1>Charging</option>' +
        '<option value=0>Uncharging</option>' +
        '</select>' +
        '</div>';
    var btyLevel = '<div class="battery_panel_level">' +
        '<label class="narrow-control label-top-left">Battery level</label>' +
        '<input class="wide-control form-control input-xsm" type="text" placeholder="0\%\~100\%" id="' + dialogID + '_level">' +
        '</div>';
    $dialogPanel.append(btyCondition);
    $dialogPanel.append(btyLevel);
    if (mode == 2) {
        var a = $("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").attr("data-bcharging");
        $("#" + dialogID + "_charge").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").attr("data-bcharging"));
        switch (a) {
            case "1":$("#" + dialogID + "_charge").filter(":selected").text("Charging");break;
            case "0":$("#" + dialogID + "_charge").filter(":selected").text("Uncharging");break;
            case "2":$("#" + dialogID + "_charge").filter(":selected").text("none");break;
        }
        $("#" + dialogID + "_level").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfBattery").attr("data-blevel"));
    }
}

/**
 * [IfTimeFunc condition time]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function IfTimeFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Select time...";
        btn = "Add";
        headT = "Time for hours(24hr) and minutes";
    } else if (mode == 2) {
        titleT = "Edit time...";
        btn = "Edit";
        headT = "Time for hours(24hr) and minutes";
    }
    //append div for produce dialog
    var dialogID = "time_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");

    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var h = $("#inp_hours").val();
                var m = $("#inp_minutes").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span");
                if (h == "" && m == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please enter hours or minutes as number</span>');
                    $("#inp_hours").val("");
                    $("#inp_minutes").val("");
                    return;
                } else if (h < 0 && m < 0) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Hours and minutes must be greater or equal(s) to 0</span>');
                    $("#inp_hours").val("");
                    $("#inp_minutes").val("");
                    return;
                } else if (h < 0 || h > 23) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Hours must be between 0 to 23</span>');
                    $("#inp_hours").val("");
                    return;
                } else if (m < 0 || m > 59) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Minutes must be between 0 to 59</span>');
                    $("#inp_minutes").val("");
                    return;
                }
                var d;
                if (h == "") {
                    if (m < 10) {
                        d = "00:0" + m;
                    } else {
                        d = "00:" + m;
                    }
                } else if (m == "") {
                    if (h < 10) {
                        d = "0" + h + ":00";
                    } else {
                        d = h + ":00";
                    }
                } else {
                    if (h < 10 && m < 10) {
                        d = "0" + h + ":" + "0" + m;
                    } else if (h < 10) {
                        d = "0" + h + ":" + m;
                    } else if (m < 10) {
                        d = h + ":" + "0" + m;
                    } else {
                        d = h + ":" + m;
                    }
                }
                if (mode == 1) {
                    $("<div/>", {
                        "id": "IfTime",
                        "class": "contentIfForm",
                        "data-hours": h,
                        "data-minutes": m,
                        text: "Time: " + d,
                        // "onclick": 'sceneDeleteOrEdit("IfTime", IfTimeFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("IfTime", IfTimeFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime").html("Time: " + d);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime").attr("data-hours", h);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime").attr("data-minutes", m);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding-top: 5px; padding-left: 10px">' + headT + '</p>';
    $dialogPanel.append(tText);
    var hours = '<div class="' + dialogID + '_hours">' +
        '<input class="wide-control form-control input-xsm" type="number" placeholder="hours(0\~23)" id="inp_hours">' + '</div>';
    var minutes = '<div class="' + dialogID + '_minutes">' +
        '<input class="wide-control form-control input-xsm" type="number" placeholder="minutes(0\~59)" id="inp_minutes">' + '</div>';
    var betweenText = '<div style="padding: 0px 5px 0px 5px; float:left; display: inline-block; line-height: 22px">:</div>'
    $dialogPanel.append(hours);
    $dialogPanel.append(betweenText);
    $dialogPanel.append(minutes);
    if (mode == 2) {
        $("#inp_hours").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime").attr("data-hours"));
        $("#inp_minutes").val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfTime").attr("data-minutes"));
    }
}

/**
 * [IfSettingsFunc condition WiFi, Bluetooth, Geolocation, and Mobile Network]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
/*function IfSettingsFunc(mode) {
    removeLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Select settings...";
        btn = "Add";
        headT = "WiFi, Bluetooth, Geolocation, and Mobile Network is on/off...";
    } else if (mode == 2) {
        titleT = "Edit settings...";
        btn = "Edit";
        headT = "WiFi, Bluetooth, Geolocation, and Mobile Network is on/off...";
    }
    //append div for produce dialog
    var dialogID = "settings_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var w = $("#settings_panel_swifi").val();
                var b = $("#settings_panel_sbluetooth").val();
                var g = $("#settings_panel_sgps").val();
                var a = $("#settings_panel_swap").val();

                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (w == 2 && b == 2 && g == 2 && a == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please select at least one, or cancel</span>');
                    return;
                }

                var dis = "",
                    wc, bc, gc, ac;

                switch (w) {
                    case "2":
                        break;
                    case "1":
                        dis = "WiFi : On", wc = 1;
                        break;
                    case "0":
                        dis = "WiFi : Off", wc = 0
                }
                switch (b) {
                    case "2":
                        break;
                    case "1":
                        if (w != 2) dis += "<br>";
                        dis += "Bluetooth : On", bc = 1;
                        break;
                    case "0":
                        if (w != 2) dis += "<br>";
                        dis += "Bluetooth : Off", bc = 0
                }
                switch (g) {
                    case "2":
                        break;
                    case "1":
                        if (g != 2) dis += "<br>";
                        dis += "Geolocation : On", gc = 1;
                        break;
                    case "0":
                        if (g != 2) dis += "<br>";
                        dis += "Geolocation : Off", gc = 0
                }
                switch (a) {
                    case "2":
                        break;
                    case "1":
                        if (a != 2) dis += "<br>";
                        dis += "Mobile Network : On", ac = 1;
                        break;
                    case "0":
                        if (a != 2) dis += "<br>";
                        dis += "Mobile Network : Off", ac = 0
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "IfSettings",
                        "class": "contentIfForm",
                        "data-wifi": w,
                        "data-bluetooth": b,
                        "data-gps": g,
                        "data-wap": a,
                        // "onclick": 'sceneDeleteOrEdit("IfSettings", IfSettingsFunc);'
                        click: function() {
                            sceneDeleteOrEdit("IfSettings", IfSettingsFunc);
                        }
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentIF");
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").html(dis);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-wifi", w);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-bluetooth", b);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-gps", g);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-wap", a);
                    $("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").html(dis);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="settings_panel_content"></div>')
    var $dialogPanelContent = $(".settings_panel_content");
    var c = ["WiFi", "Bluetooth", "Geolocation", "Mobile Network"];
    var id = ["swifi", "sbluetooth", "sgps", "swap"];
    for (var i = 0; i < 4; i++) {
        var ss = '<label class="narrow-control label-top-left">' + c[i] + '</label>' +
            '<select class="wide-control form-control input-sm" id="' + dialogID + '_' + id[i] + '">' +
            '<option value=2>None</option>' +
            '<option value=1>On</option>' +
            '<option value=0>Off</option>' +
            '</select>';
        $dialogPanelContent.append(ss);
    }
    if (mode == 2) {
        var wh = $("#settings_panel_swifi");
        var bh = $("#settings_panel_sbluetooth");
        var gh = $("#settings_panel_sgps");
        var ah = $("#settings_panel_swap");

        wh.val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-wifi"));
        bh.val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-bluetooth"));
        gh.val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-gps"));
        ah.val($("#addScenesPagesub > div > div > div > div#contentIF > div#IfSettings").attr("data-wap"));
        switch (wh.val()) {
            case "2":wh.filter(":selected").text("None");break;
            case "1":wh.filter(":selected").text("On");break;
            case "0":wh.filter(":selected").text("Off");break;
        }
        switch (bh.val()) {
            case "2":bh.filter(":selected").text("None");break;
            case "1":bh.filter(":selected").text("On");break;
            case "0":bh.filter(":selected").text("Off");break;
        }
        switch (gh.val()) {
            case "2":gh.filter(":selected").text("None");break;
            case "1":gh.filter(":selected").text("On");break;
            case "0":gh.filter(":selected").text("Off");break;
        }
        switch (ah.val()) {
            case "2":ah.filter(":selected").text("None");break;
            case "1":ah.filter(":selected").text("On");break;
            case "0":ah.filter(":selected").text("Off");break;
        }
    }
}*/

function removeLastDia() {
    //remove previous two dialog #add_scene_confirm #sel_condition_confirm
    if ($("#add_scene_confirm").length)
        $("#add_scene_confirm").remove();
    if ($("#sel_condition_confirm").length)
        $("#sel_condition_confirm").remove();
}
//==========================================================================
//==========================================================================
//                                  then
//==========================================================================
//==========================================================================

/**
 * [ThenSoundFunc activities sound]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenSoundFunc(mode) {
    //remove previous two dialog #add_scene_confirm #sel_condition_confirm
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Adjust volume of main sound and alarm...";
        btn = "Add";
        headT = 'Volume of main sound and alarm<br><span style="color: orange">(The number only betweend 0 and 15)</span>';
    } else if (mode == 2) {
        titleT = "Adjust volume of Main sound and alarm...";
        btn = "Edit";
        headT = 'Volume of main sound and alarm<br><span style="color: orange">(The number only betweend 0 and 15)</span>';
    }
    //append div for produce dialog
    var dialogID = "act_sound_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var ms = $("#" + dialogID + "_mainsound").val();
                var a = $("#" + dialogID + "_alarm").val();

                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(1)");
                if (ms == "" && a == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No value input, or not number</span>');
                    $("#" + dialogID + "_mainsound").val("");
                    $("#" + dialogID + "_alarm").val("");
                    return;
                } else if (ms < 0 || ms > 15) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Main volumn must be between 0 to 15</span>');
                    $("#" + dialogID + "_mainsound").val("");
                    $("#" + dialogID + "_mainsound").focus();
                    return;
                } else if (a < 0 || a > 15) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Alarm volumn must be between 0 to 15</span>');
                    $("#" + dialogID + "_alarm").val("");
                    $("#" + dialogID + "_alarm").focus();
                    return;
                }
                //display data for level
                var dsound = "";
                if (ms != "") {
                    if (ms < 10)
                        dsound += "Main volume:  " + ms;
                    else
                        dsound += "Main volume: " + ms;
                    if (a != "")
                        dsound += "<br>";
                }
                if (a != "") {
                    if (a < 10)
                        dsound += "Alarm volume:  " + a;
                    else
                        dsound += "Alarm volume: " + a;
                }
                //append to add scene
                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenSound",
                        "class": "contentThenForm",
                        "data-mainV": ms,
                        "data-alarmV": a,
                        // "onclick": 'sceneDeleteOrEdit("ThenSound", ThenSoundFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenSound", ThenSoundFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").html(dsound);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").html(dsound);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").attr("data-mainV", ms);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").attr("data-alarmV", a);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="act_sound_content"></div>');
    var msLevel ='<label class="narrow-control label-top-left">Main sound</label>' +
        '<input class="wide-control form-control input-sm" type="number" placeholder="0\~15" id="' + dialogID + '_mainsound">';
    var aLevel = '<label class="narrow-control label-top-left">Alarm</label>' +
        '<input class="wide-control form-control input-sm" type="number" placeholder="0\~15" id="' + dialogID + '_alarm">';
    $(".act_sound_content").append(msLevel);
    $(".act_sound_content").append(aLevel);
    if (mode == 2) {
        $("#" + dialogID + "_mainsound").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").attr("data-mainV"));
        $("#" + dialogID + "_alarm").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSound").attr("data-alarmV"));
    }
}

/**
 * [ThenVibrateFunc activities vibration]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenVibrateFunc(mode) {
    //remove previous two dialog #add_scene_confirm #sel_condition_confirm
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Set vibration...";
        btn = "Add";
        headT = "Vibrate for how much time(seconds), or whether to vibrate till you cancel";
    } else if (mode == 2) {
        titleT = "Edit vibration...";
        btn = "Edit";
        headT = "Vibrate for how much time(seconds), or whether to vibrate till you cancel";
    }
    //append div for produce dialog
    var dialogID = "vibartion_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var sec = $("#" + dialogID + "_vibrate_sec").val();
                var till = $("#" + dialogID + "_vibrate_till").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span");

                if (sec == "" && till == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No set anything</span>');
                    return;
                } else if (isNaN(sec)) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Please enter number in seconds</span>');
                    $("#" + dialogID + "_vibrate_sec").val("");
                    return;
                } else if (sec == "0" || sec < 0) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Time must be greater than 0</span>');
                    $("#" + dialogID + "_vibrate_sec").val("");
                    return;
                }
                //display data for level
                var dv = "";
                if (sec != "") {
                    if (sec < 10)
                        dv += "Vibrating Time: 0" + sec + " seconds";
                    else
                        dv += "Vibrating Time: " + sec + " seconds";
                    if (till != 2) dv += "<br>";
                }

                switch (till) {
                    case "2":
                        break;
                    case "1":
                        dv += "Vibrating till cancel : Yes";
                        break;
                    case "0":
                        dv += "Vibrating till cancel : No";
                        break;
                }
                //append to add scene
                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenVibrate",
                        "class": "contentThenForm",
                        "data-vtime": sec,
                        "data-vtillcancel": till,
                        // "onclick": 'sceneDeleteOrEdit("ThenVibrate", ThenVibrateFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenVibrate", ThenVibrateFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").html(dv);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").html(dv);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").attr("data-vtime", sec);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").attr("data-vtillcancel", till);
                }
                $(this).dialog("close");
                $(this).remove();
                }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="act_vibrate_panel_content"></div>');
    var vsecinp = '<label class="narrow-control label-top-left">Vibrate time in second(s)</label>' +
    '<input class="wide-control form-control input-sm" type="text" placeholder="number in seconds" id="' + dialogID + '_vibrate_sec">';
    var vtillc = '<label class="narrow-control label-top-left">Vibrating till you cancel</label>' +
    '<select class="wide-control form-control input-sm" id="' + dialogID + '_vibrate_till">' +
    '<option value=2>None</option>' +
    '<option value=1>Yes</option>' +
    '<option value=0>No</option>' +
    '</select>';
    $(".act_vibrate_panel_content").append(vsecinp);
    $(".act_vibrate_panel_content").append(vtillc);
    if (mode == 2) {
        $("#" + dialogID + "_vibrate_sec").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").attr("data-vtime"));
        $("#" + dialogID + "_vibrate_till").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenVibrate").attr("data-vtillcancel"));
    }
}

/**
 * [ThenScreenLtFunc activities screen brightness]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenScreenLtFunc(mode) {
    //remove previous two dialog #add_scene_confirm #sel_condition_confirm
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Select Info of screen brightness...";
        btn = "Add";
        headT = 'Condition of screen brightness automatic adjustment or brightness of screen';
    } else if (mode == 2) {
        titleT = "Edit Info of screen brightness...";
        btn = "Edit";
        headT = 'Condition of screen brightness automatic adjustment or brightness of screen';
    }
    //append div for produce dialog
    var dialogID = "scrLt_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var v = $("#" + dialogID + "_scrLtV").val();
                var a = $("#" + dialogID + "_autoScrLt").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span");

                if (v == "none" && a == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No value input</span>');
                    return;
                }
                //display data for level
                var d = "";
                switch (v) {
                    case "none":                                        break;
                    case "0.2": d += "Screen brightness : extra weak";  break;
                    case "0.4":d += "Screen brightness : weak";         break;
                    case "0.6":d += "Screen brightness : normal";       break;
                    case "0.8":d += "Screen brightness: strong";        break;
                    case "1":d += "Screen brightness : extra strong";   break;
                }
                switch (a) {
                    case "2":break;
                    case "1":if (v != "none") d += "<br>";d += "Screen brightness automatic adjustment : on";break;
                    case "0":if (v != "none") d += "<br>";d += "Screen brightness automatic adjustment : off";break;
                }
                //append to add scene
                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenSrcLt",
                        "class": "contentThenForm",
                        "data-scrltvalue": v,
                        "data-autoscrlt": a,
                        // "onclick": 'sceneDeleteOrEdit("ThenSrcLt", ThenScreenLtFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenSrcLt", ThenScreenLtFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").html(d);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").html(d);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").attr("data-scrltvalue", v);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").attr("data-autoscrlt", a);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="scrLt_panel_content"></div>');
    var scrLtVC = '<label class="narrow-control label-top-left">Screen Brightness</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_scrLtV">' +
        '<option value="none">None</option>' +
        '<option value=0.2>Extra Weak</option>' +
        '<option value=0.4>Weak</option>' +
        '<option value=0.6>Normal</option>' +
        '<option value=0.8>Strong</option>' +
        '<option value=1>Extra Strong</option>' +
        '</select>';

    var aScrLtC = '<label class="narrow-control label-top-left">Screen brightness automatic adjustment</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_autoScrLt">' +
        '<option value=2>None</option>' +
        '<option value=1>On</option>' +
        '<option value=0>Off</option>' +
        '</select>';
    $(".scrLt_panel_content").append(scrLtVC);
    $(".scrLt_panel_content").append(aScrLtC);
    if (mode == 2) {
        var mv = $("#" + dialogID + "_scrLtV").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").attr("data-scrltvalue"));
        $("#" + dialogID + "_autoScrLt").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSrcLt").attr("data-autoscrlt"));
    }
}

/**
 * [ThenSettingsFunc activities setting for WiFi, bluetooth, geolocation, mobile network, power saving]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenSettingsFunc(mode) {
    //remove previous two dialog #add_scene_confirm #sel_condition_confirm
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Select condition of each switch...";
        btn = "Add";
        headT = "What you want to turn on or turn off";
    } else if (mode == 2) {
        titleT = "Edit condition of each switch...";
        btn = "Edit";
        headT = "What you want to turn on or turn off";
    }
    //append div for produce dialog
    var dialogID = "act_settings_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var awifi = $("#" + dialogID + "_wifi").val();
                var abluetooth = $("#" + dialogID + "_bluetooth").val();
                var agps = $("#" + dialogID + "_gps").val();
                var awap = $("#" + dialogID + "_wap").val();
                var apsg = $("#" + dialogID + "_powersave").val();
                var avib = $("#" + dialogID + "_vibration").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span");
                if (awifi == 2 && abluetooth == 2 && agps == 2 && awap == 2 && apsg == 2 && avib == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No set anything</span>');
                    return;
                }
                //display data for level
                var dswitch = "";
                switch (awifi) {
                    case "2":
                        break;
                    case "1":
                        dswitch += "WiFi : on";
                        break;
                    case "0":
                        dswitch += "WiFi : off";
                        break;
                }
                switch (abluetooth) {
                    case "2":
                        break;
                    case "1":
                        if (awifi != 2) dswitch += "<br>";
                        dswitch += "Bluetooth : on";
                        break;
                    case "0":
                        if (awifi != 2) dswitch += "<br>";
                        dswitch += "Bluetooth : off";
                        break;
                }
                switch (agps) {
                    case "2":
                        break;
                    case "1":
                        if (abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Geolocation : on";
                        break;
                    case "0":
                        if (abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Geolocation : off";
                        break;
                }
                switch (awap) {
                    case "2":
                        break;
                    case "1":
                        if (agps != 2 || abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Mobile Network : on";
                        break;
                    case "0":
                        if (agps != 2 || abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Mobile Network : off";
                        break;
                }
                switch (apsg) {
                    case "2":
                        break;
                    case "1":
                        if (awap != 2 || agps != 2 || abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Power Saving : on";
                        break;
                    case "0":
                        if (awap != 2 || agps != 2 || abluetooth != 2 || awifi != 2) dswitch += "<br>";
                        dswitch += "Power Saving : off";
                        break;
                }
                switch (avib) {
                    case "2":
                        break;
                    case "1":
                        if (awap != 2 || agps != 2 || abluetooth != 2 || awifi != 2 || apsg != 2) dswitch += "<br>";
                        dswitch += "Vibration : on";
                        break;
                    case "0":
                        if (awap != 2 || agps != 2 || abluetooth != 2 || awifi != 2 || apsg != 2) dswitch += "<br>";
                        dswitch += "Vibration : off";
                        break;
                }

                //append to add scene
                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenSettings",
                        "class": "contentThenForm",
                        "data-twifi": awifi,
                        "data-tbluetooth": abluetooth,
                        "data-tgps": agps,
                        "data-twap": awap,
                        "data-tpsg": apsg,
                        "data-tvibrate": avib
                        // "onclick": 'sceneDeleteOrEdit("ThenSettings", ThenSettingsFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenSettings", ThenSettingsFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").html(dswitch);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").html(dswitch);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-twifi", awifi);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tbluetooth", abluetooth);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tgps", agps);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-twap", awap);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tpsg", apsg);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append('<div id="acts_settings_panel"></div>');
    $("#acts_settings_panel").append(tText);
    $("#acts_settings_panel").append('<div class="act_settings_content"></div>');
    var thenWifi = '<label class="narrow-control label-top-left">WiFi</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_wifi">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    var thenBl = '<label class="narrow-control label-top-left">Bluetooth</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_bluetooth">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    var thenGps = '<label class="narrow-control label-top-left">Geolocation</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_gps">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    var thenWap = '<label class="narrow-control label-top-left">Mobile network</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_wap">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    var thenPs = '<label class="narrow-control label-top-left">Power saving</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_powersave">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    var thenVib = '<label class="narrow-control label-top-left">Vibration</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_vibration">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    $(".act_settings_content").append(thenWifi);
    $(".act_settings_content").append(thenBl);
    $(".act_settings_content").append(thenGps);
    $(".act_settings_content").append(thenWap);
    $(".act_settings_content").append(thenPs);
    $(".act_settings_content").append(thenVib);
    if (mode == 2) {
        $("#" + dialogID + "_wifi").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-twifi"));
        $("#" + dialogID + "_bluetooth").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tbluetooth"));
        $("#" + dialogID + "_gps").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tgps"));
        $("#" + dialogID + "_wap").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-twap"));
        $("#" + dialogID + "_powersave").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tpsg"));
        $("#" + dialogID + "_vibration").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSettings").attr("data-tvibrate"));
    }
}

/**
 * [ThenPhCallFunc activities phone call out]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenPhCallFunc(mode) {
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Call for someone you set...";
        btn = "Add";
        headT = "Enter name and phone number";
    } else if (mode == 2) {
        titleT = "Call for someone you set...";
        btn = "Edit";
        headT = "Edit name and phone number";
    }
    //append div for produce dialog
    var dialogID = "act_phCall_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var Iname = $("#then_phCall_name").val();
                var Iph = $("#then_phCall_phNum").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (Iname == "" && Iph == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter name and phone number,<br>or Cancel</span>');
                    $("#then_phCall_name").val("");
                    $("#then_phCall_phNum").val("");
                    $("#then_phCall_name").focus();
                    return;
                } else if (isNaN(Iph)) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Phone must be number</span>');
                    $("#then_phCall_phNum").val("");
                    $("#then_phCall_phNum").focus();
                    return;
                } else if (Iname == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter name, or Cancel</span>');
                    $("#then_phCall_name").focus();
                    return;
                } else if (Iph == "") {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>Enter phone number, or Cancel</span>');
                    $("#then_phCall_phNum").focus();
                    return;
                }

                var phd = "Name : " + Iname + "<br>Phone number : " + Iph;

                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenPhCall",
                        "class": "contentThenForm",
                        "data-actname": Iname,
                        "data-actphnum": Iph,
                        // "onclick": 'sceneDeleteOrEdit("ThenPhCall", ThenPhCallFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenPhCall", ThenPhCallFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").html(phd);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").html(phd);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").attr("data-actname", Iname);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").attr("data-actphnum", Iph);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });

    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="act_phCall_panel_content"></div>');
    $(".act_phCall_panel_content").append('<label class="narrow-control label-top-left">Name</label>');
    $(".act_phCall_panel_content").append('<input class="wide-control form-control" type="text" placeholder="Text (ex. John)" id="then_phCall_name">');
    $(".act_phCall_panel_content").append('<label class="narrow-control label-top-left">Phone Number</label>');
    $(".act_phCall_panel_content").append('<input class="wide-control form-control" type="text" placeholder="Only Number" id="then_phCall_phNum">');
    $("#then_phCall_name").focus();
    if (mode == 2) {
        $("#then_phCall_name").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").attr("data-actname"));
        $("#then_phCall_phNum").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenPhCall").attr("data-actphnum"));
    }
}

/**
 * [ThenCameraFunc activities camera use]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
/*
function ThenCameraFunc(mode) {
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Camera enable or unable...";
        btn = "Add";
        headT = "Set camera enable or not";
    } else if (mode == 2) {
        titleT = "Camera enable or unable...";
        btn = "Edit";
        headT = "Set camera enable or not";
    }
    //append div for produce dialog
    var dialogID = "act_camera_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var ce = $("#" + dialogID + "_camera_sel").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (ce == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No set anything</span>');
                    return;
                }

                var ced;
                switch(ce) {
                    case "2":                           break;
                    case "1": ced = "Camera: enable";   break;
                    case "0": ced = "Camera: unable";   break;
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenCamera",
                        "class": "contentThenForm",
                        "data-tcamera": ce,
                        // "onclick": 'sceneDeleteOrEdit("ThenCamera", ThenCameraFunc);'
                        click: function() {
                            sceneDeleteOrEdit("ThenCamera", ThenCameraFunc);
                        }
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera").html(ced);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera").html(ced);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera").attr("data-tcamera", ce);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="act_camera_panel_content"></div>');
    var thenCamera = '<label class="narrow-control label-top-left">Camera</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_camera_sel">' +
        '<option value="2">None</option>' +
        '<option value="1">enable</option>' +
        '<option value="0">unable</option>' +
        '</select>';
    $(".act_camera_panel_content").append(thenCamera);
    if (mode == 2) {
        $("#" + dialogID + "_camera_sel").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenCamera").attr("data-tcamera"));
    }
}
*/
/**
 * [ThenSettingsFunc activities sleep mode]
 * @param {[number integer]} mode [selectmode Add: 1, Edit: 2]
 */
function ThenSleepModeFunc(mode) {
    removeThenLastDia();
    //change mode text
    var titleT, btn, headT;
    if (mode == 1) {
        titleT = "Sleep mode turn on/off";
        btn = "Add";
        headT = "Select sleep mode whether to turn on or off";
    } else if (mode == 2) {
        titleT = "Sleep mode turn on/off";
        btn = "Edit";
        headT = "Edit sleep mode whether to turn on or off";
    }
    //append div for produce dialog
    var dialogID = "act_slpm_panel";
    $("<div/>", {
        "id": dialogID,
        "title": titleT,
    }).prependTo("body");
    var dwidth = $(window).width() * 0.8;
    var dheight = $(window).height() * 0.8;
    $("#" + dialogID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: dheight,
        width: dwidth,
        modal: true,
        buttons: [{
            text: btn,
            "class": "ui-button-success",
            click: function() {
                var slp = $("#" + dialogID + "_slpm").val();
                var $tp = $("#" + dialogID + " > p");
                var f = $("#" + dialogID + " > p > span:eq(0)");

                if (slp == 2) {
                    if (f.length) f.remove();
                    $tp.append('<span style="color: red; font-size: 15px; font-weight: bold;"><br>No set anything</span>');
                    return;
                }

                var slpd;
                switch(slp) {
                    case "2":                               break;
                    case "1": slpd = "Sleep mode: on";      break;
                    case "0": slpd = "Sleep mode: off";     break;
                }

                if (mode == 1) {
                    $("<div/>", {
                        "id": "ThenSlpM",
                        "class": "contentThenForm",
                        "data-tsleep": slp,
                        // "onclick": 'sceneDeleteOrEdit("ThenSlpM", ThenSleepModeFunc);'
                        /*click: function() {
                            sceneDeleteOrEdit("ThenSlpM", ThenSleepModeFunc);
                        }*/
                    }).appendTo("#addScenesPagesub > div > div > div > div#contentTHEN");
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM").html(slpd);
                } else if (mode == 2) {
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM").html(slpd);
                    $("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM").attr("data-tsleep", slp);
                }
                $(this).dialog("close");
                $(this).remove();
            }
        }, {
            text: "Cancel",
            "class": "ui-button-default",
            click: function() {
                $(this).dialog("close");
                $(this).remove();
            }
        }]
    });
    //append content for dialog
    var $dialogPanel = $("#" + dialogID);
    var tText = '<p style="padding: 5px 10px 0px; margin: 0px">' + headT + '</p>';
    $dialogPanel.append(tText);
    $dialogPanel.append('<div class="act_slpm_panel_content"></div>');
    var thenSlpm = '<label class="narrow-control label-top-left">Sleep mode</label>' +
        '<select class="wide-control form-control input-sm" id="' + dialogID + '_slpm">' +
        '<option value="2">None</option>' +
        '<option value="1">On</option>' +
        '<option value="0">Off</option>' +
        '</select>';
    $(".act_slpm_panel_content").append(thenSlpm);
    if (mode == 2) {
        $("#" + dialogID + "_slpm").val($("#addScenesPagesub > div > div > div > div#contentTHEN > div#ThenSlpM").attr("data-tsleep"));
    }
}

function removeThenLastDia() {
    //remove previous two dialog #add_scene_confirm #sel_execute_confirm
    if ($("#add_scene_confirm").length)
        $("#add_scene_confirm").remove();
    if ($("#sel_execute_confirm").length)
        $("#sel_execute_confirm").remove();
}

/*
"data-hours", "data-minutes", "data-bcharging", "data-blevel", "data-pname", "data-lat", "data-lng", "data-address", "data-locradius", "data-speed", "data-driving", "data-bodyacts", "data-name", "data-phnum", "data-wifi", "data-bluetooth", "data-gps", "data-wap"
*/

function executeActs(scenario) {
    var $thisThen = scenario.find("#contentTHEN");
    var actNum = scenario.attr("data-actFlag");

    if (scenario.find("#contentTHEN").find("#ThenSound").length) {
        var mainvolumn = scenario.find("#contentTHEN").find("#ThenSound").attr("data-mainv");
        setSound(parseInt(mainvolumn));
        var alarmvolumn = scenario.find("#contentTHEN").find("#ThenSound").attr("data-alarmv");
        set_DeviceAlarmSound(parseInt(alarmvolumn));
    }
    if (scenario.find("#contentTHEN").find("#ThenVibrate").length) {
        var duringTime = scenario.find("#contentTHEN").find("#ThenVibrate").attr("data-vtime");
        var tillEnd = scenario.find("#contentTHEN").find("#ThenVibrate").attr("data-vtillcancel");

        setVibration(true);
        if (tillEnd != 2) {
            if (tillEnd) {
                vibrationExe(duringTime, tillEnd);
                $("<div/>", {
                    "id": "vibratetill",
                    "title": "Vibration confirm",
                }).prependTo("body");

                var dwidth = $(window).width();
                var dheight = $(window).height();
                $("#vibratetill").dialog({
                    autoOpen: true,
                    dialogClass: "no-close",
                    height: dheight,
                    width: dwidth,
                    modal: true,
                    buttons: [{
                        text: "Cancel",
                        "class": "ui-button-default",
                        click: function() {
                            clearInterval(vibrateInterval);
                            $(this).dialog("close");
                            $(this).remove();
                        }
                    }]
                });
            } else {
                vibrationExe(duringTime, tillEnd);
            }
        } else {
            vibrationExe(duringTime, false);
        }
    }
    if (scenario.find("#contentTHEN").find("#ThenSrcLt").length) {
        var scrAuto = scenario.find("#contentTHEN").find("#ThenSrcLt").attr("data-autoscrlt");
        if (scrAuto != 2) {
            SetScreenAutoBrightness(scrAuto);
        } else {
            var scrValue = scenario.find("#contentTHEN").find("#ThenSrcLt").attr("data-scrltvalue");
            set_DeviceScreenBrightness(scrValue);
        }
    }
    if (scenario.find("#contentTHEN").find("#ThenSettings").length) {
        var wific = scenario.find("#contentTHEN").find("#ThenSettings").attr("data-twifi");
        var bluetoothc = scenario.find("#contentTHEN").find("#ThenSettings").attr("data-tbluetooth");
        var geolocationc = scenario.find("#contentTHEN").find("#ThenSettings").attr("data-tgps");
        var mobileNetworkc = scenario.find("#contentTHEN").find("#ThenSettings").attr("data-twap");
        var powersavingc = scenario.find("#contentTHEN").find("#ThenSettings").attr("data-tpsg");
        if (wific != 2) {
            setWifi(parseInt(wific));
        }
        if (bluetoothc != 2) {
            setBluetooth(parseInt(bluetoothc));
        }
        if (geolocationc != 2) {
            setGps(parseInt(geolocationc));
        }
        if (mobileNetworkc != 2) {
            setWap(parseInt(mobileNetworkc));
        }
        if (powersavingc != 2) {
            setPowerSaving(parseInt(powersavingc));
        }
    }
    if (scenario.find("#contentTHEN").find("#ThenPhCall").length) {
        var number = scenario.find("#contentTHEN").find("#ThenPhCall").attr("data-actphnum");
        if (number != "" && number != null && number != undefined)
            dialPhoneCall(number);

    }
    /*if (scenario.find("#contentTHEN").find("#ThenCamera").length) {
        var check = scenario.find("#contentTHEN").find("#ThenCamera").attr("data-tcamera");
        if (check != 2) {
            setCameraLimited(check);
        }
    }*/
    if (scenario.find("#contentTHEN").find("#ThenSlpM").length) {
        var slpcheck = scenario.find("#contentTHEN").find("#ThenSlpM").attr("data-tsleep");
        if (slpcheck != 2) {
            sleepMode(slpcheck);
        }
    }
}
