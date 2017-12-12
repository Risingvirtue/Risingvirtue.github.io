var numProjects = 0; //to 15
var numCode = 0; // to 3746
$(document).ready(function() {
	
	interval = setInterval(update, 50);
	
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