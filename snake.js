const canvas = document.getElementById("gameCanvas");

if (canvas) {

  const ctx = canvas.getContext("2d");
  const box = 20;

  let snake = [{x: 200, y: 200}];
  let direction = "RIGHT";

  let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  });

  function draw() {

    ctx.fillStyle = "#fdfcfb";
    ctx.fillRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "green" : "lightgreen";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
    } else {
      snake.pop();
    }

    if (
      snakeX < 0 || snakeY < 0 ||
      snakeX >= 400 || snakeY >= 400
    ) {
      clearInterval(game);
      alert("Game Over!");
    }

    snake.unshift({x: snakeX, y: snakeY});
  }

  let game = setInterval(draw, 120);
                      }
