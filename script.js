// 1. Splash Control & Confetti
setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    
    // Welcome Confetti (Plastic Bochar)
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Logo hatne ke baad Name Modal dikhana
    document.getElementById('name-modal').style.display = 'flex';
}, 2000);

// 2. Name & Profile Logic
function saveName() {
    let name = document.getElementById('username-input').value;
    if(name) {
        let firstChar = name.match(/[a-zA-Z]/); // Pehla stylish letter
        let displayLetter = firstChar ? firstChar[0].toUpperCase() : name.charAt(0).toUpperCase();
        document.getElementById('profile-logo').innerText = displayLetter;
        document.getElementById('name-modal').style.display = 'none';
    }
}

function startAsGuest() {
    document.getElementById('profile-logo').innerText = "G";
    document.getElementById('name-modal').style.display = 'none';
}

// 3. Theme Switcher (Left=Light, Right=Dark)
let isDark = true;
function toggleTheme() {
    isDark = !isDark;
    const body = document.body;
    const dot = document.getElementById('switch-dot');
    
    if(isDark) {
        body.className = 'dark-mode';
    } else {
        body.className = 'light-mode';
    }
}

// 4. Game Modes
function showLevels() {
    document.getElementById('levels').classList.toggle('hidden');
}

function setGame(mode) {
    alert("Game Started: " + mode.toUpperCase());
    // Yahan Board Initialize hoga
    var board = Chessboard('board', 'start');
}

