var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
var mousePos = {};
var bubbles = [];
var newPageBubbles = [];
var linkClicked = false;
var timeClicked = 2000;
var nextLink = "./index.html";
var pastel = ["#ffb3ba","#ffdfba","#ffffba","#baffc9","#bae1ff"];
var iT = new initialText(canvas.width / 2, canvas.height / 8);
var eT = new endText(canvas.width / 2, canvas.height / 8);
bubbles.push(new bubble(canvas.width / 4 - 50, canvas.height / 2 - 50, 0.25, 0.5, 100, 1, 2, 3));
bubbles.push(new bubble(canvas.width / 2 - 50, canvas.height / 2 - 100, 0.5, 0.4, 100, 1, 2, 3));
bubbles.push(new bubble(canvas.width * 3 / 4 - 50, canvas.height / 2 - 50, 0.75, 0.5, 100, 1, 2, 3));
bubbles[0].t = "Bio";
bubbles[1].t = "Projects";
bubbles[2]. t = "Contacts";
bubbles[0].l = "../html/bio.html";
bubbles[1].l = "../html/project.html";
bubbles[2].l = "../html/contact.html";

resizeCanvas();
function bubble(x, y, mulX, mulY, size, speed, color, up) {
	this.x = x;
	this.y = y;
	this.mulX = mulX;
	this.mulY = mulY;
	this.moveUp = true;
	this.numUp = 0;
	this.size = size;
	this.speed = speed;
	this.color = color;
	this.up = up;
	this.s = new shadow(this.x, this.y, this.mulX, this.mulY, this.size);
	this.draw = function() {
		ctx.beginPath();
		let gradient = ctx.createLinearGradient(this.x - this.size * Math.sin(Math.PI / 4), this.y + this.size * Math.sin(Math.PI / 4),
												this.x + this.size * Math.sin(Math.PI / 4), this.y - this.size * Math.sin(Math.PI / 4));
		gradient.addColorStop(0,pastel[color]);
		gradient.addColorStop(1, pastel[up]);
		ctx.fillStyle = gradient;
		ctx.arc(this.x,this.y,this.size, 0, Math.PI *2);
		ctx.fill();
		ctx.closePath();
		
		//white circle
		ctx.beginPath();
		ctx.lineWidth = size / 20;
		ctx.strokeStyle = "white";
		ctx.arc(this.x, this.y, this.size, 0, Math.PI* 2);
		ctx.stroke();
	}
	
	this.type = function () {
		ctx.font = "40px Georgia";
		ctx.fillStyle = "#8b8682";
		let xOffset = (this.t.length / 2) * 20;
		if (this.t.length % 2 == 0) {
			xOffset -= 10;
		}
		ctx.fillText(this.t, this.x - xOffset, this.y + 10);
	}
}

function shadow(x, y, mulX, mulY, size) {
	this.x = x;
	this.y = y;
	this.mulX = mulX;
	this.mulY = mulY;
	this.size= size;
	
	this.draw = function() {
		ctx.beginPath();
		ctx.fillStyle = "#baffc9";
		ctx.arc(this.x,this.y,this.size, 0, Math.PI *2);
		ctx.fill();
		ctx.closePath();
	}
}

function initialText(x, y) {
	this.x = x;
	this.y = y;
	this.a = 1;
	this.draw = function() {
		ctx.globalAlpha = this.a;
		ctx.font = "60px Georgia";
		let gradient = ctx.createLinearGradient(this.x - 250, this.y, this.x + 25 * 40 - 250, this.y);
		gradient.addColorStop(0,'#f08080');
		gradient.addColorStop(1, "#000000");
		ctx.fillStyle = gradient;
		ctx.fillText("hello", this.x - 250, this.y);
		ctx.font = "40px Georgia";
		ctx.fillText("  I'm Johnny On.", this.x - 250, this.y + 40);
		ctx.fillText("    an aspiring programmer.", this.x - 250, this.y + 80);
		ctx.globalAlpha = 1;
	}
}

