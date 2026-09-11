import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

/**
 * Returns a mapping of room types to their live minimum basePrice for a given branch
 * Map key: `${branchId}_${roomType}` (Standardized to lowercase)
 * Example: `pondicherry_deluxe` -> 2800
 */
export function useLivePrices() {
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [liveAvailability, setLiveAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!db) return;
    
    // Listen to all rooms to determine minimum prices and global availability
    const q = query(collection(db, "rooms"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const priceMap: Record<string, number> = {};
      const availMap: Record<string, boolean> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type && data.branchId) {
          // Normalize names: "Pondicherry", "Pondy", etc.
          let branch = data.branchId.toLowerCase();
          if (branch.includes("pond") || branch.includes("pudu")) branch = "pondicherry";
          if (branch.includes("tindi")) branch = "tindivanam";

          const key = `${branch}_${data.type.toLowerCase()}`;
          const currentPrice = data.basePrice;

          // Price tracking (minimum price for this branch+type)
          if (currentPrice && typeof currentPrice === "number") {
            if (!priceMap[key] || currentPrice < priceMap[key]) {
              priceMap[key] = currentPrice;
            }
          }

          // Availability tracking (available if ANY room of this type is available)
          const isAvail = data.status === "Available";
          if (availMap[key] !== true) { // don't overwrite if already true
            availMap[key] = isAvail;
          }
        }
      });

      setLivePrices(priceMap);
      setLiveAvailability(availMap);
    });

    return () => unsubscribe();
  }, []);

  return { livePrices, liveAvailability };
}
