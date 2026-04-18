import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAo2vwUP_K_l4fTyGH4ThWCbMuhpQZfFvA",
    authDomain: "citas-medicas-dcb1e.firebaseapp.com",
    projectId: "citas-medicas-dcb1e",
    storageBucket: "citas-medicas-dcb1e.firebasestorage.app",
    messagingSenderId: "1070271369395",
    appId: "1:1070271369395:web:6da3cdb1a3a1a73ac4e0c6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRO
window.registrar = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuario registrado correctamente");
    window.location.href = "login.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login exitoso");
    window.location.href = "ventas.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};