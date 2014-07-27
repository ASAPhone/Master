/*
    搜尋連絡人，但由於搜尋和抓取連絡人要簽名擋，先直接存入黑名單
 */
var allBlackList = "";

function findContact() {
    localStorage.setItem("BlackList", document.getElementById("targetContacts").value);

    if (localStorage.getItem("BlackList") != "") {
        allBlackList += localStorage.getItem("BlackList") + "<br>";
        document.getElementById("addInBlackList").innerHTML = allBlackList;
    } else {
        alert("Please enter a phone number");
    }

    /*  var options = {
        filterValue : document.getElementById("targetContacts").value,
        filterBy    : ["givenName","name","nickName"],
        filterOp    : "contains",
        filterLimit : 1,
        sortBy      : "familyName"
        sortOrder   : "ascending"
    }

    var search = navigator.mozContacts.find(options);

    search.onsuccess = function() {
        if (search.result.length === 1) {
                var person = search.result[0];
                console.log("Found:" + person.givenName[0] + " " + person.familyName[0]);
        }
        else {
                console.log("Sorry, there is no such contact.")
        }
    }

    search.onerror = function() {
        console.warn("Uh! Something goes wrong, no result found!");
    }

    var allContacts = navigator.mozContacts.getAll({sortBy: "familyName", sortOrder: "descending"});

    allContacts.onsuccess = function(event) {
        var cursor = event.target;
        if (cursor.result) {
                //console.log("Found: " + cursor.result.givenName[0] + " " + cursor.result.familyName[0]);
                document.getElementById("blackListRelativeToSearch")).innerHTML = "Found: " 
                    + cursor.result.givenName[0] + " " + cursor.result.familyName[0];
            cursor.continue();
        }
        else {
            console.log("No more contacts");
        }
    }

    allContacts.onerror = function() {
        console.warn("Something went terribly wrong! :(");
    }
 */
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
