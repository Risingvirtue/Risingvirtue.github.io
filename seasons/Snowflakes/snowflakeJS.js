canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "http://www.wallpaperhdc.com/wp-content/uploads/2017/01/anime-winter-scenery-wallpaper-widescreen.jpg";
var snowflakeMaxSize = 50.0;
var maxVelocity = 9.8;

//creates snowflake class
class Snowflake {
  constructor(size, xPos, velocity, angle, rotationSpeed, fade) {
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.angle = angle;
    this.fade = fade;
    this.height = 0;
    this.rotationSpeed = rotationSpeed;
    this.constructImage();

  }
  constructImage() {
    var snow = new Image();
    snow.src = "snowflakeTemplate3.png";
    this.alpha = 1.0;
    this.image = snow;
  }
}
//where snowflakes are stored
var snowflakeStack = [];

//generate initial snowflakes
function generateTo100(snowflakeStack) {
  while (snowflakeStack.length != 800) {
    snowflakeStack.push(generateSnow());
  }
}
//randomized attributes generator
function generateSnow() {
  var randSize = Math.random() * snowflakeMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1 ); //min velocty of 1
  var angle = Math.PI * Math.random();
  var fade = 0.9 + 0.1 * Math.random();
  var rotationSpeed = Math.random();
  var tempSnowflake = new Snowflake(randSize, randPos, velocity, angle, rotationSpeed, fade);
  return tempSnowflake;
}
//sets canvas to desired width/height
canvas.width = 1280;
canvas.height = 720;

//creates 800 randomized snowflakes
generateTo100(snowflakeStack);

//creates a timestep
setInterval(timeStep, 100);

/* Experimentation with wind
var counter = 0;
var amortized = 2;
var wind = 0;
var sign = 1
*/

//each timeStep
function timeStep() {
  /*
  counter += 1;
  if (counter % amortized == 0) {
    amortized  = amortized * 2;
    sign = -sign;
  }
  wind += sign * 3 * Math.random();
  */
  ctx.clearRect(0,0, canvas.width, canvas.height);

  ctx.drawImage(background, 0,0, canvas.width, canvas.height);
  var newSnowflakeStack = [];
  for (flake of snowflakeStack) {
    if (flake.alpha < 0.01 || flake.height > canvas.height) {
        continue;
    }
    //rotation
    ctx.save();
    flake.height += flake.velocity;
    ctx.translate(flake.xPos, flake.height);
    flake.angle += flake.rotationSpeed * (Math.PI / 24);
    ctx.rotate(flake.angle);
    flake.alpha  = flake.alpha * flake.fade;
    ctx.globalAlpha = flake.alpha;
    ctx.drawImage(flake.image, -flake.size/2, -flake.size/2, flake.size, flake.size);
    ctx.translate(-flake.xPos, -flake.height);
    ctx.restore();
    newSnowflakeStack.push(flake);
  }
  snowflakeStack = newSnowflakeStack;
  //creates more snow if needed (runs off screen or disappears)
  if (snowflakeStack.length != 800) {
    generateTo100(snowflakeStack);
  }
}

//helper function to generate transparent snowflake template
/*
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var snow = new Image();
snow.src = "snowflakeTemplate1.png";
ctx.drawImage(snow, 0, 0, 250, 250);

var imgd = ctx.getImageData(0, 0, 250, 250);
var pix = imgd.data;
var newColor = {r:0, g:0, b:0, a:0};

for (var i = 0, n = pix.length; i < n; i += 4) {
  var r = pix[i],
    g = pix[i+1],
    b = pix[i+2];

    if ( r >= 230 && g >= 230 && b >= 230) {
      pix[i] = newColor.r;
      pix[i+1] = newColor.g;
      pix[i+2] = newColor.b;
      pix[i+3] = newColor.a;
    }
}
ctx.putImageData(imgd, 0,0);
*/
