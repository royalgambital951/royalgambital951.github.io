// --- Global State ---
let currentLevel = 1;
let timerInterval;
let seconds = 0;
let steps = 0;
let isSoundOn = true;

// --- DOM Elements ---
const splash = document.getElementById('splash-screen');
const logo = document.getElementById('main-logo');
const logoModal = document.getElementById('logo-modal');
const gameOverlay = document.getElementById('game-overlay');

// --- Initialization ---
window.addEventListener('load', () => {
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => splash.classList.add('hidden'), 1000);
    }, 2500);
});

// --- Logo Interaction ---
logo.onclick = () => logoModal.style.display = "flex";
document.querySelector('.close-modal').onclick = () => logoModal.style.display = "none";

// --- Game Logic Engine ---
function startGame(gameType) {
    gameOverlay.classList.remove('hidden');
    resetStats();
    startTimer();
    
    const container = document.getElementById('game-canvas-container');
    container.innerHTML = ''; // Clear previous

    if (gameType === 'tic-tac-toe') initTicTacToe(container);
    if (gameType === 'snake') initSnake(container);
}

function resetStats() {
    seconds = 0;
    steps = 0;
    document.getElementById('timer').innerText = "00:00";
    document.getElementById('steps').innerText = "0";
    document.getElementById('lvl-display').innerText = currentLevel;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        let m = Math.floor(seconds / 60).toString().padStart(2, '0');
        let s = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer').innerText = `${m}:${s}`;
    }, 1000);
}

// --- Tic-Tac-Toe (Smart AI) ---
function initTicTacToe(parent) {
    const grid = document.createElement('div');
    grid.className = 'ttt-grid';
    let board = ["", "", "", "", "", "", "", "", ""];
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.onclick = () => {
            if (board[i] === "") {
                board[i] = "X";
                cell.innerText = "X";
                steps++;
                document.getElementById('steps').innerText = steps;
                if (!checkWinner(board)) aiMove(board);
            }
        };
        grid.appendChild(cell);
    }
    parent.appendChild(grid);
}

function aiMove(board) {
    // Basic AI Intelligence: Picks first available (Level 1-5) 
    // At higher levels, it blocks the user (Logic would expand here)
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (empty.length > 0) {
        let move = empty[Math.floor(Math.random() * empty.length)];
        board[move] = "O";
        document.querySelectorAll('.ttt-cell')[move].innerText = "O";
        checkWinner(board);
    }
}

// --- Victory / Result Handling ---
function triggerWin() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    const res = document.getElementById('result-overlay');
    const txt = document.getElementById('result-text');
    res.classList.remove('hidden');
    txt.innerText = "WINNER";
    txt.style.color = "#d4af37";

    setTimeout(() => {
        res.classList.add('hidden');
        if (currentLevel < 10) currentLevel++;
    }, 3000);
}

function checkWinner(board) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]
    ];
    for (let p of winPatterns) {
        if (board[p[0]] && board[p[0]] === board[p[1]] && board[p[0]] === board[p[2]]) {
            triggerWin();
            return true;
        }
    }
    return false;
}

// Close Game
document.getElementById('exit-game').onclick = () => {
    gameOverlay.classList.add('hidden');
    clearInterval(timerInterval);
};
