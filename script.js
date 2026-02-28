// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔥 YOUR FIREBASE CONFIG (Replace with your real keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const emailInput = document.querySelector("input[type='email']");
const passwordInput = document.querySelector("input[type='password']");
const signupBtn = document.querySelector("button:nth-child(1)");
const loginBtn = document.querySelector("button:nth-child(2)");

// Signup
signupBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Signup Successful 👑");
    })
    .catch(error => {
        alert(error.message);
    });
});

// Login
loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Login Successful 👑");
        window.location.href = "dashboard.html"; // redirect page
    })
    .catch(error => {
        alert(error.message);
    });
});