function endText(x,y) {
	this.x = x;
	this.y = y;
	this.pUp = 0;
	this.gone = false;
	this.draw = function() {
		if (this.pUp > 40) {
			this.pUp = 40;
		}
		let gradient = ctx.createLinearGradient(this.x - 250, this.y, this.x + 25 * 40 - 250, this.y);
		gradient.addColorStop(0,'#f08080');
		gradient.addColorStop(1, "#000000");
		ctx.fillStyle = gradient;
		ctx.font = "40px Georgia";
		ctx.fillText(" Johnny", this.x + 20 * 4 - 250, this.y + 40);
		ctx.fillText("   programmer", this.x + 11 * 20 - 2 - 250, this.y + 80 - this.pUp);
		if (this.gone) {
			ctx.fillText(",", this.x + 20 * 11 - 250, this.y + 40);
		}
		
	}
}

var lastTime = 0;
var timer = 0;
var nextTimer = 0;
var clickable = false;
function update(time = 0) {
	const deltaTime = time - lastTime;
	timer += deltaTime;
	lastTime = time;
	requestAnimationFrame(update);
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "#bae1ff";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	if (timer > 3000 && nextTimer > 1000) {
		eT.draw();
		for (b of bubbles) {
			b.s.draw();
			if (over(mousePos, b) || over(mousePos, b.s)) {
				if (b.numUp < 25) {
					b.y -= b.speed;
					b.numUp += 1;
				}
			} else {
				if (b.numUp > 1) {
					b.y += b.speed;
					b.numUp -= 1;
				}
			}
			b.draw();
			b.type();
		}
	} else {
		if (iT.a != 0) {
			if (timer > 2000) {
				iT.a *= .90;
			}
			if (iT.a < .1) {
				iT.a = 0;
			}
			iT.draw();
			eT.draw();
		} else {
			eT.gone = true;
			nextTimer += deltaTime;
			eT.pUp += 1;
			eT.draw();
			
		}
		
	}
	if (linkClicked && timeClicked > 0) {
		timeClicked -= deltaTime;
		for (b of newPageBubbles) {
			b.y -= b.speed;
			b.draw();
		}
	}
	
	if (timeClicked < 0) {
		window.location.href = nextLink;
		timeClicked = 2000;
		linkClicked = false;
		cancelAnimationFrame(update);
		newPageBubbles = [];
		generateBubbles();
	}
	
}

function generateBubbles() {
	while (newPageBubbles.length < 100) {
		let tempX = Math.random();
		let tempY = canvas.height * 1.1;
		let tempSpeed = Math.random() * 5 + 2; 
		let tempColor = Math.floor(Math.random() * 5);
		let tempColor2 = Math.floor(Math.random() * 5);
		//console.log(new bubble(tempX * canvas.width, tempY, tempX, 1.1, 15, tempSpeed));
		newPageBubbles.push(new bubble(tempX * canvas.width, tempY, tempX, 1.1, 15, tempSpeed, tempColor, tempColor2));
	}
}

function over(mouse, bubble) {
	let diffX = mouse.x - bubble.x;
	let diffY = mouse.y - bubble.y;
	return Math.sqrt(diffX * diffX + diffY * diffY) < bubble.size;
}

//resize stack overflow
function resizeCanvas(){
    if (canvas.width  != window.innerWidth) {
        canvas.width  = window.innerWidth;
    }
    if (canvas.height != window.innerHeight) {
        canvas.height = window.innerHeight;
    }
	for (b of bubbles) {
		b.s.x = b.s.mulX * canvas.width;
		b.s.y = b.s.mulY * canvas.height;
		b.x = b.mulX * canvas.width;
		b.y = b.mulY * canvas.height;
		iT.x = canvas.width / 2;
		iT.y = canvas.height / 8;
		eT.x = canvas.width / 2;
		eT.y = canvas.height / 8;
		
	}
	newPageBubbles = [];
	generateBubbles();
	update();
}
window.addEventListener("resize", resizeCanvas);

//from stackoverflow
canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y:evt.clientY - rect.top};
}

canvas.addEventListener('click', function(e) {
	mousePos = getMousePos(canvas, e);
	for (b of bubbles) {
		if (over(mousePos, b) || over(mousePos, b.s) && !linkClicked) {
			linkClicked = true;
			nextLink = b.l;
			generateBubbles();
		}
	}
	
});