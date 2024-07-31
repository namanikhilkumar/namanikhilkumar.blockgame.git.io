const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 50;
const BLOCK_JUMP_HEIGHT = 15;

const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_SPEED = 5;

let blockX = 50;
let blockY = canvas.height - BLOCK_HEIGHT;
let blockYChange = 0;

let obstacleX = canvas.width;
let obstacleY = canvas.height - OBSTACLE_HEIGHT;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        blockYChange = -BLOCK_JUMP_HEIGHT;
    }
    if (event.key === 'ArrowDown') {
        blockY = canvas.height - BLOCK_HEIGHT / 2;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        blockYChange = 0;
    }
    if (event.key === 'ArrowDown') {
        blockY = canvas.height - BLOCK_HEIGHT;
    }
});

function update() {
    blockY += blockYChange;
    blockY = Math.min(Math.max(blockY, canvas.height - BLOCK_HEIGHT), canvas.height - BLOCK_HEIGHT / 2);

    obstacleX -= OBSTACLE_SPEED;
    if (obstacleX < 0) {
        obstacleX = canvas.width;
        obstacleY = canvas.height - OBSTACLE_HEIGHT;
    }

    if (blockX < obstacleX + OBSTACLE_WIDTH &&
        blockX + BLOCK_WIDTH > obstacleX &&
        blockY < obstacleY + OBSTACLE_HEIGHT &&
        blockY + BLOCK_HEIGHT > obstacleY) {
        alert('Collision detected!');
        blockY = canvas.height - BLOCK_HEIGHT;
        obstacleX = canvas.width;
    }
}

function draw() {
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw block
    ctx.fillStyle = 'black';
    ctx.fillRect(blockX, blockY, BLOCK_WIDTH, BLOCK_HEIGHT);

    // Draw obstacle
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacleX, obstacleY, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
