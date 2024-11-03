// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import the authentication service

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCR1LTzX8FaPVNBecWWqRzAwhn9sXN5FNo",
    authDomain: "smit1-84434.firebaseapp.com",
    databaseURL: "https://smit1-84434-default-rtdb.firebaseio.com",
    projectId: "smit1-84434",
    storageBucket: "smit1-84434.firebaseapp.com",
    messagingSenderId: "288866828344",
    appId: "1:288866828344:web:80b98c2bb8b4d1d721e6cd",
    measurementId: "G-BHS2ZJ0G48"
};

// Initialize Firebase if no instance already exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { app, analytics, auth };
