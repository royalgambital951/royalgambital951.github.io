let board = document.getElementById("board");
let cells = [];
let current="X";
let steps=0;
let time=0;

board.style.display="grid";
board.style.gridTemplateColumns="repeat(3,100px)";
board.style.gap="5px";
board.style.justifyContent="center";

for(let i=0;i<9;i++){
let cell=document.createElement("div");
cell.style.width="100px";
cell.style.height="100px";
cell.style.background="white";
cell.style.display="flex";
cell.style.alignItems="center";
cell.style.justifyContent="center";
cell.style.fontSize="30px";
cell.style.cursor="pointer";
cell.onclick=()=>move(i);
board.appendChild(cell);
cells.push(cell);
}

function move(i){
if(cells[i].innerText==""){
cells[i].innerText="X";
steps++;
document.getElementById("steps").innerText="Steps: "+steps;
if(checkWin("X")){alert("You Win");confetti();return;}
aiMove();
}
}

function aiMove(){
let empty=cells.map((c,i)=>c.innerText==""?i:null).filter(v=>v!=null);
if(empty.length==0)return;
let random=empty[Math.floor(Math.random()*empty.length)];
cells[random].innerText="O";
if(checkWin("O")){alert("AI Wins");}
}

function checkWin(p){
let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
return win.some(c=>c.every(i=>cells[i].innerText==p));
}

function restart(){
location.reload();
}

setInterval(()=>{
time++;
document.getElementById("timer").innerText="Time: "+time;
},1000);

function confetti(){
alert("🎉 Congratulations!");
}
