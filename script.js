// 1. Splash Screen & Confetti
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.transition = "opacity 0.5s";
        splash.style.opacity = "0";
        
        setTimeout(() => {
            splash.style.display = 'none';
            // Welcome Confetti
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            // Show Name Modal
            document.getElementById('name-modal').style.display = 'flex';
        }, 500);
    }, 2000);
});

// 2. Profile Logic
function saveName() {
    let name = document.getElementById('username-input').value;
    let letter = (name && name.trim() !== "") ? name.trim().charAt(0).toUpperCase() : "G";
    document.getElementById('profile-logo').innerText = letter;
    document.getElementById('name-modal').style.display = 'none';
    initBoard();
}

function startAsGuest() {
    document.getElementById('profile-logo').innerText = "G";
    document.getElementById('name-modal').style.display = 'none';
    initBoard();
}

// 3. Theme Toggle (Left=Light, Right=Dark)
let isDark = true;
function toggleTheme() {
    isDark = !isDark;
    document.body.className = isDark ? 'dark-mode' : 'light-mode';
    // Slider movement handle karne ke liye CSS class toggle kar sakte hain
}

// 4. Menu & Board Logic
function toggleLevels() {
    const levels = document.getElementById('difficulty-levels');
    levels.style.display = (levels.style.display === 'block') ? 'none' : 'block';
}

var board = null;
function initBoard() {
    // Check if board already exists to avoid errors
    if (board === null) {
        board = Chessboard('myBoard', {
            draggable: true,
            dropOffBoard: 'snapback',
            position: 'start'
        });
    }
}

function initGame(mode) {
    alert("Starting Game Mode: " + mode.toUpperCase());
    initBoard();
    // Computer Logic yahan add hogi
}
