// MOBILE MENU
function toggleMenu(){
document.getElementById("nav").classList.toggle("active");
}

// SHOW GAME
function showGame(id){
document.querySelectorAll('.game-section')
.forEach(sec=>sec.style.display="none");
document.getElementById(id).style.display="block";
}

// ================= SLIDING PUZZLE =================

let tiles=[],emptyIndex=8,moves=0,timer,seconds=0;

function initPuzzle(){
tiles=[1,2,3,4,5,6,7,8,""];
moves=0; seconds=0;
document.getElementById("moves").innerText=0;
document.getElementById("time").innerText=0;
shuffle();
renderPuzzle();
clearInterval(timer);
timer=setInterval(()=>{
seconds++;
document.getElementById("time").innerText=seconds;
},1000);
}

function shuffle(){
for(let i=tiles.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1));
[tiles[i],tiles[j]]=[tiles[j],tiles[i]];
}
emptyIndex=tiles.indexOf("");
}

function renderPuzzle(){
const grid=document.getElementById("grid");
grid.innerHTML="";
tiles.forEach((tile,index)=>{
const div=document.createElement("div");
div.className="tile";
if(tile!==""){
div.innerText=tile;
div.onclick=()=>moveTile(index);
}
grid.appendChild(div);
});
}

function moveTile(index){
let row=Math.floor(emptyIndex/3);
let col=emptyIndex%3;
let targetRow=Math.floor(index/3);
let targetCol=index%3;

if((row===targetRow && Math.abs(col-targetCol)===1) ||
   (col===targetCol && Math.abs(row-targetRow)===1)){
[tiles[index],tiles[emptyIndex]]=[tiles[emptyIndex],tiles[index]];
emptyIndex=index;
moves++;
document.getElementById("moves").innerText=moves;
renderPuzzle();
}
}

// ================= MEMORY GAME =================

let memoryValues=[],flipped=[];

function startMemory(){
memoryValues=[1,1,2,2,3,3,4,4];
memoryValues.sort(()=>0.5-Math.random());
const grid=document.getElementById("memoryGrid");
grid.innerHTML="";
flipped=[];
memoryValues.forEach(val=>{
let div=document.createElement("div");
div.className="tile";
div.onclick=()=>flip(div,val);
grid.appendChild(div);
});
}

function flip(div,val){
if(div.innerText!=="") return;
div.innerText=val;
flipped.push({div,val});
if(flipped.length===2){
if(flipped[0].val!==flipped[1].val){
setTimeout(()=>{
flipped[0].div.innerText="";
flipped[1].div.innerText="";
flipped=[];
},600);
}else{
flipped=[];
}
}
}

// ================= TIC TAC TOE =================

let tttBoard=["","","","","","","","",""],turn="X";

function resetTTT(){
tttBoard=["","","","","","","","",""];
turn="X";
renderTTT();
document.getElementById("tttStatus").innerText="";
}

function renderTTT(){
const grid=document.getElementById("ttt");
grid.innerHTML="";
tttBoard.forEach((val,i)=>{
let div=document.createElement("div");
div.className="tile";
div.innerText=val;
div.onclick=()=>playTTT(i);
grid.appendChild(div);
});
}

function playTTT(i){
if(tttBoard[i]!=="") return;
tttBoard[i]=turn;
if(checkWinner()){
document.getElementById("tttStatus").innerText=turn+" Wins!";
return;
}
turn=turn==="X"?"O":"X";
renderTTT();
}

function checkWinner(){
const wins=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];
return wins.some(combo=>{
let[a,b,c]=combo;
return tttBoard[a] &&
tttBoard[a]===tttBoard[b] &&
tttBoard[a]===tttBoard[c];
});
}

// INITIAL LOAD
initPuzzle();
startMemory();
resetTTT();
