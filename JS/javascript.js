var numProjects = 0; //to 8
var numCode = 0; // to 3354
$(document).ready(function() {
	$("#dSeason").html("Canvas, Animation, Rotation, Object Oriented Programming");
	$("#dShooter").html("Canvas, Collision, User Input, Score Keeping");
	$("#dSimon").html("User Input, Button Sequencing, HTML formatting, Bootstrap");
	$("#dPuzzle").html("Mouse Position, Canvas Manipulation, Quick Union");
	$("#dDraw").html("NodeJS, Socket.io, Server Management, Canvas, Pixel Manipulation");
	$("#dStock").html("AngularJS, Google Chart API, Stock API, Stack, Interval");
	$("#dSeason").css("visibility", "hidden");
	$("#dShooter").css("visibility", "hidden");
	$("#dSimon").css("visibility", "hidden");
	$("#dPuzzle").css("visibility", "hidden");
	$("#dDraw").css("visibility", "hidden");
	$("#dStock").css("visibility", "hidden");
	interval = setInterval(update, 50);
	$("#season").mouseover(function() {
		$("#dSeason").css("visibility", "visible");
	
	});
	
	$("#season").mouseout(function() {
		$("#dSeason").css("visibility", "hidden");
		
	});
	
	$("#shooter").mouseover(function() {
		$("#dShooter").css("visibility", "visible");
	});
	
	$("#shooter").mouseout(function() {
		$("#dShooter").css("visibility", "hidden");
	});
	
	$("#simon").mouseover(function() {
		$("#dSimon").css("visibility", "visible");
	});
	
	$("#simon").mouseout(function() {
		$("#dSimon").css("visibility", "hidden");
	});
	$("#puzzle").mouseover(function() {
		$("#dPuzzle").css("visibility", "visible");
	});
	
	$("#puzzle").mouseout(function() {
		$("#dPuzzle").css("visibility", "hidden");
	});
	
	$("#draw").mouseover(function() {
		$("#dDraw").css("visibility", "visible");
	});
	
	$("#draw").mouseout(function() {
		$("#dDraw").css("visibility", "hidden");
	});
	
	$("#stock").mouseover(function() {
		$("#dStock").css("visibility", "visible");
	});
	
	$("#stock").mouseout(function() {
		$("#dStock").css("visibility", "hidden");
	});
	
});
function update() {
	numProjects += 1;
	numCode += 418 + (4532 / 8);
	$("#projects").html(numProjects);
	$("#code").html(numCode);
	
	if (numProjects == 8) {
		numCode = 3354 + 4532;
		$("#code").html(numCode);
		clearInterval(interval);
	}
}