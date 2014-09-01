const DB_NAME = "blackListDB";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "blackList";

var dbBlackList;
var dbBlackListNumberStore = [];

function preGetBlackListNumber() {
    dbBlackListNumberStore = [];
    var transaction = dbBlackList.transaction([DB_STORE_NAME], "readonly");
    var readDataStore = transaction.objectStore(DB_STORE_NAME);
    readDataStore.openCursor().onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            dbBlackListNumberStore.push(cursor.value.phoneNum);
            cursor.continue();
        }
    };
}

//initailize db and open
function openDb() {
    if (!window.indexedDB) {
        alert("Indexed DB is not supported. Where are you trying to run this?");
        return;
    }

    console.log("openDb ...");
    var req = window.indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = function(evt) {
        dbBlackList = evt.target.result;
        preGetBlackListNumber();
        console.log("openDb DONE");
    };

    req.onerror = function(evt) {
        console.error("openDb:", evt.target.errorCode);
        console.log(evt);
        console.log(req);
    };

    req.onupgradeneeded = function(evt) {
        console.log(evt);
        console.log("openDb.onupgradeneeded");

        dbBlackList = evt.target.result;

        console.log(dbBlackList);
        var store = dbBlackList.createObjectStore(
            DB_STORE_NAME, {
                keyPath: "BListID",
                autoIncrement: true
            });
        store.createIndex("name", "name", {
            unique: false
        });
        store.createIndex("phoneNum", "phoneNum", {
            unique: true
        });
        console.log(store);
    };
}

//edit data
//inp_bl_edit_key inp_bl_edit_name inp_bl_edit_phNum
function editPersonData(oData) {
    //get data and check
    var key = parseInt($("#inp_bl_edit_key").val());
    var newName = $("#inp_bl_edit_name").val();
    var newPhNum = $("#inp_bl_edit_phNum").val();
    var f = $("#blackListEditContent > span");
    var $b = $("#blackListEditContent");
    if (newName == "" && newPhNum == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter name and phone number</span>');
        $("#inp_bl_edit_name").focus();
        return false;
    } else if (newName == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter name</span>');
        $("#inp_bl_edit_name").focus();
        return false;
    } else if (newPhNum == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter phone number</span>');
        $("#inp_bl_edit_phNum").focus();
        return false;
    } else if (isNaN(newPhNum)) {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">Phone number must be an integer.<br>Please enter again</span>');
        $("#inp_bl_edit_phNum").val("");
        $("#inp_bl_edit_phNum").focus();
        return false;
    } else if (oData.name == newName && oData.phNum == newPhNum) {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You don\'t change name and phone number</span>');
        return false;
    }

    var updateDataStore = dbBlackList.transaction([DB_STORE_NAME], "readwrite").objectStore(DB_STORE_NAME);
    var requestUpdate = updateDataStore.put({
        name: newName,
        phoneNum: newPhNum,
        BListID: key
    });

    requestUpdate.onsuccess = function(evt) {
        alert("Edit successful.");
        if (f.length) f.remove();
        $("#inp_bl_edit_key").val("");
        $("#inp_bl_edit_name").val("");
        $("#inp_bl_edit_phNum").val("");
        $(".blackListPagesubContent").html("");
        activate_page("#blackListPage");
        var delayTime = Loading();
        setTimeout(function() {
            printBlackList();
        }, delayTime);
    };
    requestUpdate.onerror = function(evt) {
        var errorMsg = evt.target.error.name;
        switch (errorMsg) {
            case "ConstraintError":
                if (f.length) f.remove();
                $b.prepend('<span style="color: red; padding: 10px 0px 10px;">There has been the same phone number</span>');
                $("#inp_bl_edit_phNum").val("");
                $("#inp_bl_edit_phNum").focus();
                break;
            default:
                if (f.length) f.remove();
                $b.prepend('<span style="color: red; padding: 10px 0px 10px;">Something wrong!</span>');
        }
    };
}

//switch a function to do
function deleteOrEdit(selectedKey, divID) {
    var divConfirmID = divID + "_confirm";

    $("<div/>", {
        "id": divConfirmID,
        "title": "What you want to...",
        "style": "padding: 10px 10px",
        text: "You can delete or edit selected data."
    }).prependTo("body");
    /*
    "class":"ui-button-danger"
    "class":"ui-button-warning"
    "class":"ui-button-inverse"
    */
    $("#" + divConfirmID).dialog({
        autoOpen: true,
        dialogClass: "no-close",
        height: "auto",
        modal: true,
        buttons: [{
            text: "Delete",
            "class": "ui-button-danger",
            click: function() {
                //read the DB_STORE_NAME='blackList'
                var transaction = dbBlackList.transaction([DB_STORE_NAME], "readwrite");
                var readDataStore = transaction.objectStore(DB_STORE_NAME);
                var request = readDataStore.delete(selectedKey);

                request.onsuccess = function(evt) {
                    preGetBlackListNumber();
                    $("#" + divConfirmID).dialog("close");
                    $("#" + divConfirmID).remove();
                    $("#" + divID).remove();
                    alert("Deletion successful.");
                };
                request.onerror = function(evt) {
                    alert("Error while deleting data: " + evt.value);
                }
            }
        }, {
            text: "Edit",
            "class": "ui-button-warning",
            click: function() {
                var oldName = $("#" + divID).children(".bl_left_content").text();
                var oldPhNum = $("#" + divID).children(".bl_right_content").text();
                //inp_bl_edit_key inp_bl_edit_name inp_bl_edit_phNum
                $("#inp_bl_edit_key").val(selectedKey);
                $("#inp_bl_edit_name").val(oldName);
                $("#inp_bl_edit_phNum").val(oldPhNum);
                activate_page("#blackListEdit");
                $(this).dialog("close");
                $("#" + divConfirmID).remove();
            }
        }, {
            text: "Cancel",
            click: function() {
                $(this).dialog("close");
                $("#" + divConfirmID).remove();
            }
        }]
    });
}

