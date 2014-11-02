streetview = new google.maps.StreetViewService();
geocoder = new google.maps.Geocoder();
places = new google.maps.places.PlacesService(document.createElement("div"));


function getOriginLatLng() {
    var geocodeParams = {
        "address": window.gamestate.originString
    };
    geocoder.geocode(geocodeParams, originLatLngReceivedCallback);
}

function originLatLngReceivedCallback(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        // successfully found the origin
        console.log("originLatLngReceived:", results);
        window.gamestate.originLatLng = results[0].geometry.location;
        findNearbyPlaces();
        
    } else {
        // TODO: deal with the fact that we might not find the user's address
        console.log("No results");
    }
}

function findNearbyPlaces() {
    var request = {
        "location": window.gamestate.originLatLng,
        "radius": window.gamestate.radius,
        "types": window.placelist
    };
    places.radarSearch(request, nearbyPlacesReceivedCallback);
}

function nearbyPlacesReceivedCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // successfully found some places
        console.log("places:", results);
        window.gamestate.places = results;
        
        choosePlacesForGame();
    }

}

// chooses some places for the game.
// the selected place is included in the placeChoices array
// the place choices array is in a random order
function choosePlacesForGame() {
    // Generate the selected place
    window.gamestate.selectedPlace = selectRandomPlace();

    // Create the choices
    window.gamestate.placeChoices = [];
    for (var i = 0; i < window.gamestate.numChoices; i++) {
        window.gamestate.placeChoices.push(selectRandomPlace());
    }

    // Randomly insert the selected place into the choices
    var selectedPlaceInsertionIndex = Math.floor(Math.random() * (window.gamestate.numChoices+1));
    window.gamestate.placeChoices.splice(selectedPlaceInsertionIndex, 0, window.gamestate.selectedPlace);
    
    findNearbyStreetView();
}

function findNearbyStreetView() {
    if (window.gamestate.nearbyRadius < 50000) {
        streetview.getPanoramaByLocation(window.gamestate.selectedPlace, window.gamestate.nearbyRadius, nearbyStreetViewFoundCallback);
    } else {
        // TODO: error! tell user to enter a new location
    }
}

function nearbyStreetViewFoundCallback(panoData) {
    if(panoData && panoData.location && panoData.location.pano){
        // Save the pano location of the nearby street view and display it
        window.gamestate.selectedPlacePanoData = panoData;
        displaySelectedPlace();
    } else {
        // No nearby street view. Increase search radius and try again
        window.gamestate.nearbyRadius *= 2;
        findNearbyStreetView();
    }
}

function displaySelectedPlace() {
    // Find the pano div and clear it
    var pano = document.getElementById("imageContainer");
    pano.innerHTML = "";
    
    // Construct the panorama options
    var panoramaOptions = {
        "position": window.gamestate.selectedPlacePanoData.location.latLng,
        "pov": {
            "heading": window.gamestate.selectedPlacePanoData.tiles.originHeading,
            "pitch": window.gamestate.selectedPlacePanoData.tiles.originPitch
        },
        "panControl": false,
        "zoomControl": false,
        "addressControl": false,
        "linksControl": false,
        "zoom": 0,
        "disableDefaultUI": true,
        "draggable": false,
        "scrollwheel": false,
        "clickToGo": false
    }
    
    // Create the panorama
    window.gamestate.panorama = new google.maps.StreetViewPanorama(pano, panoramaOptions);
    
    $("#streetViewPage #buttons").delay(3000).fadeIn(1000);
}

function selectRandomPlace(places) {
    var places = window.gamestate.places;
    var randomIndex = Math.floor(Math.random() * places.length);
    var selectedPlace = places[randomIndex];
    var placeLocation = selectedPlace.geometry.location;
    return placeLocation;
}

var markerColors = ["yellow", "green", "blue", "red", "orange", "black", "brown", "purple", "white", "gray"];
function getMap() {
    // construct the url for the static map image
    var src = "https://maps.googleapis.com/maps/api/staticmap?center=";
    src += window.gamestate.originLatLng.k;
    src += ","
    src += window.gamestate.originLatLng.B;
    src += "&zoom=14&size="
    src += window.innerWidth;
    src += "x"
    src += window.innerHeight;
    src += "&maptype=roadmap";
    
    // add the markers for each of the choices
    var choices = window.gamestate.placeChoices;
    for (var i = 0; i < choices.length; i++) {
        src += "&markers=color:"+markerColors[i]+"%7Clabel:"+i+"%7C"+choices[i].k+","+choices[i].B;
    }
    
    // return a map element
    var map = document.createElement("img");
    map.src = src;
    return map
}