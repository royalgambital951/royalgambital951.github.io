// DARK MODE TOGGLE
const toggle = document.getElementById("themeToggle");

if(localStorage.getItem("mode") === "dark"){
    document.body.classList.add("dark");
}

toggle.onclick = () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("mode","dark");
    } else {
        localStorage.setItem("mode","light");
    }
};

// LOGO POP EFFECT
const logo = document.getElementById("logo");
const overlay = document.getElementById("overlay");

logo.onclick = () => {
    logo.classList.toggle("active");
};
