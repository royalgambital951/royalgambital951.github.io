// ================= TIC TAC TOE =================

const board = document.getElementById("board");

if (board !== null) {

  const statusText = document.getElementById("status");
  let currentPlayer = "X";
  let gameActive = true;
  let cells = [];

  function createBoard() {
    board.innerHTML = "";
    cells = Array(9).fill("");

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => handleClick(cell, i));
      board.appendChild(cell);
    }
  }

  function handleClick(cell, index) {
    if (!gameActive || cells[index] !== "") return;

    cells[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = currentPlayer + " Wins!";
      gameActive = false;
      return;
    }

    if (!cells.includes("")) {
      statusText.textContent = "Draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    const patterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return patterns.some(p =>
      p.every(i => cells[i] === currentPlayer)
    );
  }

  window.restartGame = function() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "";
    createBoard();
  };

  createBoard();
}


// ================= SNAKE GAME =================

const canvas = document.getElementById("gameCanvas");

if (canvas !== null) {

  const ctx = canvas.getContext("2d");
  const box = 20;
  let snake = [{x: 9 * box, y: 10 * box}];
  let direction = nul;

  let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
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
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
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
