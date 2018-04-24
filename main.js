var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var dots = [];
var dotsSort = [];
var mousePos = {x: 0, y:0};
var time = 0;
$(document).ready(function(){
	
	fitToContainer(true);
	generateText();
	requestAnimationFrame(draw);
})


$(window).resize(function() {
	fitToContainer();
	
});

function fitToContainer(bool) {
	
	$('#intro').css('margin-top', Math.floor($(window).height()* 3 / 6) - 3.5 * 20);
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	if (bool) {
		createDots();
	} else {
		for (var i = 0; i < dots.length; i++) {
			dots[i].resize(canvas.width, canvas.height);
		}
	}
	
};

function iterator(line, newLine, style) {
	this.line = line;
	this.index = 0;
	this.link = false;
	this.start = true;
	this.newLine = newLine;
	this.style = style;
	this.peek = function() {
		if (this.index < this.line.length) {
			return this.line[this.index]
		}
		return null;
	}
	
	this.get = function() {
		var character = this.peek();
		this.index = this.index + 1;
		return character;
	}
}

function linkIterator(line, newLine, style) {
	this.line = line;
	this.index = 0;
	this.link = true;
	this.str = "";
	this.start = true;
	this.newLine = newLine;
	this.style = style;
	this.get = function() {
		if (this.index < this.line.length) {
			this.str += this.line[this.index];
			this.index++;
			return this.str;
		} else {
			return null;
		}
	}
}

function addSpace(n) {
	var str = "";
	for (var i = 0; i < n; i++) {
		str += '&nbsp;'
	}
	return str;
}

function generateText() {
	
	var line1 = new iterator('Hello, my name is Johnny On._', true, "font-size: 25px; font-weight: bold");
	var line2 = new iterator('I am a UC Berkeley Graduate with degrees in Microbiology and Applied Mathematics._', true);
	var line3 = new iterator('Currently, I work as a Junior Web Developer focusing on JavaScript and Netsuite._', true);
	var line4 = new iterator('Feel free to take a look at my latest projects on the ', false);
	line4.extra = true;
	var line5 = new linkIterator('web portfolio page.', true);
	var line6 = new iterator('Based in Las Vegas, NV. Enquires at johnnyon@berkeley.edu.');
	var lines = [line1, line2, line3, line4, line5, line6];
	var index = 0;
	var interval = setInterval(function() {
		if (index < lines.length) {
			var line = lines[index];
			if (line.link) {	
				if (line.start) {
					line.start = false;
					$('#intro').children().last().remove();
					$('#intro').append('<a id="first" href="#"></a>');
					$('#first').html('<span style="color: rgba(0,0,0,0)">' + line.line + '</span>')
				}
				let character = line.get();
				if (character != null) {
					
					$('#first').html(character);
					$('#first').append('<span style="color: rgba(0,0,0,0)">' + line.line.substring(line.index) + '</span>')
				} else {
					if (line.newLine) {
						$('#intro').append('<br>');
					}
					index++;
				}
			} else {
				if (line.start) {
					line.start = false;
					
					$('#intro').append('<span style="color: rgba(0,0,0,0)">' + line.line + '</span>');
					if (line.extra) {
						$('#intro').append('<span style="color: rgba(0,0,0,0)">web portfolio page.</span>');
					}
					
				}
				var character = line.get();
				if (character != null) {
					$('#intro').children().last().remove();
					if (line.extra) {
						$('#intro').children().last().remove();
					}
					if (line.style != null) {
						$('#intro').append('<span style="' + line.style + '">' + character + '</span>');
					} else {
						$('#intro').append('<span>' + character + '</span>');
					}
					if (line.style != null) {
						$('#intro').append('<span style="color: rgba(0,0,0,0); ' + line.style + '">' + line.line.substring(line.index) + '</span>');
					} else {
						$('#intro').append('<span style="color: rgba(0,0,0,0);">' + line.line.substring(line.index) + '</span>');
					}
					
					if (line.extra) {
						$('#intro').append('<span style="color: rgba(0,0,0,0)">web portfolio page.</span>');
					}
					
				} else {
					
					if (line.newLine) {
						$('#intro').children().last().remove();
						
						$('#intro').children().last().css("color", "rgba(0,0,0,0)");
						$('#intro').append('<br>');
					}
					index++;
				}
			}
		} else {
			clearInterval(interval);
			var on = false;
			$('#intro').append('<span id="underscore">_</span>');
			setInterval(function() {
				if (on) {
					on = !on;
					$('#underscore').css('color', 'white');
				} else {
					on = !on;
					$('#underscore').css('color', 'rgba(0,0,0,0)');
				}
			}, 250)
		}
	}, 16);
}