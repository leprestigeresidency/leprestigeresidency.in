import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVQsA2A0j_aw1XG2NsE83OFkEDdP-VW_I",
  authDomain: "leprestigeresidency-87e1f.firebaseapp.com",
  projectId: "leprestigeresidency-87e1f",
  storageBucket: "leprestigeresidency-87e1f.firebasestorage.app",
  messagingSenderId: "545155829013",
  appId: "1:545155829013:web:3f01dbf63680baa498ad1c",
  measurementId: "G-4327YWNK6P"
};

async function testConnection() {
  console.log("Initializing Firebase app...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    console.log("Attempting to connect to Firestore...");
    // We'll try to get 1 document from 'rooms' collection
    const q = query(collection(db, "rooms"), limit(1));
    const snapshot = await getDocs(q);
    
    console.log("✅ SUCCESS: Successfully connected to Firebase Firestore!");
    console.log(`Found ${snapshot.size} documents in the 'rooms' collection.`);
    
    if (!snapshot.empty) {
      console.log("Sample Data: ", snapshot.docs[0].id);
    }
  } catch (error) {
    console.error("❌ ERROR: Failed to connect to Firestore.");
    console.error(error.message);
  }
}

testConnection();
