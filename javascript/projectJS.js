$(document).ready(function() {
	resetMap();
	resetSeason();
	resetData();
	resetNet();
	resetShooter();
	resetDodge();
});

function topFunction() {
	document.body.screenTop = 0;
	document.documentElement.scrollTop = 0;
}

mapCanvas = document.getElementById("bearMaps");
ctx = mapCanvas.getContext("2d");
var mapImage = new Image();
mapImage.src = "../img/map.png";

function resetMap() {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 25, 50, 50, 50);
	ctx.font = "25px Georgia";
	ctx.fillStyle = "#000000";
	ctx.fillText("Bear Maps", 125, 75);
}

mapCanvas.onmouseover = function onMouseover(e) {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 12.5, 37.5, 75, 75);
	ctx.font = "25px Georgia";
	ctx.fillStyle = "#F19CBB";
	ctx.fillText("Bear Maps", 125, 75);
}
mapCanvas.addEventListener("mouseout",function() {
	resetMap();
});




seasonCanvas = document.getElementById("seasons");
Sctx = seasonCanvas.getContext("2d");
var seasonImage = new Image();
seasonImage.src = "../img/leaf1.png";

function resetSeason() {
	Sctx.clearRect(0,0, seasonCanvas.width, seasonCanvas.height);
	Sctx.drawImage(seasonImage, 25, 50, 50, 50);
	Sctx.font = "25px Georgia";
	Sctx.fillStyle = "#000000";
	Sctx.fillText("Seasons", 140, 75);
	Sctx.fillText("Background", 120, 100);
}

seasonCanvas.onmouseover = function onMouseover(e) {
	Sctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	Sctx.drawImage(seasonImage, 12.5, 37.5, 75, 75);
	Sctx.font = "25px Georgia";
	Sctx.fillStyle = "#F19CBB";
	Sctx.fillText("Seasons", 140, 75);
	Sctx.fillText("Background", 120, 100);
}
seasonCanvas.addEventListener("mouseout",function() {
	resetSeason();
});


dataCanvas = document.getElementById("DD");
Dctx = dataCanvas.getContext("2d");
var dataImage = new Image();
dataImage.src = "../img/database.png";

function resetData() {
	Dctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Dctx.drawImage(dataImage, 25, 50, 50, 50);
	Dctx.font = "25px Georgia";
	Dctx.fillStyle = "#000000";
	Dctx.fillText("Database", 140, 75);
	Dctx.fillText("Development", 120, 100);
}

dataCanvas.onmouseover = function onMouseover(e) {
	Dctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Dctx.drawImage(dataImage, 12.5, 37.5, 75, 75);
	Dctx.font = "25px Georgia";
	Dctx.fillStyle = "#F19CBB";
	Dctx.fillText("Database", 140, 75);
	Dctx.fillText("Development", 120, 100);
}
dataCanvas.addEventListener("mouseout",function() {
	resetData();
});


netCanvas = document.getElementById("net");
Nctx = netCanvas.getContext("2d");
var netImage = new Image();
netImage.src = "../img/realNet1.png";

function resetNet() {
	Nctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Nctx.drawImage(netImage, 25, 50, 50, 50);
	Nctx.font = "25px Georgia";
	Nctx.fillStyle = "#000000";
	Nctx.fillText("Bayes' Net", 125, 75);
}

netCanvas.onmouseover = function onMouseover(e) {
	Nctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	Nctx.drawImage(netImage, 12.5, 37.5, 75, 75);
	Nctx.font = "25px Georgia";
	Nctx.fillStyle = "#F19CBB";
	Nctx.fillText("Bayes' Net", 125, 75);
}
netCanvas.addEventListener("mouseout",function() {
	resetNet();
});


shooterCanvas = document.getElementById("shooter");
Shctx = shooterCanvas.getContext("2d");
var shooterImage = new Image();
shooterImage.src = "../img/emoji1.png";

function resetShooter() {
	Shctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	shooterImage.src = "../img/emoji1.png";
	Shctx.drawImage(shooterImage, 25, 50, 50, 50);
	Shctx.font = "25px Georgia";
	Shctx.fillStyle = "#000000";
	Shctx.fillText("2D Shooter", 125, 75);
}

shooterCanvas.onmouseover = function onMouseover(e) {
	Shctx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	shooterImage.src = "../img/emoji2.png";
	Shctx.drawImage(shooterImage, 12.5, 37.5, 75, 75);
	Shctx.font = "25px Georgia";
	Shctx.fillStyle = "#F19CBB";
	Shctx.fillText("2D Shooter", 125, 75);
}
shooterCanvas.addEventListener("mouseout",function() {
	resetShooter();
});



dodgeCanvas = document.getElementById("dodge");
dodgeCtx = dodgeCanvas.getContext("2d");
var dodgeImage = new Image();
dodgeImage.src = "../img/emoji1.png";

function resetDodge() {
	dodgeCtx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	dodgeImage.src = "../img/emoji1.png";
	dodgeCtx.drawImage(shooterImage, 25, 50, 50, 50);
	dodgeCtx.font = "25px Georgia";
	dodgeCtx.fillStyle = "#000000";
	dodgeCtx.fillText("Dodge This!", 125, 75);
}

dodgeCanvas.onmouseover = function onMouseover(e) {
	dodgeCtx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
	dodgeImage.src = "../img/emoji2.png";
	dodgeCtx.drawImage(dodgeImage, 12.5, 37.5, 75, 75);
	dodgeCtx.font = "25px Georgia";
	dodgeCtx.fillStyle = "#F19CBB";
	dodgeCtx.fillText("Dodge This!", 125, 75);
}

dodgeCanvas.addEventListener("mouseout",function() {
	resetDodge();
});












