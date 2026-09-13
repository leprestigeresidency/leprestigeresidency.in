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
    
    const qRooms = query(collection(db, "rooms"));
    const unsubRooms = onSnapshot(qRooms, (snapshot) => {
      const availMap: Record<string, boolean> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type && data.branchId) {
          let branch = data.branchId.toLowerCase();
          if (branch.includes("pond") || branch.includes("pudu")) branch = "pondicherry";
          if (branch.includes("tindi")) branch = "tindivanam";

          const key = `${branch}_${data.type.toLowerCase()}`;
          const isAvail = data.status === "Available";
          if (availMap[key] !== true) { 
            availMap[key] = isAvail;
          }
        }
      });
      setLiveAvailability(availMap);
    });

    const qPrices = query(collection(db, "room_prices"));
    const unsubPrices = onSnapshot(qPrices, (snapshot) => {
      const priceMap: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.price !== undefined) {
          priceMap[doc.id] = data.price; 
        }
      });
      setLivePrices(priceMap);
    });

    return () => {
      unsubRooms();
      unsubPrices();
    }
  }, []);

  return { livePrices, liveAvailability };
}
