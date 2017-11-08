var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

resizeCanvas();

function drawBackground() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
	gradient.addColorStop(0, '#6E352C');
	gradient.addColorStop(1, '#F59A44');
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0, canvas.width, canvas.height);
}
function update() {
	requestAnimationFrame(update);
	drawBackground();
	ctx.font = "50px Georgia";
	ctx. fillStyle = "#755330";
	ctx.fillText("Bio", canvas.width / 2 - 50, canvas.height / 10);
	ctx.clearRect(canvas.width / 4, canvas.height / 8, canvas.width / 2, 7 * canvas.height / 8);
}

//resize stack overflow
function resizeCanvas(){
    if (canvas.width  != window.innerWidth) {
        canvas.width  = window.innerWidth;
    }
    if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
    }
	update();
	
}
window.addEventListener("resize", resizeCanvas);
