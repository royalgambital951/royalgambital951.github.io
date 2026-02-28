let currentGame="";

/* Splash handled automatically */

function toggleMenu(){
document.getElementById("sidebar").classList.toggle("active");
}

function closeMenu(){
document.getElementById("sidebar").classList.remove("active");
}

function openGame(type){
currentGame=type;
document.getElementById("gameGrid").classList.add("hidden");
document.getElementById("gameArea").classList.remove("hidden");

if(type==="tic") startTic();
if(type==="snake") startSnake();
}

function goBack(){
document.getElementById("gameArea").classList.add("hidden");
document.getElementById("gameGrid").classList.remove("hidden");
}

function restartGame(){
if(currentGame==="tic") startTic();
if(currentGame==="snake") startSnake();
}

/* TicTacToe */
function startTic(){
let container=document.getElementById("gameContainer");
container.innerHTML="";
container.className="board";

let board=Array(9).fill("");
let player="X";

function check(){
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
for(let w of wins){
if(board[w[0]] && board[w[0]]===board[w[1]] && board[w[1]]===board[w[2]]){
alert(board[w[0]]+" Wins!");
startTic();
}
}
}

for(let i=0;i<9;i++){
let cell=document.createElement("div");
cell.className="cell";
cell.onclick=()=>{
if(board[i]==""){
board[i]=player;
cell.textContent=player;
check();
player=player==="X"?"O":"X";
}
};
container.appendChild(cell);
}
}

/* Snake */
function startSnake(){
let container=document.getElementById("gameContainer");
container.innerHTML="<canvas id='snakeCanvas' width='350' height='300'></canvas>";
let canvas=document.getElementById("snakeCanvas");
let ctx=canvas.getContext("2d");

let x=150,y=100,dx=2,dy=2;

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillRect(x,y,20,20);
x+=dx;
y+=dy;
if(x<=0||x>=canvas.width-20)dx=-dx;
if(y<=0||y>=canvas.height-20)dy=-dy;
requestAnimationFrame(draw);
}
draw();
}
