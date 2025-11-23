// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Am adăugat importul pentru Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaLbnmIzYPpeTqfBJBzp8kmL4xcrtjHLQ",
  authDomain: "project-no1-bb0a4.firebaseapp.com",
  databaseURL: "https://project-no1-bb0a4-default-rtdb.firebaseio.com",
  projectId: "project-no1-bb0a4",
  storageBucket: "project-no1-bb0a4.firebasestorage.app",
  messagingSenderId: "564667375021",
  appId: "1:564667375021:web:9061f3a27116042af91524",
  measurementId: "G-CPSRE6ZP1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Acesta este pentru Firestore
export const realtimeDB = getDatabase(app); // Acesta este pentru Realtime Database
