const board = document.getElementById("board");
let cells = Array(9).fill("");
let player = "X";

board.style.display="grid";
board.style.gridTemplateColumns="repeat(3,100px)";
board.style.gap="5px";

cells.forEach((_,i)=>{
  const div=document.createElement("div");
  div.style.height="100px";
  div.style.background="white";
  div.style.fontSize="40px";
  div.style.display="flex";
  div.style.justifyContent="center";
  div.style.alignItems="center";
  div.onclick=()=>move(i,div);
  board.appendChild(div);
});

function move(i,div){
  if(cells[i]!="") return;
  cells[i]=player;
  div.innerText=player;
  player="O";
  aiMove();
}

function aiMove(){
  for(let i=0;i<9;i++){
    if(cells[i]==""){
      cells[i]="O";
      board.children[i].innerText="O";
      player="X";
      break;
    }
  }
}

function reset(){
  location.reload();
}
