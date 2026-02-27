let tiles=[1,2,3,4,5,6,7,8,""];
let emptyIndex=8;
let seconds=0;
let timer;

function startSliding(){
shuffle();
render();
startTimer();
}

function shuffle(){
tiles.sort(()=>Math.random()-0.5);
emptyIndex=tiles.indexOf("");
}

function render(){
const grid=document.getElementById("grid");
grid.innerHTML="";
tiles.forEach((tile,i)=>{
const div=document.createElement("div");
div.className="tile";
div.innerText=tile;
div.onclick=()=>move(i);
grid.appendChild(div);
});
}

function move(i){
if(Math.abs(i-emptyIndex)===1 || Math.abs(i-emptyIndex)===3){
[tiles[i],tiles[emptyIndex]]=[tiles[emptyIndex],tiles[i]];
emptyIndex=i;
render();
}
}

function startTimer(){
seconds=0;
timer=setInterval(()=>{
seconds++;
document.getElementById("time").innerText=seconds;
},1000);
}

startSliding();
