function toggleMenu(){
let menu = document.getElementById("mobileMenu");
menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

document.getElementById("logo").onclick = function(){
document.getElementById("logoPreview").style.display="flex";
}

function closeLogo(){
document.getElementById("logoPreview").style.display="none";
}
