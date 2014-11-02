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
	newGame($('#addressInput').val());
    transitionToStreetView();
}

function readyButtonClicked() {
	transitionToMapView();
}

function answerButtonClicked(button) {
	var selectedIndex = button.target.value;
	var answer = window.gamestate.selectedPlace;
	var placeChoices = window.gamestate.placeChoices;
	if (placeChoices[selectedIndex] == answer) {
		alert("Correct!");
	}
	else {
		alert("Wrong!");
	}
	restart();
}
