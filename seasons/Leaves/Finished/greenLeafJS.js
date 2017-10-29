
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "https://i.pinimg.com/originals/09/63/1a/09631a076b624fde9f2ac51f98803ed3.jpg";

var leafMaxSize = 100.0;
var maxVelocity = 9.8;
var maxDrift= 1.0/16.0;

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

//generates a leaf with a certain alpha,
function createColoredLeaf(start, end, alpha, invert) {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  var tempWidth = canvas.width;
  var tempHeight = canvas.height;
  canvas.width = 250;
  canvas.height = 250;
  var leaf = new Image();
  leaf.src = "leafTransparent3.png";
  ctx.drawImage(leaf, 0, 0, 250, 250);
  var imgd = ctx.getImageData(0, 0, 250, 250);
  var pix = imgd.data;
  var counter = 0;
  var numOfColors = end - start;
  var interval = Math.ceil(9174 / numOfColors) + 1;
  //fill in neccessary space
  for (var i = 0, n = pix.length; i < n; i += 4) {
    var r = pix[i],
      g = pix[i+1],
      b = pix[i+2];
      if (r == 0 && g == 125 && b == 0) {
        counter  += 1;
        var position;
        if (invert) {
          position = Math.min(511, end - Math.floor(counter / interval));
        } else {
          position = Math.min(511, start + Math.floor(counter / interval));
        }
        var currColor = colorSpectrum[position];
        pix[i] = currColor.r;
        pix[i+1] = currColor.g;
        pix[i+2] = currColor.b;
        pix[i+3] = 300 * alpha;
      }
  }
  ctx.putImageData(imgd, 0, 0);
  var newLeaf = new Image();
  newLeaf.src = canvas.toDataURL();
  //restore canvas
  canvas.width = tempWidth;
  canvas.height = tempHeight;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //ctx.drawImage(newLeaf, 0,0)
  return newLeaf
}


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
    this.alpha = 0;
    this.constructImage();
    this.reverse = Math.floor(Math.random() * 2);
  }
  constructImage() {
    var invert = Math.floor(2 * Math.random());
    var start = Math.floor(Math.random() * 511);
    var end = Math.floor(start + (511- start) * Math.random());
    var alpha = 0.4 + 0.6 * Math.random();
    var image = createColoredLeaf(start,end,alpha, invert);
    this.image = image;
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.drawImage(this.image, 0,0, 250, 250);
  }
}
var leafStack = [];

function generateTo100(leafStack) {
  while (leafStack.length != 100) {
    leafStack.push(generateLeaves());
  }
}

function generateLeaves(index) {
  var randSize = Math.random() * leafMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1); //min velocty of 1
  var angle = (Math.PI / 3) * (Math.random() - 0.5);
  var fade = 0.99 + 0.01 * Math.random();
  var driftSpeed = 0.8 * maxDrift + maxDrift * Math.random() * 0.2;
  var tempLeaf = new leafImage(randSize, randPos, velocity, angle, driftSpeed, fade);
  return tempLeaf;
}
canvas.width = 1280;
canvas.height = 720;
generateTo100(leafStack);


console.log(leafStack);

//ctx.drawImage(leafStack[0].image, 0, 0);
//need velocity, wind, fade
setInterval(timeStep, 100);
function timeStep() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(background, 0 , 0 , canvas.width, canvas.height);
  for (leaf of leafStack) {
    if (leaf.alpha < 0.01 || leaf.height > canvas.height + 100) {
          leaf.alpha = 1;
          leaf.height = 0;
    }
    ctx.save();
    leaf.height += leaf.velocity;
    ctx.translate(leaf.xPos, leaf.height - 250); // generate leaves initially above canvas
    leaf.tick += leaf.driftSpeed;
    leaf.angle = Math.PI / 3 * Math.sin(2 * leaf.tick);
    /* To reverse doesnt look as good
    if (this.reverse) {
      leaf.angle = Math.PI / 3 * Math.cos(2 * leaf.tick);
    } else {

    }
    */
    ctx.rotate(leaf.angle + Math.PI / 4);
    leaf.alpha  = leaf.alpha * leaf.fade;
    ctx.globalAlpha = leaf.alpha;
    ctx.drawImage(leaf.image, 100, 100, leaf.size, leaf.size);
    ctx.restore();

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
