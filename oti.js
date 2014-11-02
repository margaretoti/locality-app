function newGame() {
    window.gamestate = {
        "originString": "",
        "originLatLng": null,
        "places": [],
        "selectedPlace": null,
        "placeChoices": [],
        "selectedPlacePanoData": null,
        "panorama": null,
        
        "nearbyRadius": 50,
        "radius": 1000,
        "numChoices": 5
    };
}

function transitionIntroToStreetView() {
    // Call the API to get to the street view
    getOriginLatLng();
    
    // Show the relevant part of the page
    $("#streetViewPage #buttons").hide();
    showStreetView();
}

function transitionStreetViewToMapView() {
    // Call the API to get the choices
    var map = getMap();

    // Show the map view
    showMapPage(map);
}

function startTestGame() {
    newGame("102 Halsey Street, Providence, RI");
}