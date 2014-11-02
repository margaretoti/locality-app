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

function showMapPage() {
    hideAllPages();
    $("#mapPage").show();
}

function startButtonClicked() {
    window.gamestate.originString = $('#addressInput').val();
    transitionIntroToStreetView();
}