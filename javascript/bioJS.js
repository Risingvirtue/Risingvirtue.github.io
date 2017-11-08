var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

resizeCanvas();

ctx.fillRect(0,0, canvas.width, canvas.height);
//resize stack overflow
function resizeCanvas(){
    if (canvas.width  != window.innerWidth) {
        canvas.width  = window.innerWidth;
    }
    if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
    }
	let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
	gradient.addColorStop(0, '#6E352C');
	gradient.addColorStop(1, '#F59A44');
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
}
window.addEventListener("resize", resizeCanvas);
