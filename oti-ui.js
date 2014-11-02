pages = [ "introPage", "streetViewPage", "mapPage" ];

function hideAllPages() {
    $(".page").hide();
}

function showIntro() {
    hideAllPages();
    $("#introPage").show();
}

function showStreetView() {
    hideAllPages();
    $("#streetViewPage").show();
}

function showMapPage(map) {
	// empty the old map and insert the new one
	$("#map").empty();
	$("#map").append(map);

	// show the map page
    hideAllPages();
    $("#mapPage").show();
}

function startButtonClicked() {
    window.gamestate.originString = $('#addressInput').val();
    transitionIntroToStreetView();
}

function readyButtonClicked() {
	transitionStreetViewToMapView();
}