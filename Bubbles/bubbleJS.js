canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "#0000CD";
ctx.fillRect(0,0, canvas.width, canvas.height);

var center = [canvas.width / 2, canvas.height /2];
ctx.beginPath();

var gradient = ctx.createLinearGradient(center[0] - 100 * Math.sin(Math.PI / 4), center[1] + 100 * Math.sin(Math.PI / 4),
										center[0] + 100 * Math.sin(Math.PI / 4), center[1] - 100 * Math.sin(Math.PI / 4));

gradient.addColorStop(0,"#4169E1");
gradient.addColorStop(1, "#87CEEB");

ctx.fillStyle = gradient;
ctx.arc(center[0], center[1], 100, 0, Math.PI *2);
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "white";
ctx.arc(center[0], center[1], 100, 0, Math.PI* 2);
ctx.stroke();

/*
ctx.beginPath();
ctx.fillStyle = "#AFEEEE";
ctx.arc(canvas.width / 2 , canvas.height / 2 , 80, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();
ctx.beginPath();
//ctx.globalCompositeOperation = "destination-out";
ctx.fillStyle = "cyan";
ctx.arc(canvas.width / 2 - 12.5, canvas.height / 2 -12.5, 75, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();
*/