var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var menu = document.getElementById("menu");
var Mctx = menu.getContext("2d");
var mousePos = {x: 0, y: 0};
var boardState = false;
var keys = [false, false, false, false];
var p = new person(100, 100, 0, 0 , 2);
//p.color = 2;
var balls = [];
//balls.push(new ball(50, 50, Math.PI * 2/3, 5, 0, 25));
var begin = true;
var restart = false;
function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillColor = "black";
    ctx.rect(canvas.width /2 - 75, canvas.height/ 2 - 25, 150, 50);
    ctx.stroke();
    ctx.font = "40px Georgia";
    ctx.fillText("Start", canvas.width / 2 - 45, canvas.height/2 + 15);
    ctx.closePath();
}
start();

function person(x, y, velX, velY, speed) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.speed = speed;
	this.size = 25;
	this.damage = 0;
	this.selection = ['red', '#0000FF'];
    this.color = 0;
	this.move = function () {
		let original = {x:this.x, y:this,y};
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
		
		//borders
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

	this.draw = function() {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.fillStyle = this.selection[this.color];
		ctx.arc(this.x, this.y, 25, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
}


function ball(x, y, angle, speed, color, size) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.Xspeed = speed;
    this.Yspeed = speed;
    this.color = color;
    this.size = size;
    this.selection = ['#0000FF', 'red'];
    this.move = function() {
    
		var tempX = this.x + this.Xspeed * Math.cos(this.angle);
		var tempY = this.y +  this.Yspeed * Math.sin(this.angle);
        
        if (tempX < this.size || tempX > canvas.width - this.size) {
            this.Xspeed = -this.Xspeed;
            tempX = this.x + this.Xspeed * Math.cos(this.angle);
        }
        if (tempY < this.size || tempY > canvas.height - this.size) {
            this.Yspeed = -this.Yspeed;
            tempY = this.y +  this.Yspeed * Math.sin(this.angle);
        }
        this.x = tempX;
        this.y = tempY;
	}
    this.draw = function() {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.fillStyle = this.selection[this.color];
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
    /*
    this.bounce = function(otherBall) {
        let tempX = this.Xspeed;
        let tempY = this.Yspeed;
        
        this.Xspeed = -otherBall.Xspeed;
        this.Yspeed = -otherBall.Yspeed;
        otherBall.Xspeed = -tempX;
        otherBall.Yspeed = -tempY;
    }
    */
}

function bounce(b1, b2) {
    b1.Xspeed = -b1.Xspeed;
    b1.Yspeed = -b1.Yspeed;
    b2.Xspeed = -b2.Xspeed;
    b2.Yspeed = -b2.Yspeed;
    
}
function collision(person, ball) {
    if (person.color != ball.color) {
        return false;
    }
    let diffX = person.x - ball.x;
    let diffY = person.y - ball.y;
    
    if (Math.sqrt(diffX*diffX + diffY * diffY) < person.size + ball.size) {
        return true;
    }
    return false;

}

function menuUpdate() {
    Mctx.clearRect(0,0, menu.width, menu.height);
    Mctx.font = "20px Georgia";
    Mctx.fillText("Time Alive: " + (currTime/ 1000).toFixed(2) + " sec", menu.width / 4, menu.height /2);
    Mctx.fillText("High Score: " + bestTime + " sec", menu.width * 3 / 4, menu.height /2);
}

var lastTime = 0;
var currTime = 0;
var bestTime = 0.00;
function update(time = 0) {
    const deltaTime = time - lastTime;
	lastTime = time;
    //console.log(currTime);
    requestAnimationFrame(update);
    if (startClicked() && boardState == false) {
        boardState = true;
        mousePos = {x: -1, y: -1};
        begin = false;
    }
    if (boardState) {
        currTime += deltaTime;
        if (restart) {
            restart = false;
            currTime = 0;
            keys = [false, false, false, false];
        }
        menuUpdate();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        p.move();
        p.draw();
        
        
        while (balls.length < 10) {
            //to stay within borders 
            let tempX = (canvas.width - 50) * Math.random() + 25; 
            let tempY = (canvas.height - 50) * Math.random() + 25;
            let tempA = Math.random() * Math.PI * 2;
            let tempSpeed = Math.random() * 10;
            let tempColor = Math.floor(Math.random() * 2);
            var tempBall = new ball(tempX, tempY, tempA, tempSpeed, tempColor, 10);
            var collide = false;
            for (b of balls) {
                let prevColor = b.color;
                b.color = tempBall.color;
                if (collision(b, tempBall)) {
                    collide = true;
                }
                b.color = prevColor;
                
            }
            
            tempBall.size = 300;
            if (collision(p, tempBall)) {
                collide = true;
            }
            tempBall.size = 10;
            if (!collide) {
			balls.push(tempBall);
            }
        }

        var falseBalls = [];
        for (var i  = 0; i < ball.length; i++) {
            falseBalls.push(false);
        }
        for (b of balls) {
            b.move();
            b.draw();
            if (collision(b, p)) {
                //console.log('stop');
                boardState = false;
            }
        }
        for (var i = 0; i < balls.length; i++) {
            for (var j = i + 1; j < balls.length; j++) {
                if (collision (balls[i], balls[j]) && !falseBalls[i] && !falseBalls[j]) {
                    bounce(balls[i], balls[j]);
                    
                    balls[i].move();
                    balls[j].move();
                    falseBalls[i] = true;
                    falseBalls[j] = true;
                }
            }
        }

    } else if (!boardState && !begin) {
        balls = [];
        p.x = 50;
        p.y = 50;
        Mctx.clearRect(0,0, menu.width, menu.height);
        alert("Game Over! Your score was: " + (currTime / 1000).toFixed(2) + " seconds. Wao!");
        bestTime = Math.max(((currTime / 1000).toFixed(2)), bestTime);
        restart = true;
        boardState = true;
    }
    
}
update();


function startClicked() {
    //console.log(mousePos.x, canvas.width / 2, mousePos.y, canvas.height /2);
    if (mousePos.x > canvas.width / 2 - 75 && mousePos.x < canvas.width / 2 + 75 
        && mousePos.y > canvas.height / 2 - 25 && mousePos.y < canvas.width / 2 + 25 ) {
        return true;
    }
    return false;
}


//track mouse movement from stackoverflow
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y: evt.clientY - rect.top};
}
canvas.addEventListener('click', function (evt) {
	mousePos = getMousePos(canvas, evt);
    console.log('click ', p.color);
	if (boardState) {
        p.color = 1 - p.color;
        
    }
}, false);


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