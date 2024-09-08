
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let player = { x: 50, y: canvas.height - 150, width: 50, height: 50, dy: 0, gravity: 1.5, jumpForce: -20 };
let obstacles = [];
let score = 0;
let level = 1;
let isGameOver = false;
let isGameStarted = false;
let ate = false;
let obstacleInterval = 2000;
let lastObstacleTime = Date.now();
const catImage = new Image();
catImage.src = '../assets/cat.png'; // Path to the cat image file
const bossImage = new Image();
bossImage.src = '../assets/fish-boss.png';
const food = new Image();
food.src = '../assets/food.png';

// Button properties for Start and Restart
const button = {
    x: canvas.width / 2 - 100,
    y: canvas.height / 2 - 25,
    width: 230,
    height: 50,
    text: "Start Game"
};
const quitButton = {
    x: canvas.width / 2 - 100,
    y: canvas.height / 2 + 50,
    width: 230,
    height: 50,
    text: "Quit Game"
};

// Player jump handler
function jump() {
    if (player.y === canvas.height - player.height) {
        player.dy = player.jumpForce;
    }
}

document.addEventListener('keydown', (e) => {
    if (isGameStarted && !isGameOver && (e.code === 'Space' || e.code === 'ArrowUp')) {
        jump();
    }
    if (isGameStarted && !isGameOver && e.code === 'ArrowLeft') {
        if (player.x >= 0) {
            player.x -= 10;
        }
    }
    if (isGameStarted && !isGameOver && e.code === 'ArrowRight') {
        player.x += 10;
    }

});


// Start or Restart button click handler
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if click is inside the button when game is not started or game over
    if ((isGameOver || !isGameStarted) &&
        clickX >= button.x && clickX <= button.x + button.width &&
        clickY >= button.y && clickY <= button.y + button.height) {
        resetGame();  // Restart or Start the game
    }
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if ((isGameOver || !isGameStarted) &&
        clickX >= quitButton.x && clickX <= quitButton.x + quitButton.width &&
        clickY >= quitButton.y && clickY <= quitButton.y + quitButton.height) {
        quitGame();
    }
});

// Update game state
function update() {
    if (isGameOver || !isGameStarted) return;

    // Apply gravity
    player.dy += player.gravity;
    player.y += player.dy;
    player.x = player.x;

    // Prevent player from falling below ground
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    // Handle obstacles
    if (Date.now() - lastObstacleTime > obstacleInterval) {
        obstacles.push({ x: canvas.width, y: canvas.height - 50, width: 70, height: 70 });
        lastObstacleTime = Date.now();
    }

    obstacles.forEach((obstacle, index) => {

        // if (score >= 500) {
        //     level = score / ;
        // }
        // obstacle.x -= 10 * Math.floor(level);
        obstacle.x -= 10;



        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }
        if (obstacle.x - 700 + obstacle.width < 0) {
            ate = false;
        }

        // Collision detection
        if (player.x < obstacle.x - 700 + (obstacle.width) &&
            player.x + (player.width) > obstacle.x - 700 &&
            player.y < obstacle.y - 150 + obstacle.height &&
            player.y + player.height > obstacle.y - 150) {
            score += 10;
            ate = true;
        }

        // Collision detection
        if (player.x < obstacle.x + (obstacle.width) &&
            player.x + (player.width) > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            isGameOver = true;
            alert('Game Over! Final Score: ' + score);
            button.text = "Restart Game";  // Change button text to "Restart"
        }
    });

    // Increase score
    score += 1;
}

// Draw Start or Restart button
function drawButton() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(button.x, button.y, button.width, button.height);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(button.text, button.x + 25, button.y + 35);
}
function drawQuitButton() {
    ctx.fillStyle = 'red';
    ctx.fillRect(quitButton.x, quitButton.y, quitButton.width, quitButton.height);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(quitButton.text, quitButton.x + 35, quitButton.y + 35);
}
function drawCat(x, y) {

    ctx.drawImage(catImage, x, y, 120, 100); // Adjust the width and height as needed
}
// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameStarted || isGameOver) {
        drawButton();
        if (isGameOver) {
            drawQuitButton();
        }
        return;
    }

    drawCat(player.x, player.y - 50);
    // Draw player
    // ctx.fillStyle = 'white';
    // ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    obstacles.forEach((obstacle) => {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.drawImage(bossImage, obstacle.x, obstacle.y - 20, obstacle.width, obstacle.height);
        if (ate == false) {
            ctx.drawImage(food, obstacle.x - 700, obstacle.y - 150, obstacle.width, obstacle.height);
        }
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + score, 20, 50);
}

// Reset the game state for restart
function resetGame() {
    player = { x: 50, y: canvas.height - 150, width: 50, height: 50, dy: 0, gravity: 1.5, jumpForce: -20 };
    obstacles = [];
    score = 0;
    level = 1;
    isGameOver = false;
    isGameStarted = true;
    lastObstacleTime = Date.now();
}

function quitGame() {
    resetGame();
    window.location.href = "../index.html"
}

// Main game loop
function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
