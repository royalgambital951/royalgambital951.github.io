const board=document.getElementById("board");
let cells=["","","","","","","","",""];
let player="X";

function render(){
board.innerHTML="";
cells.forEach((val,i)=>{
let d=document.createElement("div");
d.style.height="100px";
d.style.display="flex";
d.style.justifyContent="center";
d.style.alignItems="center";
d.style.fontSize="40px";
d.style.background="white";
d.onclick=()=>move(i);
d.innerText=val;
board.appendChild(d);
});
}

function move(i){
if(cells[i]!="") return;
cells[i]="X";
addStep();
if(checkWin("X")){showWin("YOU WIN 🎉");return;}
aiMove();
render();
}

function aiMove(){
let best=-Infinity;
let moveIndex;
for(let i=0;i<9;i++){
if(cells[i]==""){
cells[i]="O";
let score=minimax(cells,0,false);
cells[i]="";
if(score>best){best=score;moveIndex=i;}
}
}
cells[moveIndex]="O";
if(checkWin("O")) showWin("YOU LOSE ❌");
}

function minimax(board,depth,isMax){
if(checkWin("O")) return 1;
if(checkWin("X")) return -1;
if(!board.includes("")) return 0;

if(isMax){
let best=-Infinity;
for(let i=0;i<9;i++){
if(board[i]==""){
board[i]="O";
best=Math.max(best,minimax(board,depth+1,false));
board[i]="";
}
}
return best;
}else{
let best=Infinity;
for(let i=0;i<9;i++){
if(board[i]==""){
board[i]="X";
best=Math.min(best,minimax(board,depth+1,true));
board[i]="";
}
}
return best;
}
}

function checkWin(p){
const winComb=[[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]];
return winComb.some(c=>c.every(i=>cells[i]==p));
}

board.style.display="grid";
board.style.gridTemplateColumns="repeat(3,100px)";
board.style.gap="5px";
render();
