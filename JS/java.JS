var numProjects = 0; //to 15
var numCode = 0; // to 3746
var heart = true;
$(document).ready(function() {
	interval = setInterval(update, 50);
	$("#map").mouseover(function() {
		$("#dMap").html("A* search, Rastering, Quad Trees, Routing, Data Structures");
		$("#pMap").toggleClass("bot");
	});
	
	$("#map").mouseout(function() {
		$("#dMap").html("");
		$("#pMap").toggleClass("bot");
	});
	
	$("#percolation").mouseover(function() {
		$("#dPercolation").html("Weighted Quick Union, Data Visualization, Analysis");
	});
	
	$("#percolation").mouseout(function() {
		$("#dPercolation").html("");
	});
	
	$("#seam").mouseover(function() {
		$("#dSeam").html("Pixel Energy Calculation, Minimum Cost Path, Seam Removal");
		$("#pSeam").toggleClass("bot");
	});
	
	$("#seam").mouseout(function() {
		$("#dSeam").html("");
		$("#pSeam").toggleClass("bot");
	});
	$("#database").mouseover(function() {
		$("#dDatabase").html("Database Design, Data Structures, Parsing, Query Implementation");
	});
	
	$("#database").mouseout(function() {
		$("#dDatabase").html("");
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