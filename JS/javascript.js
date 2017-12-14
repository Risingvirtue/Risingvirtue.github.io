var numProjects = 0; //to 8
var numCode = 0; // to 3354
$(document).ready(function() {
	interval = setInterval(update, 50);
	$("#season").mouseover(function() {
		$("#dSeason").html("Canvas, Animation, Rotation, Object Oriented Programming");
		$("#pSeason").toggleClass("bot");
	});
	
	$("#season").mouseout(function() {
		$("#dSeason").html("");
		$("#pSeason").toggleClass("bot");
	});
	
	$("#shooter").mouseover(function() {
		$("#dShooter").html("Canvas, Collision, User Input, Score Keeping");
		$("#pShooter").toggleClass("bot");
	});
	
	$("#shooter").mouseout(function() {
		$("#dShooter").html("");
		$("#pShooter").toggleClass("bot");
	});
	
	$("#simon").mouseover(function() {
		$("#dSimon").html("User Input, Button Sequencing, HTML formatting, Bootstrap");
		$("#pSimon").toggleClass("bot");
	});
	
	$("#simon").mouseout(function() {
		$("#dSimon").html("");
		$("#pSimon").toggleClass("bot");
	});
	$("#puzzle").mouseover(function() {
		$("#dPuzzle").html("Mouse Position, Canvas Manipulation, Quick Union");
		$("#pPuzzle").toggleClass("bot");
	});
	
	$("#puzzle").mouseout(function() {
		$("#dPuzzle").html("");
		$("#pPuzzle").toggleClass("bot");
	});
});
function update() {
	numProjects += 1;
	numCode += 418;
	$("#projects").html(numProjects);
	$("#code").html(numCode);
	
	if (numProjects == 8) {
		numCode = 3354;
		$("#code").html(numCode);
		clearInterval(interval);
	}
}