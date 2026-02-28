let level = 1, stp = 0, isMuted = false;
const music = document.getElementById('bgMusic');

// 1. Splash & Logo Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if(splash) splash.style.display = 'none';
    }, 2500);
});

const logoBtn = document.getElementById('logoBtn');
const logoModal = document.getElementById('logoModal');
if(logoBtn) {
    logoBtn.onclick = () => logoModal.style.display = "flex";
}
document.querySelector('.close-modal').onclick = () => logoModal.style.display = "none";

// 2. Sound Control
function toggleSound() {
    isMuted = !isMuted;
    const btn = document.getElementById('soundBtn');
    if(isMuted) {
        music.pause();
        btn.innerText = "🔇 OFF";
    } else {
        music.play();
        btn.innerText = "🔊 ON";
    }
}

// 3. Game Launcher
function openGame(type) {
    document.getElementById('gameOverlay').classList.remove('hidden');
    const area = document.getElementById('gameArea');
    area.innerHTML = '';
    stp = 0; 
    updateStats();

    // Auto-Play music jab game shuru ho
    if(!isMuted) {
        music.currentTime = 0;
        music.play().catch(e => console.log("User interaction required"));
    }

    // Load Games
    if(type === 'ttt') initTTT(area);
    if(type === 'snake') initSnake(area);
    if(type === 'riddle') initRiddle(area);
}

function updateStats() {
    document.getElementById('lvl').innerText = level;
    document.getElementById('stp').innerText = stp;
}

function closeGame() {
    document.getElementById('gameOverlay').classList.add('hidden');
    music.pause();
}

// --- SNAKE GAME LOGIC ---
function initSnake(parent) {
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 300;
    parent.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1, dy = 0;
    let speed = 160 - (level * 10); 

    const gameLoop = setInterval(() => {
        ctx.clearRect(0, 0, 300, 300);
        ctx.fillStyle = "#2ecc71"; // Snake
        snake.forEach(p => ctx.fillRect(p.x*10, p.y*10, 9, 9));
        
        ctx.fillStyle = "red"; // Food
        ctx.fillRect(food.x*10, food.y*10, 9, 9);
        
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if(head.x === food.x && head.y === food.y) {
            food = {x: Math.floor(Math.random()*29), y: Math.floor(Math.random()*29)};
            stp++; updateStats();
            if(stp >= 10) { clearInterval(gameLoop); triggerWin(); }
        } else {
            snake.pop();
        }

        if(head.x < 0 || head.x > 29 || head.y < 0 || head.y > 29) {
            clearInterval(gameLoop);
            triggerLoss();
        }
    }, speed);

    window.onkeydown = (e) => {
        if(e.key === "ArrowUp" && dy===0) { dx=0; dy=-1; }
        if(e.key === "ArrowDown" && dy===0) { dx=0; dy=1; }
        if(e.key === "ArrowLeft" && dx===0) { dx=-1; dy=0; }
        if(e.key === "ArrowRight" && dx===0) { dx=1; dy=0; }
    };
}

// --- RESULTS ---
function triggerWin() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    showResult("WINNER", "#d4af37");
    if(level < 10) level++;
}

function triggerLoss() {
    showResult("LOSER", "#ff4d4d");
}

function showResult(txt, color) {
    const ov = document.getElementById('resOverlay');
    const t = document.getElementById('resText');
    ov.classList.remove('hidden');
    t.innerText = txt; t.style.color = color;
    setTimeout(() => {
        ov.classList.add('hidden');
        closeGame();
    }, 3000);
}

document.getElementById('exitBtn').onclick = closeGame;
