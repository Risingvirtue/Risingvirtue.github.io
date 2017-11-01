canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var circle = new Path2D();

//position = [canvas.width / 2, canvas.height / 2];
var keys = [false, false, false, false];
var x = 0,
	y = 0,
	velY = 0,
	velX = 0,
	speed = 2,
	friction = 1;
var mousePos = {x:0, y:0};
var bullets = [];
var enemies = [];
var deadE = [];
var mouseDown = false;
var timeInterval = 300;
var timeCounter = 0;
let lastTime = 0;
var ableToShoot = false;

var FPS = new person(25,25,0,0,2);

enemies.push(new enemy(100, 100, 25));
enemies.push(new enemy(300, 100, 25));

function update(time = 0) {
	const deltaTime = time - lastTime;
	timeCounter += deltaTime;
	if (timeCounter > timeInterval) {
		ableToShoot = true;
		timeCounter = 0;
	}
	lastTime = time;
	requestAnimationFrame(update);
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
	//body
	FPS.movement();
	FPS.draw();
	
	
	//shooter
	FPS.shooter();

	
	//angle 
	var a = FPS.currAngle();
	//bullets
	if (mouseDown && ableToShoot) {
		let temp = new bullet(a, 50 * Math.cos(a) + FPS.x, 50 * Math.sin(a) + FPS.y);
		bullets.push(temp);
		console.log(bullets);
		ableToShoot = false;
		timeCounter = 0;
	}
	var newBullets = [];
	for (b of bullets) {
		b.move();
		if (b.x > canvas.width || b.x < 0 || b.y > canvas.height || b.y < 0){
			continue;
		} 
		b.draw();
		newBullets.push(b);
	};
	bullets = newBullets;
		
	//enemies
	var newEnemies = [];
	for (e of enemies) {
		let dead = false;
		let index = 0;
		for (b of bullets) {
			let diffX = e.x - b.x;
			let diffY = e.y - b.y;
			if (Math.sqrt(diffX * diffX + diffY * diffY) < 50 + e.size) {
				dead = true;
				bullets.splice(index, 1);
				break;
			}
			index++;
		}
		if (dead) {
			deadE.push(e);
			continue;
		}
		e.draw('#000000');
		newEnemies.push(e);
	}
	enemies = newEnemies;
	
	newDead = [];
	for (e of deadE) {
		e.a *= 0.95;
		e.draw('red');
		if (e.a > 0.1) {
			newDead.push(e);
		}
	}
	deadE = newDead;
}
update();



function person(x, y, velX, velY, speed) {
	
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.speed = speed;
	
	this.movement = function () {
		if (keys[0]) {
			if (this.velX > -this.speed) {
				this.velX--;
			}
		} else if (keys[2]) {
			if (this.velX < this.speed) {
			this.velX++;
			}
		} else {
			this.velX = 0;
		}
		if (keys[1]) {
			if (this.velY > -this.speed) {
				this.velY--;
			}
		} else if (keys[3]) {
			if (this.velY < this.speed) {
				this.velY++;
			}
		} else {
			this.velY = 0;
		}
		this.y += this.velY;
		this.x += this.velX;
		if (this.x > (canvas.width) - 25) {
		this.x -= this.velX;
		} else if (this.x < 25){
			this.x = 25;
		}
		if (this.y > (canvas.height) - 25) {
			this.y -= this.velY;
		} else if (this.y < 25){
			this.y = 25;
		}
	}

	this.draw = function () {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
	
	this.shooter = function () {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		let a = this.currAngle();
		ctx.lineTo(50 * Math.cos(a) + this.x, 50 * Math.sin(a) + this.y);
		ctx.lineWidth = 10;
		ctx.stroke();
	}
	
	this.currAngle = function() {
		let diffX = mousePos.x - this.x;
		let diffY = mousePos.y - this.y;
		let angle = Math.atan(diffY/ diffX);
		if (diffX < 0) {
			angle += Math.PI;
		}
		return angle;
	}
}

function bullet(angle, x , y) {
	this.angle = angle;
	this.x = x;
	this.y = y;
	
	this.move = function() {
		this.x += 10 * Math.cos(this.angle);
		this.y += 10 * Math.sin(this.angle);
	}
	this.draw = function() {
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
		ctx.fill();
	}
}

function enemy(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.a = 1;
	this.draw = function(color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.globalAlpha = this.a;
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = 'black';
		ctx.globalAlpha = 1;
	}
	
	
}



/*
function drawBody() {
	ctx.beginPath();
	ctx.moveTo(x, y);
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
	ctx.closePath();
}
*/

/*
document.onkeydown = checkKey;

function checkKey(e) {
	console.log(e.keyCode);
  switch(e.keyCode) {
	case 87:
		keys[1] = true;
		break;
	case 83:
		position[1] = (position[1] + 10) % canvas.height; 
		break;
	case 65: 
		position[0] = (position[0] - 10) % canvas.height; 
		break;
	case 68: 
		position[0] = (position[0] + 10) % canvas.height; 
		break;
  }
  movement();
}
*/

document.body.addEventListener("keydown", function (e) {
    switch(e.keyCode) {
	case 87:
		keys[1] = true;
		break;
	case 83:
		keys[3] = true;
		break;
	case 65: 
		keys[0] = true;
		break;
	case 68: 
		keys[2] = true;
		break;
  }
});
document.body.addEventListener("keyup", function (e) {
    switch(e.keyCode) {
	case 87:
		keys[1] = false;
		break;
	case 83:
		keys[3] = false;
		break;
	case 65: 
		keys[0] = false;
		break;
	case 68: 
		keys[2] = false;
		break;
  }
});


document.body.addEventListener("mousedown", function (e) {
	mouseDown = true;
	//console.log(mousePos);
	//let a = currAngle();
	//bullets.push({angle:a, x: 50 * Math.cos(a) + x, y: 50 * Math.sin(a) + y});
	//console.log(bullets[0]);
	
});

document.body.addEventListener("mouseup", function (e) {
	mouseDown = false;
	
});

//track mouse movement from stackoverflow
canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
	
	//bullet.push({angle:});
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y:evt.clientY - rect.top};
}

