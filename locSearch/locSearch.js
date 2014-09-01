var map = null;
var markers = [],
    infowindows = [];
var mapListener = null,
    searchBoxListener = null,
    markersListener = [];

function locSelSearchInit() {
    var defaultLatLng = getLoc();

    //地圖選項
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(defaultLatLng[0], defaultLatLng[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true
    };

    //顯示地圖
    var t = $("#loc_sel_map_canvas")[0];
    map = new google.maps.Map(t, mapOptions);

    //搜尋地點input
    var input = $("#loc_sel_inp_search")[0];
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    //搜尋地點
    var searchBox = new google.maps.places.SearchBox(input);

    searchBoxListener = google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        //清除地圖上上一次搜尋的marker 和 infowindow
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
        for (var i = 0, infowindow; infowindow = infowindows[i]; i++) {
            infowindow.setContent("");
        }

        // For each place, get the icon, place name, and location.
        markers = [], infowindows = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            // Create a infowindow for each place.
            var infowindow = new google.maps.InfoWindow();
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location,
                'address': place.formatted_address
            });

            markersListener.push(google.maps.event.addListener(marker, 'click', function() {
                $("<div/>", {
                    "id": "infowindowID",
                    "title": "Confirm",
                    "style": "padding: 10px 10px",
                    "data-templat": this.position.lat(),
                    "data-templng": this.position.lng(),
                    "data-tempaddress": this.address,
                    "data-tempplacename": this.title,
                    text: "Press submit to add this location..."
                }).prependTo("body");

                $("#infowindowID").dialog({
                    autoOpen: true,
                    dialogClass: "no-close",
                    position: "center",
                    height: "auto",
                    width: "auto",
                    modal: true,
                    buttons: [{
                        text: "Submit",
                        "class": "ui-button-primary",
                        click: function() {
                            if ($("#submit_place").length) {
                                $("#submit_place").remove();
                            }
                            var tarPlaceC = '<span>Place:<br></span>' +
                                '<span style="font-weight: normal;">' + $(this).attr("data-tempplacename") + '</span><br>' +
                                '<span>Address:<br></span>' +
                                '<span style="font-weight: normal;">' + $(this).attr("data-tempaddress") + '</span>';
                            /* +
                                '<br>Latitude: ' + marker.position.lat() +
                                '<br>Longitude: ' + marker.position.lng()*/
                            $("#loc_panel").dialog("open");
                            $("<div/>", {
                                "id": "submit_place",
                                "style": 'padding-top: 10px; font-size: 14px; font-weight: bold;',
                                "data-lat": $(this).attr("data-templat"),
                                "data-lng": $(this).attr("data-templng"),
                                "data-address": $(this).attr("data-tempaddress"),
                                "data-placename": $(this).attr("data-tempplacename"),
                            }).appendTo(".loc_panel_content");
                            $("#submit_place").append(tarPlaceC);

                            $(this).dialog("close");
                            locSelRemove();
                            activate_page("#addScenesPage");
                            $(this).remove();
                        }
                    }, {
                        text: "Back",
                        "class": "ui-button-danger",
                        click: function() {
                            $(this).dialog("close");
                            locSelRemove();
                            activate_page("#addScenesPage");
                            $("#loc_panel").dialog("open");
                            $(this).remove();
                        }
                    }, {
                        text: "Close",
                        "class": "ui-button-default",
                        click: function() {
                            $(this).dialog("close");
                            $(this).remove();
                        }
                    }]
                });
                var ct = '<span>Press submit to add this location...</span><br>'
                var dw = '<span>Place:<br></span>' +
                    '<span style="font-weight: normal;">' + this.title + '</span><br>' +
                    '<span>Address:<br></span>' +
                    '<span style="font-weight: normal">' + this.address + '</span>';
                /*
                 + "<br>latitude: " + this.position.lat() + "<br>longitude: " + this.position.lng() + '</span>';
*/
                $("#infowindowID").append(ct);
                $("#infowindowID").append(dw);
                // where I have added .html to the marker object.
                //infowindow.setContent(dw);
                infowindow.open(map, this);
            }));

            markers.push(marker);
            infowindows.push(infowindow);
            bounds.extend(place.geometry.location);
        }

        if (places.length > 1) {
            map.fitBounds(bounds);
        } else {
            var loc = bounds.getCenter();
            map.setCenter(loc);
            map.setZoom(18);
        }
    });

    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    mapListener = google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}

/*
var mapListener = null,
    searchBoxListener = null,
    markersListener = [];
 */
function locSelRemove() {
    google.maps.event.removeListener(searchBoxListener);
    google.maps.event.removeListener(mapListener);
    var mkl = markersListener.length;
    for (var i = 0; i < mkl; i++)
        google.maps.event.removeListener(markersListener[i]);
    if ($(".pac-container").length)
        $(".pac-container").remove();
    if ($("#loc_sel_map_canvas").length)
        $("#loc_sel_map_canvas").remove();
    if ($("#jsts").length)
        $("#jsts").remove();
    map = null;
}

function getLoc() {
    var lat = localStorage.getItem("CURRENT_LATITUDE");
    var lng = localStorage.getItem("CURRENT_LONGITUDE");
    if ((lat == null || lat == undefined) && (lng == null || lng == undefined)) {
        return [25.0854062, 121.5615012]; //default location Taipei
    } else {
        return [lat, lng];
    }
}
