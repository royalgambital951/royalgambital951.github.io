let board = document.getElementById("puzzle-board");
let tiles = [];
let moveCount = 0;
let time = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timer").innerText = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function createBoard() {
    board.innerHTML = "";
    tiles = [];
    moveCount = 0;
    time = 0;

    document.getElementById("moves").innerText = 0;
    document.getElementById("timer").innerText = 0;

    stopTimer();
    startTimer();

    for (let i = 1; i <= 8; i++) {
        tiles.push(i);
    }
    tiles.push("");

    renderBoard();
}

function renderBoard() {
    board.innerHTML = "";

    tiles.forEach((num, index) => {
        let tile = document.createElement("div");
        tile.className = "tile";
        tile.innerText = num;
        tile.addEventListener("click", () => moveTile(index));
        board.appendChild(tile);
    });
}

function moveTile(index) {
    let emptyIndex = tiles.indexOf("");

    let validMoves = [
        emptyIndex - 1,
        emptyIndex + 1,
        emptyIndex - 3,
        emptyIndex + 3
    ];

    if (validMoves.includes(index)) {
        [tiles[index], tiles[emptyIndex]] =
        [tiles[emptyIndex], tiles[index]];

        moveCount++;
        document.getElementById("moves").innerText = moveCount;

        renderBoard();
        checkWin();
    }
}

function shuffle() {
    tiles.sort(() => Math.random() - 0.5);
    moveCount = 0;
    time = 0;
    document.getElementById("moves").innerText = 0;
    document.getElementById("timer").innerText = 0;
}

function checkWin() {
    let win = true;

    for (let i = 0; i < 8; i++) {
        if (tiles[i] !== i + 1) {
            win = false;
            break;
        }
    }

    if (win) {
        stopTimer();
        setTimeout(() => {
            document.getElementById("win-message").style.display = "block";
        }, 200);
    }
}

createBoard();
