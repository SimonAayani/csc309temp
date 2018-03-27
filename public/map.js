var user_lat;
var user_lng;

function initMap() {
    user_lat = window.sessionStorage.getItem('user_lat');
    user_lng = window.sessionStorage.getItem('user_lng');
    // Going to create an if statement after we have backend, if user is signed
    // in, we will use the latitude and longtidude information we have in the
    // backend instead of sending this request
    if (user_lat == null) {
        $.getJSON( "https://ipapi.co/json/", function( data ) {
            // Gonna use the location info from backend if user is signed in
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: new google.maps.LatLng(data.latitude, data.longitude)
            });


            infoWindow = new google.maps.InfoWindow;

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            // Change this if wanna change to a different location symbol
            var my_location_symbol = {
                path: 'img/my_location.png',
            }

            new google.maps.Marker({
                position: new google.maps.LatLng(data.latitude, data.longitude),
                icon: {
                  path: my_location_symbol
                },
                map: map
            })

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        });
    } else {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: new google.maps.LatLng(parseFloat(user_lat), parseFloat(user_lng))
        });

        infoWindow = new google.maps.InfoWindow;

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        // Change this if wanna change to a different location symbol
        var my_location_symbol = {
            path: 'img/my_location.png',
        }

        new google.maps.Marker({
            position: new google.maps.LatLng(user_lat, user_lng),
            icon: {
              path: my_location_symbol
            },
            map: map
        })

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }

}

var locations = [
    // {lat: 37.7697, lng: -122.3933},
    // {lat: 43.649005, lng: -79.425501},
    // {lat: 43.667571, lng: -79.411554},
    // {lat: -33.727111, lng: 150.371124},
    // {lat: -33.848588, lng: 151.209834},
    // {lat: 43.664429, lng: -79.417230},
    // {lat: 43.668091, lng: -79.411823},
    // {lat: 43.666816, lng: -79.420960}
]

//Get all users with given breed
function getusersbybreed(sel_breed){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err,client){
				if(err) console.log(err)
				else{console.log("Database created")};
				var db = client.db("test");
				//creates index constraint on the user database such that no duplicate uid can exist
				db.collection(name).createIndex({uid:1},{unique:true});
			  	db.collection(name).insertMany(data, function(err, res){
		  			if (err) console.log(err);
		  			else{
		  				console.log("insert success");

		  				}
			  	});
                db.collection(name).find({breed:sel_breed})
            		.forEach((usr)=>{
                        alert(user);
            			locations.push({lat:usr.location.lat, lng:usr.location.lng})
            		});
			  	//just cleaning up
			  	db.collection(name).deleteMany();
			  	//closes connection
			  	client.close();

    });
    return true;
}

function newMap() {
    user_lat = window.sessionStorage.getItem('user_lat');
    user_lng = window.sessionStorage.getItem('user_lng');
    var breed = $("#dropDownDest").val();
    getusersbybreed(breed);
    if (user_lat == null) {
        $.getJSON( "https://ipapi.co/json/", function( data ) {
            // Gonna use the location info from backend if user is signed in
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: new google.maps.LatLng(data.latitude, data.longitude)
            });


            infoWindow = new google.maps.InfoWindow;

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            // Change this if wanna change to a different location symbol
            var my_location_symbol = {
                path: 'img/my_location.png',
            }

            new google.maps.Marker({
                position: new google.maps.LatLng(data.latitude, data.longitude),
                icon: {
                  path: my_location_symbol
                },
                map: map
            })

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        });
    } else {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: new google.maps.LatLng(parseFloat(user_lat), parseFloat(user_lng))
        });

        infoWindow = new google.maps.InfoWindow;

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });

        // Change this if wanna change to a different location symbol
        var my_location_symbol = {
            path: 'img/my_location.png',
        }

        new google.maps.Marker({
            position: new google.maps.LatLng(user_lat, user_lng),
            icon: {
              path: my_location_symbol
            },
            map: map
        })

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
}
