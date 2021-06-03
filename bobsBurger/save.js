var hasBorder = true;
function save() {
    var link = document.getElementById('link');
    link.setAttribute('download', 'bobImage.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}
function paste() {
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    //var videoElement = document.getElementById("videoElement");
    //context.drawImage(videoElement, 0,0);
    context.save();
    context.beginPath();
    //15px to right because of bootstrap
    var shiftX = currentContainerCoordinates.x;
    var shiftY = currentContainerCoordinates.y + videoContainer.clientHeight / 2 + 1;
    var canvasX = canvas.getBoundingClientRect().left;
    var canvasY = canvas.getBoundingClientRect().top;
    console.log(currentContainerCoordinates, videoContainer.clientWidth / 2, videoContainer.clientHeight / 2);
    
    context.ellipse((shiftX - canvasX) + videoContainer.clientWidth / 2, shiftY - canvasY, 
                    videoContainer.clientWidth / 2, videoContainer.clientHeight / 2,
                    0, Math.PI * 2, false);
                    
    //context.stroke();
    context.closePath();
    context.clip();
    var width = videoContainer.clientWidth / 2;
    var height = videoContainer.clientHeight / 2;
    var videoRect = videoElement.getBoundingClientRect();
    var containerRect = videoContainer.getBoundingClientRect();
    var videoShiftX = videoRect.left - containerRect.left;
    var videoShiftY = videoRect.top - containerRect.top;
    context.drawImage(videoElement,
                        currentContainerCoordinates.x - canvasX + videoShiftX,
                        currentContainerCoordinates.y + videoShiftY, videoWidth * scale, videoHeight * scale
                        );
                        
    context.restore();
}

function toggleBorder() {
    if (hasBorder) {
        $("#videoContainer").css({'border': 'none'}); 

    } else {
        $("#videoContainer").css({'border': '1px solid black'}); 
    }

    hasBorder = !hasBorder;
}
function test (){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    context.save();
    context.beginPath();
    //15px to right because of bootstrap
    var shiftX = currentContainerCoordinates.x;
    var canvasX = canvas.getBoundingClientRect().left;
    context.ellipse((shiftX - canvasX) + videoContainer.clientWidth / 2, videoContainer.clientHeight / 2, 
                    videoContainer.clientWidth / 2, videoContainer.clientHeight / 2,
                    0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
    context.restore();
                    
}

function changeImage() {
    const image = new Image(); // Using optional size for image
    image.onload = drawImage; // Draw when image has loaded
    
    image.src = 'https://gentle-taiga-54820.herokuapp.com/' + $('#url').val();
    image.crossOrigin = "Anonymous";
}