import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface RoomDetails {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  maxAdults: number;
  maxChildren: number;
  description: string;
  features: string[];
  images: string[];
}

export class RoomService {
  /**
   * Fetch rooms from Firestore collection or fallback to default room data
   */
  static async getRooms(): Promise<RoomDetails[]> {
    if (db) {
      try {
        const q = query(collection(db, "rooms"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as RoomDetails[];
        }
      } catch (error) {
        console.warn("Error fetching rooms from Firestore, falling back to local defaults:", error);
      }
    }

    return [
      {
        id: "deluxe-1",
        name: "Deluxe Room",
        type: "Deluxe",
        basePrice: 3000,
        maxAdults: 2,
        maxChildren: 1,
        description: "Elegant air-conditioned room with king bed, modern amenities, and city view.",
        features: ["Free Wi-Fi", "King Bed", "Air Conditioning", "Flat-screen TV", "Room Service"],
        images: ["/images/deluxe-room.jpg"],
      },
      {
        id: "twin-1",
        name: "Twin Room",
        type: "Twin",
        basePrice: 3500,
        maxAdults: 2,
        maxChildren: 2,
        description: "Spacious luxury room with twin single beds, ideal for friends and business travelers.",
        features: ["Free Wi-Fi", "Twin Beds", "Air Conditioning", "Work Desk", "Coffee Maker"],
        images: ["/images/twin-room.jpg"],
      },
    ];
  }
}
