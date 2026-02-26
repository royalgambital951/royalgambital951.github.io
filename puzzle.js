let board = document.getElementById("puzzle-board");
let tiles = [];

function createBoard() {
    board.innerHTML = "";
    tiles = [];

    for (let i = 1; i <= 8; i++) {
        tiles.push(i);
    }
    tiles.push("");

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
        updateBoard();
    }
}

function updateBoard() {
    let tileElements = document.querySelectorAll(".tile");
    tileElements.forEach((tile, index) => {
        tile.innerText = tiles[index];
    });
}

function shuffle() {
    tiles.sort(() => Math.random() - 0.5);
    updateBoard();
}

createBoard();
