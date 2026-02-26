// 1. Typewriter Suvichar (💡 Effect)
function typeQuote(text) {
    let i = 0;
    let speed = 50;
    document.getElementById("quotes-box").innerHTML = "";
    function typing() {
        if (i < text.length) {
            document.getElementById("quotes-box").innerHTML += text.charAt(i);
            // Tik-Tik Sound Play here
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// 2. Winning Celebration
function onGameOver(winnerName, coinsEarned) {
    // King Shine Effect (CSS animation)
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.7 }
    });
    // Show Winner Modal
    alert(`Winner: ${winnerName} \n Coins Won: ${coinsEarned}`);
}

// 3. Admin Login Logic
function checkAdmin(user, pass) {
    if(user === "RONAK KUMAWAT" && pass === "30/11") {
        openAdminPanel();
    }
}

// 4. Board Hints (Direction)
function showPossibleMoves(square) {
    // Chess.js integration to show dots on board
    var moves = game.moves({ square: square, verbose: true });
    moves.forEach(m => {
        // Highlight square logic
    });
}
// User ke coins ka hisaab
let userCoins = 0;

// Coin jitne ka function
function winCoins(level) {
    let prize = 0;
    if (level === 'easy') prize = 10;
    else if (level === 'medium') prize = 20;
    else if (level === 'hard') prize = 50;
    
    userCoins += prize;
    document.getElementById('total-coins').innerText = userCoins; // UI update
    
    // Celebration Sound aur Confetti
    playWinningEffect();
}

// 3D Coin View Logic
function show3DCoin() {
    const coinElement = document.getElementById('main-coin');
    coinElement.classList.toggle('coin-rotate'); // Animation shuru/band karne ke liye
    
    // Background blur karna
    document.querySelector('main').style.filter = "blur(5px)";
    
    // 3 se 4 second baad wapas normal
    setTimeout(() => {
        document.querySelector('main').style.filter = "none";
        coinElement.classList.remove('coin-rotate');
    }, 4000);
}
