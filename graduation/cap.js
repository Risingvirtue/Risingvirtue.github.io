const grav = 9.8
var windowHeight = window.innerHeight;
var grassHeight = $("#grass").css("height");
grassHeight = parseFloat(grassHeight.slice(0, grassHeight.length - 2));
var caps = [];
var averageHeight = 0;
var maxCap = null;
var range = {lower: 0, upper: window.innerHeight};
var maxHeight = 0;
var clouds = [];
/*
var cloudUrls = ["http://www.scri8e.com/stars/PNG_Clouds/zc06.png?filename=./zc06.png&w0=800&h0s=289&imgType=3&h1=50&w1=140",
				"http://freepngimages.com/wp-content/uploads/2016/02/clouds-transparent-background-2.png"];
                */
var cloudUrls = ['./cloud1.png', './cloud2.png']
var cloudRatio = 289 / 800;

$(document).ready(function() {
})

function createIcons() {
	caps = [];
	for (var i = 1; i < 11; i++) {
		var info = generateCapInfo(i);
		info.number = i;
		maxHeight = Math.max(maxHeight, getMaxHeight(grav, info.velocity) * 100 + info.height);
		caps.push(new cap(info));
	}
	
	
	clouds = [];
	
	for (var i = 0; i < 10; i++) {
		var info = generateCloudInfo();
		info.id = i;
		info.url = cloudUrls[i % 2];
		clouds.push(new cloud(info));
		
	}
}
function generateCapInfo(i) {
	var info = {};
	info.size = Math.random() * 50 + 100;
	var windowLength = (window.innerWidth - info.size * 2);
	info.x = Math.random() * (windowLength) / 10 + info.size + (i - 1) * windowLength / 10;
	info.height = Math.random() * (windowHeight - grassHeight - info.size * 2) + grassHeight + info.size;
	//info.height = 0;
	info.spin = Math.random() * 3;
	info.angle = Math.random() * 90;
	info.velocity = Math.random() * 10 + 5;
	return info;
	
}


function generateCloudInfo() {
	var info = {};
	info.width = Math.random() * (window.innerWidth /4) + window.innerWidth / 8;
	info.ratio = cloudRatio;
	info.x = Math.random() * (window.innerWidth - info.width) + info.width / 2;
	info.height = Math.random() * (maxHeight) + (windowHeight + info.width);
	info.velocity = Math.random() * 2.5 - 1.25;
	return info;
}
function setAverage() {
	averageHeight = 0;
	for (var i = 0 ; i < caps.length; i++) {
		if (caps[i].height > averageHeight) {
			averageHeight = caps[i].height;
		}
	}
	
	averageHeight += 200;
	
}

function throwCap() {
	$("#congratz").fadeOut("slow");
	$("#throw").css({display: "none"});
	$("#message").css({visibility: 'hidden'})
	$("#container").html("");
	createIcons();
	for (var i = 0; i < caps.length;i++) {
		$("#cap" + caps[i].number).css({visibility: "visible"});
	}
	requestAnimationFrame(spin);
}

function upwards() {
	for (var i = 0; i < caps.length; i++) {
		var cap = caps[i];
		var ratio = calcRatio(cap.height, range);
		cap.incrementTime();
		cap.moveCap(range);
		cap.adjustSize(ratio);
		cap.spinCap();
	}
	
	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		cloud.move();
		cloud.show(range);
	}
	
	$("#grass").css({height: grassHeight - range.lower});
	
		var topPercent = (range.upper - (maxHeight + 100)) / (range.upper - range.lower);
		topPercent *= 100;
		
		$("#sun").css({display: "block" ,"top": topPercent + "%"});

	
}


function spin() {

	setAverage();
	range = getRange(averageHeight, 1000);
	
	upwards();
	
	if (averageHeight > grassHeight) {
		requestAnimationFrame(spin);
	} else {
		$("#congratz").fadeIn("slow");
		$("#throw").css({display: "block"});
		var rect = document.getElementById("congratz").getBoundingClientRect();
		
		$("#message").css({top: rect.bottom + 10, visibility: 'visible'})
		
	}
}

function changeCapSize(size) {
	var center = getCenter();
	$("#cap").css({width: size, height: size});
	var circle = 8 * size / 125;
	var margin = (size - circle) / 2;
	$(".circle-container").css({height: circle, width: circle, top: margin, left: margin});
	$("#circle").css({height: circle, width: circle, 'border-radius': circle / 2});
	var ropeWidth = circle / 4;
	$("#tassle").css({height: (size / 2) * 1.1, width: ropeWidth, top: circle / 2, left: (circle - ropeWidth) / 2});
	$("#rope").css({top: (size / 2) * 1.1, height: circle, width: circle, left: 0, 'border-radius': circle / 2});
	$("#cap").css({top: center.y - (1 + size / 2), left: center.x - (1 + size / 2)})
	
}


function getCenter() {
	var rect = document.getElementById("cap").getBoundingClientRect();
	return {x: rect.x + (rect.width / 2 - 1), y: rect.y + (rect.height / 2 - 1)}
}

function getMaxHeight(grav, velocity) {
	return velocity * velocity / (grav * 2);
}

function calcRatio(height, range) {
	return (range.upper - range.lower) / windowHeight;
}

function getRange(height, distance) {
	
	if (height < windowHeight) {
		
		return {lower: 0, upper: windowHeight};
	}
	var initialCameraAngle = Math.atan2(windowHeight, distance);
	var tilt = getTilt(height, distance);
	var range = {lower: Math.tan(tilt) * distance, upper: Math.tan(initialCameraAngle + tilt) * distance};
	return range;
}

function getTilt(height, distance) {
	var initialCameraAngle = Math.atan2(windowHeight, distance);
	var newAngle = Math.atan2(height, distance);
	var tilt = newAngle - initialCameraAngle;
	return tilt;
}