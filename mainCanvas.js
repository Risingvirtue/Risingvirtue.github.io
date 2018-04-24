
function Dot(x, y, center, color) {
	this.x = x;
	this.y = y; 
	this.r = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
	this.t = Math.acos((center.x - x) / this.r);
	if (y > center.y) {
		this.t -= Math.PI;
	}
	this.center = center;
	this.color = color;
	this.lineColor = '#696969';
	this.draw = function() {
		
		ctx.beginPath();
		ctx.strokeStyle = this.lineColor;
		ctx.moveTo(this.x, this.y);
		var newX = this.x + 2000 * Math.sin(Math.PI /6);
		var newY = this.y - 2000 * Math.cos(Math.PI /6);
		ctx.lineTo(newX, newY);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1, 0, 2* Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	this.increment = function() {
		this.t += 0.001;
		this.x = this.center.x - this.r * Math.cos(this.t);
		this.y = this.center.y - this.r * Math.sin(this.t);
	}
	
	this.resize = function(width, height) {
		var ratioX = (width / 2) / this.center.x;
		var ratioY = (height / 2) / this.center.y;
		this.x = this.x * this.ratioX;
		this.y = this.y * this.ratioY;
		this.center.x = width / 2;
		this.center.y = height / 2;
	}
	
	this.changeLineColor = function(x,y) {
		var angle = Math.atan((x - this.x) / (this.y - y));
		angle = angle * 180 / Math.PI;
		
		if (angle > 20 && angle < 40) {
			
			this.lineColor = getAlphaColor(this.color);
			
		} else {
			this.lineColor = 'rgba(69,69,69,0.35)';
		}
		
		
	}
}


function createDots() {
	var r = Math.min(canvas.width, canvas.height);
	var colors = ['rgba(255, 0, 255, 1)', 'rgba(139, 0, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(192, 192, 192, 1)',
				'rgba(255, 255, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(128, 0, 128, 1)'];
	console.log(getAlphaColor(colors[0]));
	for (var i = 0; i < 100; i++) {
		var x = canvas.width / 2 + Math.round((2 * Math.random() - 1) * r/2 );
		var y = canvas.height / 2 + Math.round((2 * Math.random() - 1) * r /2);
		//var x = canvas.width / 2 + Math.round((2 * Math.random() - 1) * canvas.width / 2);
		//var y = canvas.height / 2 + Math.round((2 * Math.random() - 1) * canvas.height / 2);
		var color = Math.floor(Math.random() * colors.length);
		dots.push(new Dot(x, y,{x: canvas.width / 2, y: canvas.height / 2}, colors[color]));
		dotsSort.push({dot: dots[i],i: i});
	}
}

function draw() {
	time++;
	requestAnimationFrame(draw);
	ctx.clearRect(0,0, canvas.width, canvas.height);

	for (var i = 0; i < dots.length; i++) {
		dots[i].increment();
		dots[i].changeLineColor(mousePos.x, mousePos.y);
		dots[i].draw();
	}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

document.body.addEventListener("mousemove", function (e) {
	mousePos = getMousePos(canvas, e);
});

function getAlphaColor(color) {
	var rgba = color.substring(0, color.length - 2);
	rgba += '0.5)';
	return rgba;
	
}
