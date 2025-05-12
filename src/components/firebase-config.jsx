// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// import { getDatabase } from "firebase/database"; // Remove unused import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoTppw7BgoJ8_NknpDMtBkXz6Jrh07TEs",
  authDomain: "transport-93775.firebaseapp.com",
  databaseURL: "https://transport-93775-default-rtdb.firebaseio.com",
  projectId: "transport-93775",
  storageBucket: "transport-93775.firebasestorage.app",
  messagingSenderId: "1004201456595",
  appId: "1:1004201456595:web:8915ce558004fb82317526",
  measurementId: "G-WCNK992J1L"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Analytics (optional)


export default app;