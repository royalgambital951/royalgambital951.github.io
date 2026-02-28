let level = 1, stp = 0, isMuted = false;
const music = document.getElementById('bgMusic');

// 1. Splash & Logo Logic
window.onload = () => setTimeout(() => document.getElementById('splash').style.opacity = '0', 2000);
window.onload = () => setTimeout(() => document.getElementById('splash').style.display = 'none', 2800);

const logoBtn = document.getElementById('logoBtn');
const logoModal = document.getElementById('logoModal');
logoBtn.onclick = () => logoModal.style.display = "flex";
document.querySelector('.close-modal').onclick = () => logoModal.style.display = "none";

// 2. Sound Logic
function toggleSound() {
    isMuted = !isMuted;
    const btn = document.getElementById('soundBtn');
    if(isMuted) { music.pause(); btn.innerText = "🔇 OFF"; }
    else { music.play(); btn.innerText = "🔊 ON"; }
}

// 3. Game Launcher
function openGame(type) {
    document.getElementById('gameOverlay').classList.remove('hidden');
    const area = document.getElementById('gameArea');
    area.innerHTML = '';
    stp = 0; updateStats();
    if(!isMuted) music.play();

    if(type === 'ttt') initTTT(area);
    if(type === 'snake') initSnake(area);
}

function updateStats() {
    document.getElementById('lvl').innerText = level;
    document.getElementById('stp').innerText = stp;
}

// --- SNAKE GAME (CANVAS RUN) ---
function initSnake(parent) {
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 300;
    parent.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1, dy = 0;
    let speed = 150 - (level * 10); // Level ke sath speed badhegi

    function draw() {
        ctx.clearRect(0, 0, 300, 300);
        ctx.fillStyle = "#2ecc71"; // Snake color
        snake.forEach(p => ctx.fillRect(p.x*10, p.y*10, 9, 9));
        
        ctx.fillStyle = "red";
        ctx.fillRect(food.x*10, food.y*10, 9, 9);
        
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if(head.x === food.x && head.y === food.y) {
            food = {x: Math.floor(Math.random()*29), y: Math.floor(Math.random()*29)};
            stp++; updateStats();
            if(stp >= 10) triggerWin();
        } else {
            snake.pop();
        }

        if(head.x < 0 || head.x > 29 || head.y < 0 || head.y > 29) triggerLoss();
    }
    
    let loop = setInterval(draw, speed);
    window.onkeydown = (e) => {
        if(e.key === "ArrowUp" && dy===0) { dx=0; dy=-1; }
        if(e.key === "ArrowDown" && dy===0) { dx=0; dy=1; }
        if(e.key === "ArrowLeft" && dx===0) { dx=-1; dy=0; }
        if(e.key === "ArrowRight" && dx===0) { dx=1; dy=0; }
    };
}

// --- WIN / LOSS EFFECTS ---
function triggerWin() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    showResult("WINNER", "#2ecc71");
    if(level < 10) level++;
}

function triggerLoss() {
    showResult("LOSER", "#e74c3c");
}

function showResult(txt, color) {
    const ov = document.getElementById('resOverlay');
    const t = document.getElementById('resText');
    ov.classList.remove('hidden');
    t.innerText = txt; t.style.color = color;
    music.pause();
    setTimeout(() => {
        ov.classList.add('hidden');
        closeGame();
    }, 3000);
}

function closeGame() {
    document.getElementById('gameOverlay').classList.add('hidden');
    music.pause();
}

