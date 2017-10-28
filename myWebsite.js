$(document).ready(function() {
	resetMap();
	resetSeason();
	resetData();
	resetNet();
	$(window).scroll(function () {
    //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 100) {
      $('#navBar').addClass('navFixed');
    }
    if ($(window).scrollTop() <= 100) {
      $('#navBar').removeClass('navFixed');
		}
		});
	});



mapCanvas = document.getElementById("bearMaps");

ctx = mapCanvas.getContext("2d");
var mapImage = new Image();
mapImage.src = "map.png";

function resetMap() {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 25, 50, 50, 50);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#000000";
	ctx.fillText("Bear Maps", 100, 75);
}

mapCanvas.onmouseover = function onMouseover(e) {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 12.5, 37.5, 75, 75);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#F19CBB";
	ctx.fillText("Bear Maps", 100, 75);
}
mapCanvas.addEventListener("mouseout",function() {
	resetMap();
});




seasonCanvas = document.getElementById("seasons");
Sctx = seasonCanvas.getContext("2d");
var seasonImage = new Image();
seasonImage.src = "leafTransparent.png";

function resetSeason() {
	Sctx.clearRect(0,0, seasonCanvas.width, seasonCanvas.height);
	Sctx.drawImage(seasonImage, 25, 50, 50, 50);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#000000";
	Sctx.fillText("Seasons Background", 100, 75);
}

seasonCanvas.onmouseover = function onMouseover(e) {
	Sctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	Sctx.drawImage(seasonImage, 12.5, 37.5, 75, 75);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#F19CBB";
	Sctx.fillText("Seasons Background", 100, 75);
}
seasonCanvas.addEventListener("mouseout",function() {
	resetSeason();
});


dataCanvas = document.getElementById("DD");
Dctx = dataCanvas.getContext("2d");
var dataImage = new Image();
dataImage.src = "database.png";

function resetData() {
	Dctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Dctx.drawImage(dataImage, 25, 50, 50, 50);
	Dctx.font = "15px Courier";
	Dctx.fillStyle = "#000000";
	Dctx.fillText("Database Development", 100, 75);
}

dataCanvas.onmouseover = function onMouseover(e) {
	Dctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Dctx.drawImage(dataImage, 12.5, 37.5, 75, 75);
	Dctx.font = "15px Courier";
	Dctx.fillStyle = "#F19CBB";
	Dctx.fillText("Database Development", 100, 75);
}
dataCanvas.addEventListener("mouseout",function() {
	resetData();
});


netCanvas = document.getElementById("net");
Nctx = netCanvas.getContext("2d");
var netImage = new Image();
netImage.src = "net1.png";

function resetNet() {
	Nctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Nctx.drawImage(netImage, 25, 50, 50, 50);
	Nctx.font = "30px Courier";
	Nctx.fillStyle = "#000000";
	Nctx.fillText("Bayes' Net", 100, 75);
}

netCanvas.onmouseover = function onMouseover(e) {
	Nctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Nctx.drawImage(netImage, 12.5, 37.5, 75, 75);
	Nctx.font = "30px Courier";
	Nctx.fillStyle = "#F19CBB";
	Nctx.fillText("Bayes' Net", 100, 75);
}
netCanvas.addEventListener("mouseout",function() {
	resetNet();
});









