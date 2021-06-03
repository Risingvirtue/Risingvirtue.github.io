var ratio = 3840/2160;
var rgb = [];
var isMouseDown = false;
var videoContainer = document.getElementById('videoContainer');
var videoElement = document.getElementById('videoElement');
var scale = 1;
var videoWidth = 640;
var videoHeight = 480;
var movingVideo = false;
var movingContainer = false;
var resizing = false;
var offset = {x: 0, y: 0};
var movingLocation = {x: 0, y: 0};
var currentVideoCoordinates = {x: videoContainer.clientWidth / 2, y: videoContainer.clientHeight / 2};
var containerRect = videoContainer.getBoundingClientRect();
var currentContainerCoordinates = {x: containerRect.left, y: containerRect.top};
window.onload = function() {
    
    const image = new Image(); // Using optional size for image
    image.onload = drawImage; // Draw when image has loaded

    image.src = 'https://gentle-taiga-54820.herokuapp.com/https://assets.foxdcg.com/dpp-uploaded/images/bobs-burgers/keyart_s12.jpg';
    //image.src = 'https://gentle-taiga-54820.herokuapp.com/https://www.denofgeek.com/wp-content/uploads/2020/12/Attack-On-Titan-Final-Season-Titan-Crowd-Header.jpg?fit=1200%2C685';
    image.crossOrigin = "Anonymous";
}

document.body.onmousedown = function(e) { 
  isMouseDown = true;
}

document.body.addEventListener('mousemove', function(e) {
    if (movingContainer && !resizing && !movingVideo) {
        var xDiff = (e.screenX - movingLocation.x);
        var yDiff = (e.screenY - movingLocation.y);
        moveContainer(currentContainerCoordinates.x + xDiff, currentContainerCoordinates.y + yDiff);
    }
    
});
videoContainer.onmousedown = function(e) { 
  movingContainer = true;
  movingLocation.x = e.screenX;
  movingLocation.y = e.screenY;
  resizing = (videoContainer.clientWidth - e.layerX) < 20 && (videoContainer.clientHeight - e.layerY) < 20;
  
}
videoContainer.onmouseup = function(e) {
  
  
}
videoContainer.addEventListener('mousemove', function(e) {
    
    if (isMouseDown && !movingVideo && resizing) {
        var width = videoContainer.clientWidth / 2;
        var height = videoContainer.clientHeight / 2;
        currentVideoCoordinates.x = Math.max(width, currentVideoCoordinates.x);
        currentVideoCoordinates.y = Math.max(width, currentVideoCoordinates.y);
        updateCameraSize(currentVideoCoordinates.x, currentVideoCoordinates.y);
      
        
    }
})

videoElement.onwheel = function(e) {
    e.preventDefault();
    scale += e.deltaY * -0.001;

    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);
    updateVideoSize();
}

videoElement.onmousedown = function(e) { 
  movingVideo = true;
  offset.x = e.screenX;
  offset.y = e.screenY;
}


videoElement.addEventListener('mousemove', function(e) {
    if (movingVideo) {
        var xDiff = (e.screenX - offset.x) * scale * 3;
        var yDiff = (e.screenY - offset.y) * scale * 3;
        updateCameraSize(currentVideoCoordinates.x + xDiff, currentVideoCoordinates.y + yDiff);
    }
})

videoElement.onmouseup = function(e) { 
  movingVideo = false;
  var xDiff = (e.screenX - offset.x) * scale * 3;
  var yDiff = (e.screenY - offset.y) * scale * 3;
  
  currentVideoCoordinates.x += xDiff;
  currentVideoCoordinates.y += yDiff;
}

document.body.onmouseup = function(e) { 
    if (movingContainer && !resizing) {
      movingContainer = false;
      var xDiff = (e.screenX - movingLocation.x);
      var yDiff = (e.screenY - movingLocation.y);
      
      currentContainerCoordinates.x += xDiff;
      currentContainerCoordinates.y += yDiff;
    }
  isMouseDown = false;
  movingVideo = false;
  movingContainer = false;
  resizing = false;
  
}

function drawImage() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.width / ratio;
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
    
}
function save() {
    var link = document.getElementById('link');
    link.setAttribute('download', 'bobImage.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
function paste() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var videoElement = document.getElementById("videoElement");
    context.drawImage(videoElement, 0,0);
}

function updateVideoSize() {
    
    videoElement.style.width = (videoWidth * scale) + 'px';
    videoElement.style.height = (videoHeight * scale) + 'px';
}
function updateCameraSize(cameraX, cameraY) {
    
    var width = videoContainer.clientWidth / 2;
    var height = videoContainer.clientHeight / 2;
    var newClipPath = 'ellipse(' + width + 'px ' + height + 'px at ' +
                        cameraX + 'px ' + cameraY + 'px)';

    var transformStr = 'translate(' + (width - cameraX) + 'px, ' + (height - cameraY) + 'px)';
    $("#videoElement").css({'clip-path': newClipPath, 'transform': transformStr});  
}

function moveContainer(containerX, containerY) {
    
    $("#videoContainer").css({'left': containerX + 'px', 'top': containerY + 'px'});  

}