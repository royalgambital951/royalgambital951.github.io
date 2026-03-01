let time=0;
let steps=0;
let timerInterval;
let music=new Audio("assets/music.mp3");
music.loop=true;

function startGame(){
timerInterval=setInterval(()=>{
time++;
let t=document.getElementById("timer");
if(t) t.innerText="Time: "+time+"s";
},1000);
music.play();
}

function addStep(){
steps++;
let s=document.getElementById("steps");
if(s) s.innerText="Steps: "+steps;
}

function toggleSound(){
music.paused?music.play():music.pause();
}

function stopGame(){
clearInterval(timerInterval);
}

function showWin(text){
stopGame();
let w=document.getElementById("winScreen");
w.style.display="flex";
w.innerHTML=text;
confettiBlast();
setTimeout(()=>{w.style.display="none";location.reload();},3000);
}

function confettiBlast(){
for(let i=0;i<100;i++){
let c=document.createElement("div");
c.className="confetti";
c.style.left=Math.random()*100+"vw";
c.style.background=`hsl(${Math.random()*360},100%,50%)`;
document.body.appendChild(c);
setTimeout(()=>c.remove(),3000);
}
}
