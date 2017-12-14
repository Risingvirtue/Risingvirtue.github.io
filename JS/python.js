var numProjects = 0; //to 15
var numCode = 0; // to 3746
var heart = true;
$(document).ready(function() {
	interval = setInterval(update, 50);
	$("#reinforcement").mouseover(function() {
		$("#dReinforcement").html("Q Learning, Value Iteraton, Approximate Q Learning");
		$("#pReinforcement").toggleClass("bot");
	});
	
	$("#reinforcement").mouseout(function() {
		$("#dReinforcement").html("");
		$("#pReinforcement").toggleClass("bot");
	});
	
	$("#ants").mouseover(function() {
		$("#dAnts").html("Object Oriented Programming, Inheritance");
		$("#pAnts").toggleClass("bot");
	});
	
	$("#ants").mouseout(function() {
		$("#dAnts").html("");
		$("#pAnts").toggleClass("bot");
	});
	
	$("#classification").mouseover(function() {
		$("#dClassification").html("Perceptrons, Feature Creation, Training, Machine Learning");
		$("#pClassification").toggleClass("bot");
	});
	
	$("#classification").mouseout(function() {
		$("#dClassification").html("");
		$("#pClassification").toggleClass("bot");
	});
	
	$("#scheme").mouseover(function() {
		$("#dScheme").html("Parsing, Evaluation");
		$("#pScheme").toggleClass("bot");
	});
	
	$("#scheme").mouseout(function() {
		$("#dScheme").html("");
		$("#pScheme").toggleClass("bot");
	});
});
function update() {
	numProjects += 1;
	numCode += 249;
	$("#projects").html(numProjects);
	$("#code").html(numCode);
	
	if (numProjects == 15) {
		numCode = 3746;
		$("#code").html(numCode);
		clearInterval(interval);
	}
}