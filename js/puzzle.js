let arr=[1,2,3,4,5,6,7,8,""];
let board=document.getElementById("puzzleBoard");

function initPuzzle(){
  board.style.display="grid";
  board.style.gridTemplateColumns="repeat(3,100px)";
  shuffle();
  render();
}

function shuffle(){
  arr.sort(()=>Math.random()-0.5);
}

function render(){
  board.innerHTML="";
  arr.forEach((n,i)=>{
    let d=document.createElement("div");
    d.style.height="100px";
    d.style.display="flex";
    d.style.justifyContent="center";
    d.style.alignItems="center";
    d.style.background="#fff";
    d.style.fontSize="30px";
    d.innerText=n;
    d.onclick=()=>move(i);
    board.appendChild(d);
  });
}

function move(i){
  let empty=arr.indexOf("");
  if([i-1,i+1,i-3,i+3].includes(empty)){
    [arr[i],arr[empty]]=[arr[empty],arr[i]];
    addStep();
    render();
    checkWin();
  }
}

function checkWin(){
  if(arr.join()=="1,2,3,4,5,6,7,8,"){
    showWin("YOU WIN 🎉");
  }
}
