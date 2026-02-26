const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let cells = [];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(cell, i));
    board.appendChild(cell);
    cells.push("");
  }
}

function handleClick(cell, index) {
  if (cells[index] !== "") return;
  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    statusText.textContent = currentPlayer + " Wins!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => cells[i] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = "X";
  statusText.textContent = "";
  createBoard();
}

createBoard();
