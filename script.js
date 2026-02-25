let game;
let engine;
let level = "easy";

document.getElementById("modeToggle").addEventListener("change",function(){
document.body.classList.toggle("light");
});

setTimeout(()=>{
document.getElementById("splash").style.display="none";
},2000);

function startGame(lvl){
level = lvl;
document.getElementById("menu").style.display="none";
document.getElementById("gameArea").style.display="block";

game = new Chess();
engine = STOCKFISH();

engine.onmessage = function(event){
if(event.data.includes("bestmove")){
let move = event.data.split(" ")[1];
game.move(move);
}
};

playerMove();
}

function playerMove(){
document.onclick = function(){
if(game.game_over()) return;

let moves = game.moves();
let move = moves[Math.floor(Math.random()*moves.length)];
game.move(move);

engine.postMessage("position fen " + game.fen());

if(level==="easy") engine.postMessage("go depth 5");
if(level==="medium") engine.postMessage("go depth 10");
if(level==="hard") engine.postMessage("go depth 18");

if(game.game_over()){
confetti();
alert("YOU WIN 👑");
}
}
}

function restartGame(){
location.reload();
}
