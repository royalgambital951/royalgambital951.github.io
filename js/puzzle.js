let puzzle=document.getElementById("puzzle");
let moves=0;
let time=0;

puzzle.style.display="grid";
puzzle.style.gridTemplateColumns="repeat(3,100px)";
puzzle.style.gap="5px";
puzzle.style.justifyContent="center";

for(let i=1;i<=9;i++){
let box=document.createElement("div");
box.innerText=i;
box.style.height="100px";
box.style.display="flex";
box.style.alignItems="center";
box.style.justifyContent="center";
box.style.border="1px solid #ccc";
box.onclick=()=>{
moves++;
document.getElementById("steps").innerText="Moves: "+moves;
};
puzzle.appendChild(box);
}

setInterval(()=>{
time++;
document.getElementById("timer").innerText="Time: "+time;
},1000);

function restart(){location.reload();}
