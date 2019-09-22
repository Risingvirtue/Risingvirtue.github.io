var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');

var circles = [];
var colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1','#E2F0CB', '#B5EAD7', '#C7CEEA'];
var increment = 3;
var type = 'difference';
var isAllColor = true;
$(document).ready(function(){
	fitToContainer();
})

$(window).resize(function() {
	fitToContainer();
});

function fitToContainer(bool) {
    canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
    draw();
};

function handleSpeed() {
    increment = parseInt($('#speed').val());
}

function handleType() {
    type = $('#type').val();
}

function handleColor() {
    isAllColor = !isAllColor;
    if (isAllColor) {
        document.getElementById("color").innerText = "All Colors";
    } else {
        document.getElementById("color").innerText = "Pastel Colors";
    }
}



document.body.addEventListener("mousedown", function (e) {
    if (e.srcElement.id != 'main') {
        return;
    }
    var rect = canvas.getBoundingClientRect();
	var x = Math.round((e.clientX-rect.left)/(rect.right-rect.left) * canvas.width);
    var y = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top) * canvas.height);
    
    circles.push({
        fillStyle: getColor(),
        radius: 50,
        x: x,
        y: y
    })
});

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function getColor() {
    if (isAllColor) {
        return 'rgba(' + getRandomNumber(256) + ',' + getRandomNumber(256) + ',' + getRandomNumber(256) + ')';
    } else {
        var index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var newCircles = [];
    
    circles.forEach(function(circle) {
        ctx.beginPath();
        ctx.fillStyle = circle.fillStyle;
        ctx.globalCompositeOperation = type;
        ctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
        ctx.fill();
        circle.radius += increment;
        if (circle.radius < canvas.width) {
            newCircles.push(circle);
        }
        
    })
    
    circles = newCircles;
    
}
