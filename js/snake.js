let canvas,ctx;
let snake,food,dir;
let size=20;

function initSnake(){
  canvas=document.getElementById("snakeCanvas");
  ctx=canvas.getContext("2d");
  snake=[{x:200,y:200}];
  dir="right";
  food=randomFood();
  setInterval(drawSnake,120);
}

function randomFood(){
  return{
    x:Math.floor(Math.random()*20)*20,
    y:Math.floor(Math.random()*20)*20
  }
}

function setDir(d){
  dir=d;
  addStep();
}

function drawSnake(){
  ctx.clearRect(0,0,400,400);

  let head={...snake[0]};
  if(dir=="right") head.x+=size;
  if(dir=="left") head.x-=size;
  if(dir=="up") head.y-=size;
  if(dir=="down") head.y+=size;

  snake.unshift(head);

  if(head.x==food.x && head.y==food.y){
    food=randomFood();
  }else{
    snake.pop();
  }

  if(head.x<0||head.y<0||head.x>=400||head.y>=400){
    showWin("GAME OVER");
  }

  ctx.fillStyle="green";
  snake.forEach(s=>ctx.fillRect(s.x,s.y,size,size));

  ctx.fillStyle="red";
  ctx.fillRect(food.x,food.y,size,size);
}
