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
