canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var mousePos = {};
var w = canvas.width / 3;
var h = 40;
var x = canvas.width / 4;
var y = canvas.height / 4;
var projects = [];
projects.push(new line(w - Math.cos(10 * Math.PI / 180) * w / 2,y  - Math.sin(10 * Math.PI / 180) * w / 2,
						"database", 20, 20));
projects.push(new line(w + Math.cos(10 * Math.PI / 180) * w / 2, y  + Math.sin(10 * Math.PI / 180) * w / 2,
						"database", -20, 20));
projects.push(new line(w + Math.cos(50 * Math.PI / 180) * w / 2, y  - Math.sin(50 * Math.PI / 180) * w / 2,
						"database", -20, 20));
projects.push(new line(w - Math.cos(50 * Math.PI / 180) * w / 2, y + Math.sin(50 * Math.PI / 180) * w / 2,
						"database", 20, 20));
resizeCanvas();

function line(x, y, project, dx, dy) {
	this.lineX = x;
	this.lineY = y;
	this.dx = dx;
	this.dy = dy;
	this.p = project;
	this.h = canvas.height / 4;
	this.adjust = 0;
	this.r = new rectangle(this.x - 70 + this.dx, this.y + this.dy + this.h - this.adjust);
	this.originalR = new rectangle(this.x - 70 + this.dx, this.y + this.dy + this.h);
	this.draw = function() {
		ctx.fillRect(this.x + this.dx, this.y + this.dy, 2, this.h - this.adjust);
		this.r = new rectangle(this.x - 70 + this.dx, this.y + this.dy + this.h - this.adjust);
		this.originalR = new rectangle(this.x - 70 + this.dx, this.y + this.dy + this.h);
		//ctx.clearRect(this.r.x, this.r.y, 140, 70);
		ctx.beginPath();
		ctx.rect(this.r.x, this.r.y, 140, 70);
		ctx.stroke();
		ctx.closePath();
	}
}

function rectangle(x,y) {
	this.x = x;
	this.y = y;
	this.l = 140;
	this.h = 70;
}

function collision(mouse, rectangle) {
	if (mouse.x > rectangle.x && mouse.x < rectangle.x + rectangle.l &&
		mouse.y > rectangle.y && mouse.y < rectangle.y + rectangle.h) {
			return true;
		}
	return false;
}

function drawCross() {
	ctx.fillStyle = "#CC9900";
	ctx.save();
	ctx.translate(x + w / 2, y + h /2);
	ctx.rotate(-Math.PI * -10 / 180);
	ctx.fillRect(-w / 2 , -h / 2 , w , h );
	ctx.fillStyle = "#CC9900";
	//circles
	ctx.beginPath();
	ctx.arc(-w/2 + 20, -h/2 + 20, 6, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(-w / 2 + x -20, -h/2 + 20, 6, 0 , 2 * Math.PI, false);
	ctx.stroke();
	//ctx.endPath();
	//outline
	ctx.beginPath();
	ctx.strokeStyle = "#663300";
	ctx.lineWidth = "3";
	ctx.rect(-w / 2, -h / 2, w, h);
	ctx.stroke();
	ctx.strokeStyle = "black";
	ctx.closePath();
	ctx.fillStyle = "#CC9900";
	ctx.restore();
	
	ctx.save();
	ctx.translate(x + w / 2, y + h /2);
	ctx.rotate(-Math.PI * 50 / 180);
	ctx.fillRect(-w / 2, -h / 2, w, h);
	
	//circle
	ctx.beginPath();
	ctx.arc(-w/2 + 20, -h/2 + 20, 6, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(-w / 2 + x - 20, -h/2 + 20, 6, 0 , 2 * Math.PI, false);
	ctx.stroke();
	
	
	//outline
	ctx.beginPath();
	ctx.strokeStyle = "#663300";
	ctx.lineWidth = "3";
	ctx.rect(-w / 2, -h / 2, w, h);
	ctx.stroke();
	ctx.strokeStyle = "black";
	ctx.closePath();
	
	ctx.restore();
	ctx.fillStyle = "black";
}
function updateValues() {
	w = canvas.width / 3;
	h = 40;
	x = canvas.width / 3;
	y = canvas.height / 4;
}

function update() {
	requestAnimationFrame(update);
	ctx.clearRect(0,0, canvas.width, canvas.height);
	updateValues();
	//console.log(mousePos);
	for (p of projects) {
		if (collision(mousePos, p.r) || collision(mousePos, p.originalR)) {
			//console.log('yes');
			p.adjust = Math.min(p.adjust + 1, 40);
		} else {
			p.adjust = Math.max(p.adjust - 1, 0);
		}
	}
	projects[0].x = canvas.width / 2 - Math.cos(10 * Math.PI / 180) * w / 2;
	projects[0].y = canvas.height / 4 - Math.sin(10  * Math.PI / 180) * w / 2;
	projects[0].h = canvas.height / 4;
	projects[0].draw();
	
	projects[1].x = canvas.width / 2 + Math.cos(10 * Math.PI / 180) * w / 2;
	projects[1].y = canvas.height / 4 + Math.sin(10  * Math.PI / 180) * w / 2;
	projects[1].h = canvas.height / 4;
	projects[1].draw();
	projects[2].x = canvas.width / 2 + Math.cos(50 * Math.PI / 180) * w / 2;
	projects[2].y = canvas.height / 4 - Math.sin(50 * Math.PI / 180) * w / 2;
	projects[2].h = canvas.height / 6;
	projects[2].draw();
	projects[3].x = canvas.width / 2 - Math.cos(50 * Math.PI / 180) * w / 2;
	projects[3].y = canvas.height / 4 + Math.sin(50 * Math.PI / 180) * w / 2;
	projects[3].h = canvas.height / 4;
	projects[3].draw();
	
	/*
	let tempX = w + Math.cos(30 * Math.PI / 180) * w / 2;
	let tempY = y - Math.sin(30 * Math.PI / 180) * w / 2;
	ctx.fillRect(tempX - 20, tempY + 20, 2, canvas.height / 2);
	*/
	drawCross();
	

	//ctx.fillRect(lineX + 20, lineY + 20, 2, canvas.height / 2);
	
}

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


function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y:evt.clientY - rect.top};
}

canvas.addEventListener("mousemove", function(e) {
	mousePos = getMousePos(canvas, e);

	});