$(document).ready(function() {
	resetMap();
	resetSeason();
	resetData();
	resetNet();
	$(window).scroll(function () {
    //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 200) {
      $('#navBar').addClass('navFixed');
    }
    if ($(window).scrollTop() <= 200) {
      $('#navBar').removeClass('navFixed');
		}
		});
	});



mapCanvas = document.getElementById("backButton");

ctx = mapCanvas.getContext("2d");
var mapImage = new Image();
mapImage.src = "map.png";







