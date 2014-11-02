function newGame(origin) {
    window.gamestate = {
        "originString": origin,
        "originLatLng": null,
        "places": [],
        "selectedPlace": null,
        "placeChoices": [],
        "selectedPlacePanoData": null,
        "panorama": null,
        
        "nearbyRadius": 50,
        "radius": 1000,
        "numChoices": 4
    };
}

function transitionToStreetView() {
    // Call the API to get to the street view
    getOriginLatLng();
    
    // Show the relevant part of the page
    $("#streetViewPage #buttons").hide();
    showStreetView();
}

function transitionToMapView() {
    // Call the API to get the choices
    var map = getMap();

    // Show the map view
    showMapPage(map);
}

function restart() {
    newGame(window.gamestate.originString);
    transitionToStreetView();
}
