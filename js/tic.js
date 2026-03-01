let board = document.getElementById("board");
let cells=[];
let steps=0;
let time=0;

board.style.display="grid";
board.style.gridTemplateColumns="repeat(3,100px)";
board.style.gap="5px";
board.style.justifyContent="center";

for(let i=0;i<9;i++){
let cell=document.createElement("div");
cell.style.height="100px";
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
}
}

function restart(){
location.reload();
}

setInterval(()=>{
time++;
document.getElementById("timer").innerText="Time: "+time;
},1000);
