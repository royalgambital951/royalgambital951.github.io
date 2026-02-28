document.addEventListener("DOMContentLoaded", function(){

/* Splash */
setTimeout(()=>{
    document.getElementById("splash").style.display="none";
},2000);

/* Menu */
document.getElementById("menuBtn").onclick = function(){
    let menu = document.getElementById("sideMenu");
    menu.style.left = (menu.style.left==="0px") ? "-250px":"0px";
};

/* Logo Modal */
document.getElementById("logoClick").onclick = function(){
    document.getElementById("logoModal").style.display="flex";
};
document.getElementById("logoModal").onclick = function(){
    this.style.display="none";
};

});

/* Open Game */
function openGame(game){

document.getElementById("home").style.display="none";
document.getElementById("gameSection").style.display="block";

let area = document.getElementById("gameArea");

if(game==="tictactoe"){
area.innerHTML = `
<h2>Tic Tac Toe</h2>
<div id="board"></div>
<button onclick="restartTic()">Restart</button>
`;
createBoard();
}

if(game==="snake"){
area.innerHTML = `
<h2>Snake Game</h2>
<p>Snake simple demo running...</p>
`;
}

if(game==="memory"){
area.innerHTML = `
<h2>Memory Game</h2>
<p>Memory game demo running...</p>
`;
}

}

/* Close Game */
function closeGame(){
document.getElementById("gameSection").style.display="none";
document.getElementById("home").style.display="block";
}

/* Tic Tac Toe */
let cells = [];
let current="X";

function createBoard(){
let board=document.getElementById("board");
board.innerHTML="";
cells=[];
for(let i=0;i<9;i++){
let cell=document.createElement("div");
cell.style.width="80px";
cell.style.height="80px";
cell.style.border="1px solid black";
cell.style.display="inline-flex";
cell.style.justifyContent="center";
cell.style.alignItems="center";
cell.style.fontSize="30px";
cell.onclick=function(){
if(cell.innerHTML===""){
cell.innerHTML=current;
current=(current==="X")?"O":"X";
}
};
board.appendChild(cell);
cells.push(cell);
}
}

function restartTic(){
current="X";
createBoard();
}
