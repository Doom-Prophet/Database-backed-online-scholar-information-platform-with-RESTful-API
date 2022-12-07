import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDK00wb-vgJbZbbZUrU7X2M08rjoNjQDHg",
  authDomain: "final-25f43.firebaseapp.com",
  projectId: "final-25f43",
  storageBucket: "final-25f43.appspot.com",
  messagingSenderId: "765153436621",
  appId: "1:765153436621:web:45ee3e0ad3852d69481a84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signInWithFirebase = (email, password) => signInWithEmailAndPassword(auth, email, password);
const signOutWithFirebase = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export {signInWithFirebase, signOutWithFirebase};