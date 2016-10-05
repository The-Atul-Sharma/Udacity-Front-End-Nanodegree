// Initialize Firebase
var config = {
    apiKey: "AIzaSyASWHPr5WrC15fXp9eATC9lPr13-Jzaxlg",
    authDomain: "neighborhood-map-144303.firebaseapp.com",
    databaseURL: "https://neighborhood-map-144303.firebaseio.com",
    storageBucket: "neighborhood-map-144303.appspot.com",
    messagingSenderId: "34948729715"
};
firebase.initializeApp(config);

var dbRef = firebase.database().ref().child('DonnerList');
var locations = [];
var bloodBanks = [];
var map;
// A blank array for all the listing markers.
var markers = [];
var markers1 = [];
var initMap = function() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {
                lat: 23.374925,
                lng: 79.562032
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
        });
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        window.largeInfowindow = new google.maps.InfoWindow();
        window.largeInfowindow.addListener('closeclick', function() {
            this.marker.setAnimation(null);
        });
        var bounds = new google.maps.LatLngBounds();

        //Load blood banks data
        bloodBank();
        //Load firebase data
        dbRef.once('value').then(function(data) {
            locations = data.val();
            // The following group uses the location array to create an array of markers on initialize.
            for (var i = 0; i < locations.length; i++) {
                // Get the position from the location array.
                var position = locations[i].location;

                // Create a marker per location, and put into markers array.
                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    title: locations[i].group,
                    animation: google.maps.Animation.DROP,
                    id: i
                });

                marker.info = locations[i];
                    // Push the marker to our array of markers.
                markers.push(marker);

                locations[i].marker = marker;

                // Create an onclick event to open an infowindow at each marker.
                marker.addListener('click', function() {
                    populateInfoWindow(this, largeInfowindow);
                    toggleBounce(this);
                });
            }
            var vm = new viewModel();
            ko.applyBindings(vm);
        }, function(err) {
            // error handling for the Firebase promise
            alert("Something went wrong.");
        });
    };

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
function populateInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div> <strong>Name: ' + marker.info.name + '</strong><br> Address: ' + marker.info.address +
            '<br> Blood Group: ' + marker.info.group + '<br> Mobile ' + marker.info.mobile + '</div>');
        infoWindow.open(map, marker);
        map.setZoom(15);
        map.panTo(marker.position);
    }
}

function populateBloodBankInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div> <strong>Name: ' + marker.info.h_name + '</strong><br> Address: ' + marker.info.address + ' ' + marker.info.city +
            '<br> Contact No: ' + marker.info.contact + '<ul id="wikipedia-links"></ul></div>');
        infoWindow.open(map, marker);
        map.setZoom(15);
        map.panTo(marker.position);
    }
}

// Information of blood banks in India using api.

function bloodBank() {
    $.ajax({
        type: "GET",
        url: "https://data.gov.in/api/datastore/resource.json?resource_id=e16c75b6-7ee6-4ade-8e1f-2cd3043ff4c9&api-key=d2e5390f5eace1352bc4aedbe336c26a",
        dataType: "json",
    }).done(function(data) {
        bloodBanks.push(data.records);
        for (var i = 0; i < data.records.length; i++) {
            var name = data.records[i].h_name;
            var address = data.records[i].address;
            var city = data.records[i].city;
            var contact = data.records[i].contact;
            var location = new google.maps.LatLng(data.records[i].latitude, data.records[i].longitude);
            var marker = new google.maps.Marker({
                map: map,
                position: location,
                title: name,
                address: address,
                contact: contact,
                animation: google.maps.Animation.DROP,
            });

            marker.info = bloodBanks[0][i];
            // Push the marker to our array of markers.
            markers1.push(marker);

            // An onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
                populateBloodBankInfoWindow(this, largeInfowindow);
                toggleBounce(this);
            });
        }
    }).fail(function(error) {
        alert("Something Went Wrong.");
    });
}

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setAnimation(null);
        }
        for (i = 0; i < markers1.length; i++) {
            markers1[i].setAnimation(null);
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

var viewModel = function() {
    this.locationsList = ko.observableArray(locations);
    this.bloodBanksList = ko.observableArray(bloodBanks[0]);

    /* Set the width of the side navigation to 250px */
    this.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    };

    /* Set the width of the side navigation to 0 */
    this.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    };

    this.openWindow = function(location) {
        populateInfoWindow(location.marker, largeInfowindow);
        toggleBounce(location.marker);
    };

    this.query = ko.observable('');
    this.filteredDonnerList = ko.computed(function() {
        var filter = this.query().toLowerCase();
        if (!filter) {
            return ko.utils.arrayFilter(this.locationsList(), function(item) {
                item.marker.setVisible(true);
                return true;
            });
        } else {
            return ko.utils.arrayFilter(this.locationsList(), function(item) {
                var match = item.address.toLowerCase().indexOf(filter) >= 0;
                item.marker.setVisible(match); // maps API hide call
                return match;
            });
        }
    }, this);

    filterMarkers = function(category) {
        for (i = 0; i < markers.length; i++) {
            marker = markers[i];
            // If is same category or category not picked
            if (marker.title == category || category.length === 0) {
                marker.setVisible(true);
            }
            // Categories don't match
            else {
                marker.setVisible(false);
            }
        }
    }
};
