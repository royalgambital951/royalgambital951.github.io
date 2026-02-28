import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Splash remove after 2 sec
setTimeout(() => {
    document.getElementById("splash").style.display = "none";
}, 2000);

// Hamburger
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
    sideMenu.style.left = sideMenu.style.left === "0px" ? "-250px" : "0px";
});

// Logo zoom
const logoClick = document.getElementById("logoClick");
const logoModal = document.getElementById("logoModal");

logoClick.addEventListener("click", () => {
    logoModal.style.display = "flex";
});

logoModal.addEventListener("click", () => {
    logoModal.style.display = "none";
});

// Auth
document.getElementById("signup").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signup Successful 👑"))
    .catch(err => alert(err.message));
});

document.getElementById("login").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Login Successful 👑"))
    .catch(err => alert(err.message));
});
