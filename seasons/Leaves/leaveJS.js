canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "https://avvesione.files.wordpress.com/2014/01/sasami_sanganbaranai-03-autumn-fall-golden_leaves-red-orange-water-peaceful.jpg";

var leafMaxSize = 150.0;
var maxVelocity = 9.8;
var maxDrift= 1.0/16.0;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

//create colorSpectrum from green to red
var colorSpectrum = [];
for (var i = 0; i < 511; i++) {
  if (i < 256) {
    var tempColor = {r:i, g:255, b:0, a:1};
    colorSpectrum.push(tempColor);
  } else {
    var tempColor = {r:255, g:510 - i, b:0, a:1};
    colorSpectrum.push(tempColor);
  }
}
//creates leaf
class leafImage {
  constructor(size, xPos, velocity, angle, driftSpeed, fade) {
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.angle = angle;
    this.fade = fade;
    this.height = 0;
    this.tick = angle;
    this.driftSpeed = driftSpeed;
    this.constructImage();
  }
  constructImage() {
    var leaf = new Image();
    leaf.src = "leafTransparent5.png";
    this.alpha = 1.0;
    this.image = leaf;
  }
}
//where leaves are stored
var leafStack = [];

function generateTo100(leafStack) {
  while (leafStack.length != 100) {
    leafStack.push(generateLeaves());
  }
}
//generate leaves from randomized integers
function generateLeaves() {
  var randSize = Math.random() * leafMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1); //min velocty of 1
  var angle = (Math.PI / 3) * (Math.random() - 0.5);
  var fade = 0.99 + 0.01 * Math.random();
  var driftSpeed = 0.8 * maxDrift + maxDrift * Math.random() * 0.2;
  var tempLeaf = new leafImage(randSize, randPos, velocity, angle, driftSpeed, fade);
  return tempLeaf;
}
//create 100 leaves
generateTo100(leafStack);

setInterval(timeStep, 100);
//creates the next movement
function timeStep() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(background, 0 , 0 , canvas.width, canvas.height);
  var newLeafStack = [];
  for (leaf of leafStack) {
    if (leaf.alpha < 0.01 || leaf.height > canvas.height + 100) {
        continue;
    }
    ctx.save();
    leaf.height += leaf.velocity;
    ctx.translate(leaf.xPos, leaf.height - 250); //start from above canvas for seamless transition
    leaf.tick += leaf.driftSpeed;
    leaf.angle = Math.PI / 3 * Math.sin(2 * leaf.tick);
    //make leaves sway
    ctx.rotate(leaf.angle + Math.PI / 4);
    leaf.alpha  = leaf.alpha * leaf.fade; //fade 
    ctx.globalAlpha = leaf.alpha;
    ctx.drawImage(leaf.image, 100, 100, leaf.size, leaf.size);
    ctx.restore();
    newLeafStack.push(leaf);
  }
  leafStack = newLeafStack;
  //creates leaves when then disappear
  if (leafStack.length != 100) {
    generateTo100(leafStack);
  }
}



/*

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var leaf = new Image();
leaf.src = "leafTransparent2.png";
//ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.drawImage(leaf, 0, 0, 250, 250);

var imgd = ctx.getImageData(0, 0, 250, 250);
var pix = imgd.data;
var newColor = {r:0, g:0, b:0, a:0};

for (var i = 0, n = pix.length; i < n; i += 4) {
  var r = pix[i],
    g = pix[i+1],
    b = pix[i+2];

    if ( r >= 235 && g >= 235 && b >= 235) {
      pix[i] = newColor.r;
      pix[i+1] = newColor.g;
      pix[i+2] = newColor.b;
      pix[i+3] = newColor.a;
    }
}
ctx.putImageData(imgd, 0 , 0);
*/
