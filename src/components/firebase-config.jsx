// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoTppw7BgoJ8_NknpDMtBkXz6Jrh07TEs", //  Replace with your actual API key
  authDomain: "transport-93775.firebaseapp.com",
  projectId: "transport-93775",
  storageBucket: "transport-93775.firebasestorage.app",
  messagingSenderId: "1004201456595",
  appId: "1:1004201456595:web:8915ce558004fb82317526",
  measurementId: "G-WCNK992J1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (best practice)
let analytics;
if (typeof window !== 'undefined') { // Check if running in a browser environment.  Analytics requires this.
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.error("Error initializing analytics", e);
    // Handle error, e.g., set analytics to null or a no-op object.
    analytics = null; // Or some other error handling.
  }
} else {
    analytics = null;
}

// Get and export auth instance
const auth = getAuth(app); // Initialize auth
export { app, analytics, auth }; // It is good to export app, analytics and auth
