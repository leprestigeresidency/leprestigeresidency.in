import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVQsA2A0j_aw1XG2NsE83OFkEDdP-VW_I",
  authDomain: "leprestigeresidency-87e1f.firebaseapp.com",
  databaseURL: "https://leprestigeresidency-87e1f-default-rtdb.firebaseio.com",
  projectId: "leprestigeresidency-87e1f",
  storageBucket: "leprestigeresidency-87e1f.firebasestorage.app",
  messagingSenderId: "545155829013",
  appId: "1:545155829013:web:3f01dbf63680baa498ad1c",
  measurementId: "G-4327YWNK6P"
};

async function wipeTestData() {
  console.log("Initializing Firebase app for wiping test data...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    // 1. Wipe Bookings
    console.log("Fetching bookings...");
    const bookingsSnap = await getDocs(collection(db, "bookings"));
    console.log(`Found ${bookingsSnap.size} bookings. Deleting...`);
    for (const d of bookingsSnap.docs) {
      await deleteDoc(doc(db, "bookings", d.id));
    }
    console.log("✅ Cleared all bookings.");

    // 2. Wipe Landing Leads
    console.log("Fetching landing leads...");
    const leadsSnap = await getDocs(collection(db, "landing_leads"));
    console.log(`Found ${leadsSnap.size} landing leads. Deleting...`);
    for (const d of leadsSnap.docs) {
      await deleteDoc(doc(db, "landing_leads", d.id));
    }
    console.log("✅ Cleared all landing leads.");

    console.log("\n🚀 All test data successfully wiped out! Pure production state achieved.");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
}

wipeTestData();
