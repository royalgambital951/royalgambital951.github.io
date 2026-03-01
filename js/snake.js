let canvas=document.getElementById("game");
let ctx=canvas.getContext("2d");

let snake=[{x:10,y:10}];
let food={x:5,y:5};
let dx=1,dy=0;
let steps=0,time=0;

function draw(){
ctx.clearRect(0,0,300,300);
snake.forEach(s=>{
ctx.fillRect(s.x*15,s.y*15,15,15);
});
ctx.fillRect(food.x*15,food.y*15,15,15);
}

function update(){
let head={x:snake[0].x+dx,y:snake[0].y+dy};
snake.unshift(head);
if(head.x==food.x && head.y==food.y){
food.x=Math.floor(Math.random()*20);
food.y=Math.floor(Math.random()*20);
steps++;
document.getElementById("steps").innerText="Steps: "+steps;
}else{
snake.pop();
}
draw();
}

document.addEventListener("keydown",e=>{
if(e.key=="ArrowUp"){dx=0;dy=-1;}
if(e.key=="ArrowDown"){dx=0;dy=1;}
if(e.key=="ArrowLeft"){dx=-1;dy=0;}
if(e.key=="ArrowRight"){dx=1;dy=0;}
});

setInterval(()=>{
update();
time++;
document.getElementById("timer").innerText="Time: "+time;
},200);

function restart(){location.reload();}
