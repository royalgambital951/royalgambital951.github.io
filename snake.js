const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{x:9*box, y:10*box}];
let food = {x:Math.floor(Math.random()*19+1)*box, y:Math.floor(Math.random()*19+1)*box};
let score = 0;
let d;

document.addEventListener("keydown", direction);

function direction(e){
if(e.keyCode==37 && d!="RIGHT") d="LEFT";
else if(e.keyCode==38 && d!="DOWN") d="UP";
else if(e.keyCode==39 && d!="LEFT") d="RIGHT";
else if(e.keyCode==40 && d!="UP") d="DOWN";
}

function draw(){
ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);

for(let i=0;i<snake.length;i++){
ctx.fillStyle=i==0?"gold":"white";
ctx.fillRect(snake[i].x,snake[i].y,box,box);
}

ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,box,box);

let snakeX=snake[0].x;
let snakeY=snake[0].y;

if(d=="LEFT") snakeX-=box;
if(d=="UP") snakeY-=box;
if(d=="RIGHT") snakeX+=box;
if(d=="DOWN") snakeY+=box;

if(snakeX==food.x && snakeY==food.y){
score++;
document.getElementById("score").innerHTML=score;
food={x:Math.floor(Math.random()*19+1)*box,y:Math.floor(Math.random()*19+1)*box};
}else{
snake.pop();
}

let newHead={x:snakeX,y:snakeY};

snake.unshift(newHead);
}

let game=setInterval(draw,100);

function restart(){
location.reload();
}
