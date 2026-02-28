let currentLevel = 1;
let isSoundOn = true;
const bgMusic = document.getElementById('bgAudio');

// --- Splash & Logo ---
window.onload = () => {
    setTimeout(() => { document.getElementById('splash-screen').classList.add('hidden'); }, 2500);
};

const logo = document.getElementById('main-logo');
logo.onclick = () => {
    document.getElementById('logo-modal').style.display = "flex";
    document.querySelector('.container').style.filter = "blur(15px)";
};

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('logo-modal').style.display = "none";
    document.querySelector('.container').style.filter = "none";
};

// --- Sound Controls ---
function toggleSound() {
    isSoundOn = !isSoundOn;
    const btn = document.getElementById('sound-btn');
    if (isSoundOn) {
        btn.innerText = "🔊 Music: ON";
        if (!document.getElementById('game-overlay').classList.contains('hidden')) bgMusic.play();
    } else {
        btn.innerText = "🔇 Music: OFF";
        bgMusic.pause();
    }
}

// --- Game Engine ---
function startGame(type) {
    document.getElementById('game-overlay').classList.remove('hidden');
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    
    // Play Music on Start
    if (isSoundOn) {
        bgMusic.currentTime = 0; 
        bgMusic.play().catch(e => console.log("User interaction required for audio"));
    }

    if (type === 'ttt') initTTT(container);
    if (type === 'snake') initSnake(container);
    if (type === 'riddle') initRiddle(container);
}

// Exit Game and Stop Music
document.getElementById('exit-game').onclick = () => {
    document.getElementById('game-overlay').classList.add('hidden');
    bgMusic.pause();
};

// --- Tic-Tac-Toe AI ---
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
                if(!checkWin(board)) setTimeout(() => aiMove(board), 500);
            }
        };
        grid.appendChild(cell);
    }
    parent.appendChild(grid);
}

function aiMove(board) {
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if(empty.length > 0) {
        let move = empty[Math.floor(Math.random() * empty.length)];
        board[move] = "O";
        document.querySelectorAll('.ttt-cell')[move].innerText = "O";
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

// --- Victory ---
function triggerWin() {
    confetti({ particleCount: 150, spread: 70 });
    const res = document.getElementById('result-overlay');
    res.classList.remove('hidden');
    document.getElementById('result-text').innerText = "WINNER";
    setTimeout(() => {
        res.classList.add('hidden');
        document.getElementById('game-overlay').classList.add('hidden');
        bgMusic.pause();
        if(currentLevel < 10) currentLevel++;
    }, 3000);
}
