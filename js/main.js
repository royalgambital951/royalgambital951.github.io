let time=0;
let steps=0;
let timerInterval;
let music = new Audio("assets/music.mp3");
music.loop=true;

function startGame(){
  timerInterval=setInterval(()=>{
    time++;
    document.getElementById("timer").innerText="Time: "+time+"s";
  },1000);
  music.play();
}

function addStep(){
  steps++;
  document.getElementById("steps").innerText="Steps: "+steps;
}

function toggleSound(){
  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
}

function stopGame(){
  clearInterval(timerInterval);
}

function showWin(text){
  stopGame();
  let win=document.getElementById("winScreen");
  win.style.display="flex";
  win.innerHTML=`<div>${text}</div>`;
  confettiBlast();
}

function confettiBlast(){
  for(let i=0;i<80;i++){
    let c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3000);
  }
}