//delete blackListDB database
function clearAllBlackListDB() {
    var c = $.find(".bl_select");
    if (c != "") {
        var transaction = dbBlackList.transaction([DB_STORE_NAME], "readwrite");
        var readDataStore = transaction.objectStore(DB_STORE_NAME);

        var request = readDataStore.clear();

        request.onsuccess = function(evt) {
            //empty the content of id=blackListPagesub
            $(".blackListPagesubContent").html("");
            alert("All Data has got cleared.");
        }
        request.onerror = function(evt) {
            alert("Error while deleting data: " + evt.value);
        }
    } else {
        alert("Nothing could be clear.");
    }
}

//print the data from the database "blackListDB"
function printBlackList() {
    //empty the content of id=blackListPagesub
    $(".blackListPagesubContent").html("");

    //read the DB_STORE_NAME='blackList'
    var transaction = dbBlackList.transaction([DB_STORE_NAME], "readonly");
    var readDataStore = transaction.objectStore(DB_STORE_NAME);

    //open a cursor to retrieve all items from the 'blackList' store
    readDataStore.openCursor().onsuccess = function(evt) {
        var cursor = evt.target.result;

        if (cursor) {
            var personData = cursor.value; //name, phoneNum, BListID
            var divOutID = "BListID_" + cursor.key; //use in dynamic create div(outside) tag attribute "id"
            var divInLeftID = "BListID_" + cursor.key + "_name"; //use in dynamic create div(inside left) tag attribute "id"
            var divInRightID = "BListID_" + cursor.key + "_phNum"; //use in dynamic create div(inside right) tag attribute "id"
            var divLeftContent = '<div id=' + divInLeftID + ' class="bl_left_content">' + personData.name + '</div>';
            var divRightContent = '<div id=' + divInRightID + ' class="bl_right_content">' + personData.phoneNum + '</div>';
            var divOutContent = divLeftContent + '<!-- avoid spaces -->' + divRightContent;

            //create div to blackListPagesub=============================================start
            $("<div/>", {
                "id": divOutID,
                "data-key": cursor.key,
                "class": "bl_row bl_select",
            })
                .append(divOutContent)
                .appendTo(".blackListPagesubContent");
            //create end================================================================end
            cursor.continue();
        }
        preGetBlackListNumber();
    };
}

//add data to db
function addDataToBL() {
    //get info from the input id=inp_bl_name, inp_bl_number
    var InpName = $("#inp_bl_add_name").val();
    var InpPhoneNum = $("#inp_bl_add_phNum").val();
    var f = $("#blackListAddContent > span");
    var $b = $("#blackListAddContent");
    if (InpName == "" && InpPhoneNum == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter name and phone number</span>');
        $("#inp_bl_add_name").focus();
        return;
    } else if (InpName == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter name</span>');
        $("#inp_bl_add_name").focus();
        return;
    } else if (InpPhoneNum == "") {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">You must enter phone number</span>');
        $("#inp_bl_add_phNum").focus();
        return;
    } else if (isNaN(InpPhoneNum)) {
        if (f.length) f.remove();
        $b.prepend('<span style="color: red; padding: 10px 0px 10px;">Phone number must be an integer.<br>Please enter again</span>');
        $("#inp_bl_add_phNum").val("");
        $("#inp_bl_add_phNum").focus();
        return;
    }

    //open an transaction
    var transaction = dbBlackList.transaction([DB_STORE_NAME], "readwrite");

    //create an object to store data name and number
    var dataValue = {};
    dataValue.name = InpName;
    dataValue.phoneNum = InpPhoneNum;

    //start store object to DB
    var dataStore = transaction.objectStore(DB_STORE_NAME);
    var request = dataStore.add(dataValue);

    request.onsuccess = function(evt) {
        alert("Add successful.");
        if (f.length) f.remove();
        $("#inp_bl_add_name").val("");
        $("#inp_bl_add_phNum").val("");
        activate_page("#blackListPage");
        $(".blackListPagesubContent").html("");
        var delayTime = Loading();
        setTimeout(function() {
            printBlackList();
        }, delayTime);
    }

    request.onerror = function(evt) {
        var errorMsg = evt.target.error.name;
        switch (errorMsg) {
            case "ConstraintError":
                if (f.length) f.remove();
                $b.prepend('<span style="color: red; padding: 10px 0px 10px;">There has been the same phone number</span>');
                $("#inp_bl_add_phNum").val("");
                $("#inp_bl_add_phNum").focus();
                break;
            default:
                if (f.length) f.remove();
                $b.prepend('<span style="color: red; padding: 10px 0px 10px;">Something wrong!</span>');
        }
    }
}
