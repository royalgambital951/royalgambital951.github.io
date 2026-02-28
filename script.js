document.addEventListener("DOMContentLoaded",function(){

let currentGame="";
let timer=0;
let timerInterval;
let steps=0;

/* Logo Modal */
const logo=document.getElementById("mainLogo");
const modal=document.getElementById("logoModal");

logo.onclick=()=>modal.style.display="flex";
modal.onclick=()=>modal.style.display="none";

/* Open Game */
window.openGame=function(type){
    currentGame=type;
    document.getElementById("gameGrid").classList.add("hidden");
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("result").innerText="";
    steps=0;
    document.getElementById("steps").innerText=0;
    startTimer();

    if(type==="tic") startTic();
    if(type==="snake") startSnake();
}

/* Back */
window.goBack=function(){
    clearInterval(timerInterval);
    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("gameGrid").classList.remove("hidden");
}

/* Restart */
window.restartGame=function(){
    if(currentGame==="tic") startTic();
    if(currentGame==="snake") startSnake();
}

/* Timer */
function startTimer(){
    clearInterval(timerInterval);
    timer=0;
    document.getElementById("timer").innerText=0;
    timerInterval=setInterval(()=>{
        timer++;
        document.getElementById("timer").innerText=timer;
    },1000);
}

/* TIC TAC TOE */
function startTic(){
    const container=document.getElementById("gameContainer");
    container.innerHTML="";
    container.style.display="grid";
    container.style.gridTemplateColumns="repeat(3,90px)";
    container.style.gap="10px";

    let board=Array(9).fill("");
    let player="X";
    let ai="O";

    function checkWinner(){
        const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let w of wins){
            if(board[w[0]] && board[w[0]]===board[w[1]] && board[w[1]]===board[w[2]])
                return board[w[0]];
        }
        return board.includes("")?null:"tie";
    }

    function aiMove(){
        let empty=[];
        board.forEach((v,i)=>{if(v==="")empty.push(i);});
        if(empty.length){
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
                    board[i]=player;
                    steps++;
                    document.getElementById("steps").innerText=steps;
                    aiMove();
                    render();
                    let win=checkWinner();
                    if(win){
                        document.getElementById("result").innerText= win==="X"?"WINNER":"LOSER";
                        clearInterval(timerInterval);
                    }
                }
            };
            container.appendChild(div);
        });
    }

    render();
}

/* SNAKE */
function startSnake(){
    const container=document.getElementById("gameContainer");
    container.innerHTML="<canvas id='snakeCanvas' width='350' height='300'></canvas>";
    const canvas=document.getElementById("snakeCanvas");
    const ctx=canvas.getContext("2d");

    let x=150,y=100;
    let dx=2,dy=2;

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="black";
        ctx.fillRect(x,y,20,20);

        x+=dx;
        y+=dy;

        if(x<=0||x>=canvas.width-20)dx=-dx;
        if(y<=0||y>=canvas.height-20)dy=-dy;

        requestAnimationFrame(draw);
    }

    draw();
}

});
