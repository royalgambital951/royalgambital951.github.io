document.addEventListener("DOMContentLoaded", function(){

let level=1;
let timer=0;
let steps=0;
let timerInterval;

/* LOGO MODAL FIX */
const logo=document.getElementById("mainLogo");
const modal=document.getElementById("logoModal");

logo.addEventListener("click",()=>{
    modal.style.display="flex";
});

modal.addEventListener("click",()=>{
    modal.style.display="none";
});

/* TIMER */
function startTimer(){
    clearInterval(timerInterval);
    timer=0;
    document.getElementById("timer").innerText=0;

    timerInterval=setInterval(()=>{
        timer++;
        document.getElementById("timer").innerText=timer;
    },1000);
}

/* OPEN GAME */
window.openGame=function(type){

    document.querySelector(".game-grid").style.display="none";
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("resultDisplay").innerText="";

    level=1;
    steps=0;

    document.getElementById("level").innerText=1;
    document.getElementById("steps").innerText=0;

    startTimer();

    if(type==="tic") startTicTacToe();
    if(type==="snake") startSnake();
}

/* RESULT */
function showResult(win){
    clearInterval(timerInterval);
    let result=document.getElementById("resultDisplay");
    result.innerText= win ? "WINNER" : "LOSER";
    result.style.color= win ? "green" : "red";
}

/* TIC TAC TOE */
function startTicTacToe(){

    const container=document.getElementById("gameCanvasContainer");
    container.innerHTML="";
    container.style.display="grid";
    container.style.gridTemplateColumns="repeat(3,100px)";
    container.style.gap="10px";

    let board=Array(9).fill("");
    let human="X", ai="O";

    function checkWinner(b){
        const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let w of wins){
            if(b[w[0]] && b[w[0]]===b[w[1]] && b[w[1]]===b[w[2]])
                return b[w[0]];
        }
        return b.includes("")? null : "tie";
    }

    function aiMove(){
        let empty=[];
        board.forEach((v,i)=>{ if(v==="") empty.push(i); });
        if(empty.length>0){
            let move=empty[Math.floor(Math.random()*empty.length)];
            board[move]=ai;
        }
    }

    function render(){
        container.innerHTML="";
        board.forEach((cell,i)=>{
            let div=document.createElement("div");
            div.className="cell";
            div.innerText=cell;
            div.onclick=()=>{
                if(!board[i]){
                    board[i]=human;
                    steps++;
                    document.getElementById("steps").innerText=steps;
                    aiMove();
                    render();
                    let winner=checkWinner(board);
                    if(winner) showResult(winner==="X");
                }
            };
            container.appendChild(div);
        });
    }

    render();
}

/* SNAKE */
function startSnake(){

    const container=document.getElementById("gameCanvasContainer");
    container.innerHTML="<canvas id='snakeCanvas' width='350' height='400'></canvas>";

    const canvas=document.getElementById("snakeCanvas");
    const ctx=canvas.getContext("2d");

    let x=150,y=150;
    let dx=2,dy=2;

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="black";
        ctx.fillRect(x,y,20,20);

        x+=dx;
        y+=dy;

        if(x<=0||x>=canvas.width-20) dx=-dx;
        if(y<=0||y>=canvas.height-20) dy=-dy;

        requestAnimationFrame(draw);
    }

    draw();
}

});
