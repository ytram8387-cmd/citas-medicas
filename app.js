import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAo2vwUP_K_l4fTyGH4ThWCbMuhpQZfFvA",
    authDomain: "citas-medicas-dcb1e.firebaseapp.com",
    projectId: "citas-medicas-dcb1e",
    storageBucket: "citas-medicas-dcb1e.firebasestorage.app",
    messagingSenderId: "1070271369395",
    appId: "1:1070271369395:web:6da3cdb1a3a1a73ac4e0c6"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let editId = null;

// BOTÓN
document.getElementById("btnGuardar").addEventListener("click", guardarCita);

// 🔥 GUARDAR
async function guardarCita(){
    let paciente = document.getElementById("paciente").value;
    let doctor = document.getElementById("doctor").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if(paciente === "" || doctor === ""){
        alert("Completa los campos");
        return;
    }

    if(editId === null){
        await addDoc(collection(db, "citas"), {
            paciente, doctor, fecha, hora
        });
    } else {
        await updateDoc(doc(db, "citas", editId), {
            paciente, doctor, fecha, hora
        });
        editId = null;
    }

    limpiar();
    mostrarCitas();
}

// 🔥 MOSTRAR
async function mostrarCitas(){
    const querySnapshot = await getDocs(collection(db, "citas"));
    let lista = document.getElementById("listaCitas");
    lista.innerHTML = "";

    querySnapshot.forEach((docu) => {
        let cita = docu.data();

        let div = document.createElement("div");
        div.classList.add("cita");

        div.innerHTML = `
            <p><b>Paciente:</b> ${cita.paciente}</p>
            <p><b>Doctor:</b> ${cita.doctor}</p>
            <p><b>Fecha:</b> ${cita.fecha}</p>
            <p><b>Hora:</b> ${cita.hora}</p>
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
        `;

        // BOTONES
        div.querySelector(".eliminar").addEventListener("click", async () => {
            await deleteDoc(doc(db, "citas", docu.id));
            mostrarCitas();
        });

        div.querySelector(".editar").addEventListener("click", () => {
            document.getElementById("paciente").value = cita.paciente;
            document.getElementById("doctor").value = cita.doctor;
            document.getElementById("fecha").value = cita.fecha;
            document.getElementById("hora").value = cita.hora;
            editId = docu.id;
        });

        lista.appendChild(div);
    });
}

// LIMPIAR
function limpiar(){
    document.getElementById("paciente").value = "";
    document.getElementById("doctor").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
}

// INICIAR
mostrarCitas();