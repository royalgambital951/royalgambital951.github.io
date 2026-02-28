let level = 1, stp = 0, isMuted = false;
const music = document.getElementById('bgMusic');

// Splash logic
window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('splash').style.display = 'none'; }, 2000);
});

// Logo zoom
document.getElementById('logoBtn').onclick = () => document.getElementById('logoModal').style.display = 'flex';
document.querySelector('.close-modal').onclick = () => document.getElementById('logoModal').style.display = 'none';

// Sound
function toggleSound() {
    isMuted = !isMuted;
    const btn = document.getElementById('soundBtn');
    if(isMuted) { music.pause(); btn.innerText = "🔇 OFF"; }
    else { music.play(); btn.innerText = "🔊 ON"; }
}

// Launcher
function openGame(type) {
    const overlay = document.getElementById('gameOverlay');
    const area = document.getElementById('gameArea');
    overlay.classList.remove('hidden');
    area.innerHTML = '';
    stp = 0; updateStats();

    if(!isMuted) music.play();

    if(type === 'ttt') initTTT(area);
    if(type === 'snake') initSnake(area);
}

// Tic-Tac-Toe
function initTTT(parent) {
    let board = ["","","","","","","","",""];
    const grid = document.createElement('div');
    grid.className = 'ttt-grid';
    for(let i=0; i<9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.onclick = () => {
            if(board[i] === "") {
                board[i] = "X"; cell.innerText = "X";
                if(!checkWin(board)) setTimeout(() => aiMove(board, grid), 500);
            }
        };
        grid.appendChild(cell);
    }
    parent.appendChild(grid);
}

function aiMove(board, grid) {
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if(empty.length > 0) {
        let move = empty[Math.floor(Math.random() * empty.length)];
        board[move] = "O";
        grid.children[move].innerText = "O";
        checkWin(board);
    }
}

function checkWin(board) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let p of wins) {
        if(board[p[0]] && board[p[0]]==board[p[1]] && board[p[0]]==board[p[2]]) {
            triggerWin(); return true;
        }
    }
    return false;
}

function triggerWin() {
    confetti({ particleCount: 150, spread: 70 });
    document.getElementById('resOverlay').classList.remove('hidden');
    document.getElementById('resText').innerText = "WINNER";
    setTimeout(() => {
        document.getElementById('resOverlay').classList.add('hidden');
        closeGame();
    }, 3000);
}

function closeGame() {
    document.getElementById('gameOverlay').classList.add('hidden');
    music.pause();
}

document.getElementById('exitBtn').onclick = closeGame;
function updateStats() {
    document.getElementById('lvl').innerText = level;
    document.getElementById('stp').innerText = stp;
}
