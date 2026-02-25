4let board = null
let game = new Chess()
let engine = STOCKFISH()
let depth = 5

setTimeout(()=>{
document.getElementById("splash").style.display="none";
},2000)

document.getElementById("modeToggle").addEventListener("change",function(){
document.body.classList.toggle("light")
})

function startGame(d){
depth = d
document.querySelector(".menu").style.display="none"
document.getElementById("gameArea").style.display="block"

board = Chessboard('board', {
draggable: true,
position: 'start',
onDrop: onDrop
})
}

function onDrop(source, target) {
let move = game.move({
from: source,
to: target,
promotion: 'q'
})

if (move === null) return 'snapback'

engine.postMessage("position fen " + game.fen())
engine.postMessage("go depth " + depth)

engine.onmessage = function(event) {
if (event.data.includes("bestmove")) {
let bestMove = event.data.split(" ")[1]
game.move({
from: bestMove.substring(0,2),
to: bestMove.substring(2,4),
promotion: 'q'
})
board.position(game.fen())

if(game.game_over()){
confetti()
alert("YOU WIN 👑")
}
}
}
}

function restartGame(){
location.reload()
}
● Commit directly to the main branch
