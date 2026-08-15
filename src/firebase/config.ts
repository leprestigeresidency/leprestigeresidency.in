import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber, signInWithEmailLink, isSignInWithEmailLink, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDVQsA2A0j_aw1XG2NsE83OFkEDdP-VW_I",
  authDomain: "leprestigeresidency-87e1f.firebaseapp.com",
  projectId: "leprestigeresidency-87e1f",
  storageBucket: "leprestigeresidency-87e1f.firebasestorage.app",
  messagingSenderId: "545155829013",
  appId: "1:545155829013:web:3f01dbf63680baa498ad1c",
  measurementId: "G-4327YWNK6P"
};

// Initialize Firebase only if config is provided to avoid errors
const app = firebaseConfig.apiKey !== "YOUR_API_KEY" ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const functions = app ? getFunctions(app, "us-central1") : null;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Connect to Emulators if configured or in dev emulator mode
if (import.meta.env.VITE_USE_EMULATORS === "true") {
  if (auth) connectAuthEmulator(auth, "http://localhost:9099");
  if (db) connectFirestoreEmulator(db, "localhost", 8080);
  if (functions) connectFunctionsEmulator(functions, "localhost", 5001);
  console.log("⚡ Connected Frontend to Firebase Local Emulators");
}

export { app, auth, db, functions, googleProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber, signInWithEmailLink, isSignInWithEmailLink, httpsCallable };


