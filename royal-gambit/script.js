// DARK MODE
function toggleMode() {
  document.body.classList.toggle("dark");
}

// CONFETTI
function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    let conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.background = `hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 3000);
  }
}

// TIMER
let timerInterval;
function startTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("timer").innerText = seconds + " s";
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// MUSIC
function playMusic() {
  const music = document.getElementById("bg-music");
  music.play();
}
function stopMusic() {
  document.getElementById("bg-music").pause();
}
