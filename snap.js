let score=0;
let time=30;
let timer;

function startSnap(){
score=0;
time=30;
nextCard();
timer=setInterval(()=>{
time--;
document.getElementById("time").innerText=time;
if(time<=0){
clearInterval(timer);
alert("Game Over! Score: "+score);
}
},1000);
}

function nextCard(){
let cards=["A","K","Q","J"];
let card=cards[Math.floor(Math.random()*cards.length)];
document.getElementById("card").innerText=card;
if(card==="A"){
score++;
document.getElementById("score").innerText=score;
}
}

startSnap();
