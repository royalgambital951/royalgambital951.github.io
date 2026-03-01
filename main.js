const logo = document.getElementById("logo");
const popup = document.getElementById("popup");

logo.onclick = () => {
  popup.style.display = "flex";
};

popup.onclick = () => {
  popup.style.display = "none";
};
