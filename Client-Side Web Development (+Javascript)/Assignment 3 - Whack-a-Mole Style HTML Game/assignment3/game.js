// Created by Yaatu Adem (301294492) for COMP125 Winter 2023 Semester

// To create the canvas
var canvas = document.createElement("canvas");
canvas.id = 'canvas';
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
var container = document.getElementById("game");
container.appendChild(canvas);

// Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "grass.png";

// Cow Image
var cowReady = false;
var cowImage = new Image();
cowImage.onload = function () {
    cowReady = true;
}
cowImage.src = "cow.png";

// Game Objects/Components
var cow = {
    x: 0,
    y: 0
};
var cowsCaught = 0;
var interval = 2000;


// Places the cow in a new position on the screen
function newSpot() {
	cow.x = (Math.random() * (canvas.width - 148));
	cow.y = (Math.random() * (canvas.height - 148));
};

// Event Listener for when the canvas is clicked
canvas.addEventListener("click", function (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    // calculates whether or not the player clicked on the cow based on the coordinates
    if (cow.x < x &&
        (cow.x + 100) > x &&
        cow.y < y &&
        (cow.y + 74) > y) {
            ++cowsCaught; // increments score
            newSpot(); //resets cow's spot
            clearInterval(gameInterval);
            interval = interval - 50;
            gameInterval = setInterval(newSpot, interval); //makes the interval between movements faster
    } 
});

// Event Listener for when the 'reset speed' button is clicked
document.getElementById('resetSpeed').addEventListener("click", function (e) {
    clearInterval(gameInterval);
    interval = 2000;
    gameInterval = setInterval(newSpot, interval);
});

// Event Listener for when the 'reset score' button is clicked
document.getElementById('resetScore').addEventListener("click", function (e) {
    clearInterval(gameInterval);
    interval = 2000;
    gameInterval = setInterval(newSpot, interval);
    cowsCaught = 0;
});


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (cowReady) {
		ctx.drawImage(cowImage, cow.x, cow.y);
	}

    document.getElementById("score").innerHTML = 'Score: ' + cowsCaught;
};

// The main game loop
var main = function () {
	var now = Date.now();
	render();

	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Starts the game
var then = Date.now();
newSpot();
main();
let gameInterval = setInterval(newSpot, interval);