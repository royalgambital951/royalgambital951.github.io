let music = new Audio("assets/bg-music.mp3");
music.loop = true;

function toggleSound(){
if(music.paused){
music.play();
}else{
music.pause();
}
}
