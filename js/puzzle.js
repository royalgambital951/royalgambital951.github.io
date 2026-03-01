let puzzle=document.getElementById("puzzle");
let steps=0,time=0;

puzzle.style.display="grid";
puzzle.style.gridTemplateColumns="repeat(3,100px)";
puzzle.style.gap="5px";
puzzle.style.justifyContent="center";

let numbers=[1,2,3,4,5,6,7,8,""];
numbers.sort(()=>Math.random()-0.5);

numbers.forEach(n=>{
let div=document.createElement("div");
div.innerText=n;
div.style.height="100px";
div.style.background="white";
div.style.display="flex";
div.style.alignItems="center";
div.style.justifyContent="center";
div.style.fontSize="25px";
div.onclick=()=>move(div);
puzzle.appendChild(div);
});

function move(div){
steps++;
document.getElementById("steps").innerText="Steps: "+steps;
}

setInterval(()=>{
time++;
document.getElementById("timer").innerText="Time: "+time;
},1000);

function restart(){location.reload();}
