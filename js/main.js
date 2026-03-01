document.addEventListener("DOMContentLoaded", function(){

let logo = document.getElementById("logo");
let popup = document.getElementById("popup");

if(logo){
logo.onclick = function(){
popup.style.display="flex";
}
}

if(popup){
popup.onclick = function(){
popup.style.display="none";
}
}

});

let music = new Audio("assets/bg-music.mp3");
music.loop = true;

function toggleSound(){
if(music.paused){
music.play();
}else{
music.pause();
}
}
