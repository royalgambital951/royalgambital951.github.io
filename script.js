// 🔥 FIREBASE CONFIG (अपना config डालें)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* Splash */
setTimeout(()=>{splash.style.display="none";},3000);

// AUTH
function signup(){
auth.createUserWithEmailAndPassword(email.value,password.value)
.then(u=>{
db.collection("users").doc(u.user.uid).set({
email:u.user.email,
score:0,
role:"player"
});
alert("Signup Success");
});
}
function login(){
auth.signInWithEmailAndPassword(email.value,password.value)
.then(u=>{
authBox.classList.add("hidden");
dashboard.classList.remove("hidden");
userEmail.innerText=u.user.email;
if(u.user.email==="admin@royal.com"){
adminPanel.classList.remove("hidden");
}
});
}
function logout(){
auth.signOut();
location.reload();
}

// TIMER
let time=0,steps=0,score=0,level=1,timer;
function startTimer(){
clearInterval(timer);
timer=setInterval(()=>{time++;timerEl.innerText=time;},1000);
}

// TIC TAC TOE AI + MULTI
function startTicAI(){initTic(true);}
function startTicMulti(){initTic(false);}

function initTic(ai){
gameArea.classList.remove("hidden");
ticBoard.classList.remove("hidden");
snakeCanvas.classList.add("hidden");
ticBoard.innerHTML="";
let board=["","","","","","","","",""];
let player="X";

board.forEach((_,i)=>{
let c=document.createElement("div");
c.className="cell";
c.onclick=()=>{
if(board[i]===""){
board[i]=player;
c.innerText=player;
steps++;stepsEl.innerText=steps;
if(checkWin(board,player)) return win();
if(ai){aiMove(board);}
player=player==="X"?"O":"X";
}
};
ticBoard.appendChild(c);
});
startTimer();
}

function aiMove(board){
let move=board.findIndex(x=>x==="");
board[move]="O";
ticBoard.children[move].innerText="O";
if(checkWin(board,"O")) lose();
}

function checkWin(b,p){
const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
return w.some(a=>a.every(i=>b[i]===p));
}

// SNAKE
function startSnake(){
gameArea.classList.remove("hidden");
ticBoard.classList.add("hidden");
snakeCanvas.classList.remove("hidden");
const ctx=snakeCanvas.getContext("2d");
let x=200,y=200,dx=20,dy=0;
function draw(){
ctx.clearRect(0,0,400,400);
x+=dx;
ctx.fillRect(x,y,18,18);
if(x>380||x<0) lose();
requestAnimationFrame(draw);
}
draw();
startTimer();
}

// ONLINE MULTI (Firebase)
function startOnlineMatch(){
gameArea.classList.remove("hidden");
const room=db.collection("rooms").doc("room1");
room.set({board:["","","","","","","","",""],turn:"X"});
room.onSnapshot(d=>{
renderBoard(d.data().board,d.data().turn,room);
});
}
function renderBoard(board,turn,room){
ticBoard.innerHTML="";
ticBoard.classList.remove("hidden");
board.forEach((v,i)=>{
let c=document.createElement("div");
c.className="cell";
c.innerText=v;
c.onclick=()=>{
if(v===""&&turn==="X"){
board[i]="X";
room.update({board:board,turn:"O"});
}
};
ticBoard.appendChild(c);
});
}

// LEADERBOARD
function loadLeaderboard(){
leaderboard.classList.remove("hidden");
db.collection("users").orderBy("score","desc").limit(10).get()
.then(s=>{
leaderboard.innerHTML="<h3>Leaderboard</h3>";
s.forEach(d=>{
leaderboard.innerHTML+=`<p>${d.data().email} - ${d.data().score}</p>`;
});
});
}

// ADMIN
function getAllUsers(){
db.collection("users").get().then(s=>{
adminData.innerHTML="";
s.forEach(d=>{
adminData.innerHTML+=`<p>${d.data().email}</p>`;
});
});
}

// RESULT
function win(){
result.innerText="WINNER 🎉";
confetti({particleCount:200,spread:120});
}
function lose(){
result.innerText="LOSER ❌";
            }
