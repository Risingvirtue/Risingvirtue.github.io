var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var selfie = new Image();
selfie.src = "../img/head.png";
var mousePos = {x:0, y:0};
var bioText = new bio(canvas.width / 2, canvas.height / 8 + 140);
resizeCanvas();
function drawBackground() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
	gradient.addColorStop(0, '#6E352C');
	gradient.addColorStop(1, '#F59A44');
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0, canvas.width, canvas.height);
}

function bio(x, y) {
	this.x = x;
	this.y = y;
	this.type = function () {
		
		ctx.font = "20px Georgia";
		ctx.fillStyle = "black";
		let a = "Johnny On is a recent graduate from UC Berkeley";
		let b = " with degrees in both Applied Mathematics and";
		let c = "He is currently looking for an internship in the field of computer science.";
		let d = "He has most recently been creating personal projects while expanding his knowledge";
		let e = " in languages, frameworks, and APIs.";
		let f = "Come check out his work here!";
		let g = "Johnny is a fan of heartwarming anime and movies. When he's not out bowling for strikes or longboarding down";
		let h = "neighborhoods, you'll find him at the nearest arcade or music store.";
		let i = "You can contact him here!";
		
		ctx.fillText(a + b, this.x, this.y);
		ctx.fillText("Microbiology", this.x, this,y + 20);
		//ctx.fillText(b, this.x, this.y + 20);
		ctx.fillText(c, this.x, this.y + 40);
		ctx.fillText(d + e, this.x, this.y + 80);
		//ctx.fillText(e, this.x, this.y + 100);
		ctx.fillText(f, this.x, this.y + 120);
		ctx.fillStyle = "red";
		ctx.fillText("here!", this.x + 225, this.y + 120);
		ctx.fillRect(this.x + 225, this. y + 120, 40, 2);
		ctx.fillStyle = "black";
		ctx.fillText(g, this.x, this.y + 160);
		ctx.fillText(h, this.x, this.y + 180);
		ctx.fillText(i, this.x, this.y + 220);
		ctx.fillStyle = "red";
		ctx.fillText("here!", this.x + 185, this.y + 220);
		ctx.fillRect(this.x + 185, this.y + 220, 40, 2);
		ctx.fillStyle = "black";
	}
}

function update() {
	//requestAnimationFrame(update);
	drawBackground();
	ctx.font = "50px Georgia";
	ctx.fillStyle = "#755330";
	ctx.fillText("Bio", canvas.width / 2 - 37.5, canvas.height / 10);
	ctx.clearRect(canvas.width / 4, canvas.height / 8, canvas.width / 2, 6 * canvas.height / 8);
	ctx.drawImage(selfie, canvas.width / 2 - 50, canvas.height / 8, 100, 110);
	bioText.type();
	
}

//resize stack overflow
function resizeCanvas(){
    if (canvas.width  != window.innerWidth) {
        canvas.width  = window.innerWidth;
    }
    if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
    }
	bioText.x = canvas.width / 4;
	bioText.y = canvas.height / 8 + 140;
	update();
	
}
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener('click', function(e) {
	console.log(mousePos, bioText.x + 225, bioText + 100);
	mousePos = getMousePos(canvas, e);
	if (mousePos.x > bioText.x + 225 && mousePos.x < bioText.x + 275
		&& mousePos.y > bioText.y + 100 && mousePos.y < bioText.y + 120) {
			window.location.href = "../html/project.html";
		}
	if (mousePos.x > bioText.x + 185 && mousePos.x < bioText.x + 230
		&& mousePos.y > bioText.y + 200 && mousePos.y < bioText.y + 220) {
			window.location.href = "../html/contact.html";
		}
});
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y:evt.clientY - rect.top};
}
