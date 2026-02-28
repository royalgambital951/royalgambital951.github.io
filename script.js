// Splash remove after 2 sec
window.addEventListener("load", function(){
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
    }, 2000);
});

// Hamburger toggle
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
    if(sideMenu.style.left === "0px"){
        sideMenu.style.left = "-250px";
    } else {
        sideMenu.style.left = "0px";
    }
});

// Logo zoom modal
const logoClick = document.getElementById("logoClick");
const logoModal = document.getElementById("logoModal");

logoClick.addEventListener("click", () => {
    logoModal.style.display = "flex";
});

logoModal.addEventListener("click", () => {
    logoModal.style.display = "none";
});
