// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm0Ew369Ne4A-nDQKXm4HelWhanJNawus",
  authDomain: "quizzo-dd5c8.firebaseapp.com",
  projectId: "quizzo-dd5c8",
  storageBucket: "quizzo-dd5c8.firebasestorage.app",
  messagingSenderId: "688503410889",
  appId: "1:688503410889:web:a0ca90da650706e09afd18",
  measurementId: "G-MM7MR1JE55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
