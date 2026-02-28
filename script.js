// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ================= SPLASH =================
setTimeout(()=>{document.getElementById("splash").style.display="none";},3000);

// ================= AUTH =================
function signup(){
auth.createUserWithEmailAndPassword(email.value,password.value)
.then(user=>{
db.collection("users").doc(user.user.uid).set({
email: email.value,
score:0,
role:"player"
});
alert("Signup Success");
})
.catch(err=>alert(err.message));
}

function login(){
auth.signInWithEmailAndPassword(email.value,password.value)
.then(user=>{
authBox.classList.add("hidden");
dashboard.classList.remove("hidden");
userEmail.innerText=user.user.email;

if(user.user.email==="admin@royal.com"){
adminPanel.classList.remove("hidden");
}
})
.catch(err=>alert(err.message));
}

function logout(){
auth.signOut();
location.reload();
}

// ================= ONLINE MULTIPLAYER =================
let roomRef;

function startOnlineMatch(){
gameArea.classList.remove("hidden");
roomRef=db.collection("rooms").doc("room1");

roomRef.set({board:["","","","","","","","",""],turn:"X"});

roomRef.onSnapshot(doc=>{
let data=doc.data();
renderBoard(data.board,data.turn);
});
}

function renderBoard(board,turn){
ticBoard.innerHTML="";
board.forEach((val,i)=>{
let cell=document.createElement("div");
cell.classList.add("cell");
cell.innerText=val;
cell.onclick=()=>{
if(val==="" && turn==="X"){
board[i]="X";
roomRef.update({board:board,turn:"O"});
}
};
ticBoard.appendChild(cell);
});
}

// ================= LEADERBOARD =================
function loadLeaderboard(){
leaderboard.classList.remove("hidden");
db.collection("users").orderBy("score","desc").limit(10)
.get().then(snapshot=>{
leaderboard.innerHTML="<h3>Top Players</h3>";
snapshot.forEach(doc=>{
leaderboard.innerHTML+=`<p>${doc.data().email} - ${doc.data().score}</p>`;
});
});
}

// ================= ADMIN =================
function getAllUsers(){
db.collection("users").get().then(snapshot=>{
adminData.innerHTML="";
snapshot.forEach(doc=>{
adminData.innerHTML+=`<p>${doc.data().email}</p>`;
});
});
}

// ================= PWA =================
if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js');
}
