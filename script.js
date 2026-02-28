let level = 1;
let timer = 0;
let steps = 0;
let timerInterval;
let soundOn = true;
const bgMusic = document.getElementById("bgMusic");

/* Logo Modal */
document.getElementById("mainLogo").onclick = () => {
    document.getElementById("logoModal").style.display="flex";
};
document.getElementById("logoModal").onclick = () => {
    document.getElementById("logoModal").style.display="none";
};

/* Open Game */
function openGame(type){
    document.querySelector(".game-grid").style.display="none";
    document.getElementById("gameArea").classList.remove("hidden");

    level = 1;
    startTimer();
    if(soundOn) bgMusic.play();

    if(type==="tic") startTicTacToe();
    if(type==="snake") startSnake();
}

/* Timer */
function startTimer(){
    timer=0;
    timerInterval = setInterval(()=>{
        timer++;
        document.getElementById("timer").innerText=timer;
    },1000);
}

/* Toggle Sound */
function toggleSound(){
    soundOn=!soundOn;
    if(soundOn) bgMusic.play();
    else bgMusic.pause();
}

/* Confetti */
function launchConfetti(){
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame(){
        confetti({
            particleCount: 10,
            spread: 120,
            origin: { y: 0.6 }
        });
        if(Date.now() < end) requestAnimationFrame(frame);
    })();
}

/* Result */
function showResult(win){
    clearInterval(timerInterval);
    let result = document.getElementById("resultDisplay");
    result.innerText = win ? "WINNER" : "LOSER";
    result.style.color = win ? "green" : "red";
    launchConfetti();
}

/* =========================
   TIC TAC TOE (Minimax AI)
========================= */

function startTicTacToe(){
    const container = document.getElementById("gameCanvasContainer");
    container.innerHTML="";
    let board = Array(9).fill("");
    let human="X", ai="O";

    function checkWinner(b){
        const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for(let w of wins){
            if(b[w[0]] && b[w[0]]===b[w[1]] && b[w[1]]===b[w[2]])
                return b[w[0]];
        }
        return b.includes("")? null : "tie";
    }

    function minimax(newBoard,isMax){
        let winner = checkWinner(newBoard);
        if(winner==="O") return 10-level;
        if(winner==="X") return level-10;
        if(winner==="tie") return 0;

        let best = isMax? -Infinity : Infinity;
        for(let i=0;i<9;i++){
            if(newBoard[i]===""){
                newBoard[i]=isMax? ai:human;
                let score = minimax(newBoard,!isMax);
                newBoard[i]="";
                best = isMax? Math.max(score,best):Math.min(score,best);
            }
        }
        return best;
    }

    function aiMove(){
        let bestScore=-Infinity;
        let move;
        for(let i=0;i<9;i++){
            if(board[i]===""){
                board[i]=ai;
                let score=minimax(board,false);
                board[i]="";
                if(score>bestScore){
                    bestScore=score;
                    move=i;
                }
            }
        }
        board[move]=ai;
        render();
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
                    let winner=checkWinner(board);
                    if(winner) showResult(winner==="X");
                }
            };
            container.appendChild(div);
        });
        container.style.display="grid";
        container.style.gridTemplateColumns="repeat(3,100px)";
        container.style.gap="10px";
    }

    render();
}

/* =========================
   SNAKE (Smooth Canvas)
========================= */

function startSnake(){
    const container=document.getElementById("gameCanvasContainer");
    container.innerHTML="<canvas id='snakeCanvas' width='500' height='400'></canvas>";
    const canvas=document.getElementById("snakeCanvas");
    const ctx=canvas.getContext("2d");

    let x=100,y=100;
    let dx=2+level, dy=2;
    function draw(){
        ctx.clearRect(0,0,500,400);
        ctx.fillRect(x,y,20,20);
        x+=dx;
        y+=dy;
        requestAnimationFrame(draw);
    }
    draw();
}
