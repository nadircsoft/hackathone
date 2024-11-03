// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";         // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore for database
import { getStorage } from "firebase/storage";     // Import Storage for profile pictures

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR1LTzX8FaPVNBecWWqRzAwhn9sXN5FNo",
  authDomain: "smit1-84434.firebaseapp.com",
  databaseURL: "https://smit1-84434-default-rtdb.firebaseio.com",
  projectId: "smit1-84434",
  storageBucket: "smit1-84434.appspot.com",
  messagingSenderId: "288866828344",
  appId: "1:288866828344:web:80b98c2bb8b4d1d721e6cd",
  measurementId: "G-BHS2ZJ0G48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);         // Initialize Firebase Auth
const db = getFirestore(app);      // Initialize Firestore
const storage = getStorage(app);   // Initialize Storage

export { app, auth, db, storage }; // Export modules for use in other files
