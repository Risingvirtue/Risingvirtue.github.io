
function cap(info) {
	this.size = info.size;
	this.x = info.x;
	this.height= info.height;
	this.number = info.number;
	this.velocity = info.velocity;
	this.spin = info.spin;
	this.angle = info.angle;
	this.t = 0.01;
	this.side = 0;
	this.sideSpeed = 1;
	this.time = 0;
	this.length = 0;
	this.spinCap = function() {
		this.angle = (this.angle + this.spin) % 360;
		$("#cap" + this.number).css({'transform': 'rotate(' + this.angle + 'deg)'});
		var angle = this.angle;
		if (this.velocity < 0) {
			
			this.length = this.length + Math.floor(-this.velocity);
			if (this.length >= 80) {
				angle = this.angle + 180;
			}
		}
		angle += Math.sin(this.time * 180 * Math.PI / 180) * 3 * this.sideSpeed;
		
		$("#circle-container" + this.number).css({'transform': 'rotate(-'  + angle + 'deg)'});
		
	}
	
	this.init = function() {
		var contents = '<div class="cap" id="cap' + this.number +'">' +
							'<div class="circle-container" id="circle-container' + this.number +'">' +
							'<div class="circle" id="circle' + this.number +'"></div>' +
							'<div class="tassle" id="tassle' + + this.number +'"></div>' +
							'<div class="rope" id="rope' + this.number +'"></div>' +
							'<div class="strings" id="strings' + this.number +'">' +
								'<div class="string1" id="string1' + + this.number +'"></div>' +
								'<div class="string2" id="string2' + + this.number +'"></div>' +
								'<div class="string3" id="string3' + + this.number +'"></div>' +
							'</div>' +
						'</div>';
		var oldContents = $("#container").html();
		$("#container").html(oldContents + contents);
		//adust location
		$("#cap" + this.number).css({top: window.innerHeight - this.height, left: this.x, visibility: "hidden"});
		
		this.changeCapSize(this.size);
		
		//adjustZ
		$("#cap" + this.number).css({"z-index": this.number * 3});
		$("#circle" + this.number).css({"z-index": this.number * 3 + 2});
		$("#tassle" + this.number).css({"z-index": this.number * 3 + 1});
		$("#rope" + this.number).css({"z-index": this.number * 3 + 2});
		$("#strings" + this.number).css({"z-index": this.number * 3 + 1});
		
		
		this.spinCap();
	}
	
	this.changeCapSize = function(size) {
		var center = this.getCenter();
		$("#cap" + this.number).css({width: size, height: size});
		var circle = 8 * size / 125;
		var margin = (size - circle) / 2;
		$("#circle-container" + this.number).css({height: circle, width: circle, top: margin, left: margin});
		$("#circle" + this.number).css({height: circle, width: circle, 'border-radius': circle});
		var ropeWidth = circle / 4;
		var ropeLength = (size / 2) * 1.1;
		
		if (this.length >=0 && this.length <= 160) {
		
			ropeLength *= Math.abs(this.length - 80) / 80;
		}
		$("#tassle"+ this.number).css({height: ropeLength, width: ropeWidth, top: circle / 2, left: (circle - ropeWidth) / 2});
		$("#rope"+ this.number).css({top: ropeLength, height: circle, width: circle, left: 0, 'border-radius': circle});
		$("#cap"+ this.number).css({top: center.y - (1 + size / 2), left: center.x - (1 + size / 2)});
		var stringHeight = .5 * size;
		var stringWidth = circle / 4;
		var offSetY = stringHeight - Math.cos(4 * Math.PI / 180) * stringHeight;
		var offSetX = stringHeight * Math.sin(4 * Math.PI / 180);
		$("#strings" + this.number).css({top: ropeLength - circle / 2, left: (circle + 2 - stringWidth) / 2});
		$("#string1" + this.number).css({height: stringHeight, width: stringWidth, "margin-top": -offSetY, "margin-left": -offSetX});
		$("#string2" + this.number).css({height: stringHeight, width: stringWidth});
		$("#string3" + this.number).css({height: stringHeight, width: stringWidth, "margin-top": -offSetY, "margin-left": offSetX});
		
	}
	
	this.getCenter = function() {
		var rect = document.getElementById("cap" + this.number).getBoundingClientRect();
		return {x: rect.x + (rect.width / 2 - 1), y: rect.y + (rect.height / 2 - 1)};
	}
	this.init();
	
	this.incrementTime = function() {
		this.height += this.velocity;
		this.velocity = this.velocity - this.t * 9.8;
		this.time += 0.05;
	}
	
	this.moveCap = function(range) {
		if (this.height + this.size / 2 < range.lower || this.height - this.size / 2 > range.upper) {
			$("#cap" + this.number).css({display: "none"});
		} else {
			$("#cap" + this.number).css({display: "block"});
			var topPercent = (range.upper - (this.height + this.size / 2)) / (range.upper - range.lower);
			topPercent *= 100;
			$("#cap" + this.number).css("top", topPercent + "%");
		}
	}
	
	this.adjustSize = function(ratio) {
		
		this.changeCapSize(this.size / ratio);
	}
}

function cloud(info) {
	this.ratio = info.ratio;
	this.width = info.width;
	this.imgHeight = info.ratio * this.width;
	this.velocity = info.velocity;
	this.height = info.height;
	this.x = info.x;
	this.url = info.url;
	this.id = info.id;
	
	this.init = function() {
		var contents = '<img class="cloud" id="cloud' + this.id + '" src="' + this.url + '"></img>';
		var oldContents = $("#container").html();
		$("#container").html(oldContents + contents);
		
		$("#cloud" + this.id).css({"z-index": 3 * this.id});
	}
	
	this.move = function() {
		this.x = this.x + this.velocity;
		$("#cloud" + this.id).css({left: this.x - this.width / 2});
		
	}
	
	
	this.show = function(range) {
		$("#cloud" + this.id).css({display: "block"});
		
		var topPercent = (range.upper - (this.height + this.imgHeight / 2)) / (range.upper - range.lower);
		topPercent *= 100;
		topPercent = topPercent.toFixed(2);
		
		$("#cloud" + this.id).css({"top": topPercent + "%"});
	}
	
	this.init();
}
