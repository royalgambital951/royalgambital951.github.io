const board = document.getElementById("board");
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
    statusText.textContent = "Game Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
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
  gameActive = true;
  statusText.textContent = "";
  createBoard();
}

createBoard();
const quotes = [
  "Success is earned daily.",
  "Small steps lead to big results.",
  "Consistency beats talent.",
  "Think big, start small.",
  "Your future is created today."
];

function showDailyQuote() {
  const today = new Date().getDate();
  const quoteIndex = today % quotes.length;
  document.getElementById("dailyQuote").textContent = quotes[quoteIndex];
}

showDailyQuote();
