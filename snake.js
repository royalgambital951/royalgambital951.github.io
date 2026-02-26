const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;

let snake = [];
snake[0] = { x: 200, y: 200 };

let direction = null;

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  if (direction === null) return; // 👈 Game auto start नहीं होगा

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // wall collision
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize
  ) {
    alert("Game Over!");
    document.location.reload();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

setInterval(draw, 150);
function setDirection(dir) {
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "UP" && direction !== "DOWN") direction = "UP";
  if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}
