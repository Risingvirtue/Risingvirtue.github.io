var numRows = 20;
var grid = [];
var date = new Date();
for (var i = 0; i < numRows; i++) {
    var row = [];
    for (var j = 0; j < numRows; j++) {
        row.push(false);
    }
    grid.push(row);
}

window.onload = function() {
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    canvas.addEventListener("mousedown", function(e)
    {
        registerClick(canvas, e)
    });
    
    var width = $('#canvasContainer').width();
    canvas.width = width;
    canvas.height = width;
    drawBoard(width);
    //updateCell(2, 2, true);
    //updateCell(2,2, false);
}
function registerClick(canvas, event) {
   var rect = canvas.getBoundingClientRect();
   var xCoord = event.clientX - rect.left;
   var yCoord = event.clientY - rect.top;
   var col = Math.floor(xCoord / (canvas.width / numRows));
   var row = Math.floor(yCoord / (canvas.width / numRows));

   grid[row][col] = !grid[row][col];
   updateCell(row, col, grid[row][col]); 
}



function drawBoard(width){
    var canvas = document.getElementById("canvas");
    
    var context = canvas.getContext("2d");
    var bw = canvas.width;
    // Box height
    var bh = canvas.height;
    context.beginPath();
    context.rect(0,0, bw, bh);
    context.fillStyle = "black";
    context.fill();
    for (var x = 0; x <= bw; x += bw / numRows) {
        context.moveTo(x, 0);
        context.lineTo(x, bh);
    }

    for (var x = 0; x <= bh; x += bh / numRows) {
        context.moveTo(0, x);
        context.lineTo(bw,  x);
    }
    context.strokeStyle = "white";
    context.stroke();
}

function updateCell(row, col, fill) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    
    var cellWidth = canvas.width / numRows;

    context.rect(col * cellWidth + 1, row * cellWidth + 1, cellWidth - 2, cellWidth - 2);
    if (fill) {
       context.fillStyle = "white"; 
    } else {
       context.fillStyle = "black";
    }
    
    context.fill();
}
function random() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var rand = Math.random();
            if (rand < 0.2) {
                if (!grid[i][j]) {
                    grid[i][j] = true;
                    updateCell(i, j, true);
                }
                
            } else {
                if (grid[i][j]) {
                    grid[i][j] = false;
                    updateCell(i, j, false);
                }
            }
        }
    }
    
}
function start() {
    var now = new Date();
    var speed = $('#speed').val() || 100;
    
    if (now - date > speed) {
        date = now;
        var changed = updateGrid();
        if (changed) {
            window.requestAnimationFrame(start);
        }
    } else {
        window.requestAnimationFrame(start);
    }
    
}


function updateGrid() {
    var changed = [];
    var newGrid = [];
    for (var i = 0; i < grid.length; i++) {
        var arr = [];
        for (var j = 0; j < grid[i].length; j++) {
            var liveNeighbors = getLiveNeighbors(grid, i, j);
            if (grid[i][j]) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    arr.push(false);
                    changed.push({row: i, col: j, fill: false})
                } else {
                    arr.push(true);
                }
            } else {
                if (liveNeighbors == 3) {
                    arr.push(true);
                    changed.push({row: i, col: j, fill: true})
                } else {
                    arr.push(false);
                }
            }
        }
        newGrid.push(arr);
    }
    grid = newGrid;
    //update changed
    for (var i = 0; i < changed.length; i++) {
        updateCell(changed[i].row, changed[i].col, changed[i].fill);
    }
    return changed.length != 0;
}

function getLiveNeighbors(grid, row, col) {
    var liveNeighbors = 0;
    var coordinates = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
    for (var i = 0; i < coordinates.length; i++) {
        var coordinate = coordinates[i];
        var isValid = true;
        if (row + coordinate[0] < 0 || row + coordinate[0] >= grid.length) {
            isValid = false;
        }
        if (col + coordinate[1] < 0 || col + coordinate[1] >= grid[0].length) {
            isValid = false;
        }
        
        if (isValid && grid[row + coordinate[0]][col + coordinate[1]]) {
            liveNeighbors += 1;
        }
       
    }
    return liveNeighbors;
}



drawBoard();