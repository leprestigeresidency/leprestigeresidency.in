import { db } from "@/firebase/config";
import { collection, getDocs, doc, updateDoc, query, orderBy, limit } from "firebase/firestore";

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  branch: "Pondicherry" | "Tindivanam" | string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  totalPrice?: number;
  status: "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED";
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  createdAt?: any;
}

export interface RoomRecord {
  id: string;
  roomNumber: string;
  branch: "Pondicherry" | "Tindivanam" | string;
  name: string;
  type: string;
  basePrice: number;
  status: "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTENANCE";
  features: string[];
}

export interface InquiryRecord {
  id: string;
  branch: "Pondicherry" | "Tindivanam" | string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "NEW" | "RESOLVED";
  createdAt?: any;
}

export class AdminService {
  /**
   * Fetch all bookings from Firestore + LocalStorage fallback
   */
  static async getBookings(): Promise<BookingRecord[]> {
    let localBookings: BookingRecord[] = [];
    try {
      const stored = localStorage.getItem("le_prestige_user_bookings");
      if (stored) {
        localBookings = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read local user bookings:", e);
    }

    let firestoreBookings: BookingRecord[] = [];
    if (db) {
      try {
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(50));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          firestoreBookings = snapshot.docs.map((doc) => ({
            id: doc.id,
            branch: doc.data().branch || "Pondicherry",
            ...doc.data(),
          })) as BookingRecord[];
        }
      } catch (error) {
        console.warn("Firestore bookings fetch error, using local fallback:", error);
      }
    }

    const fallbackBookings: BookingRecord[] = [];
    return [...localBookings, ...firestoreBookings, ...fallbackBookings];
  }

  /**
   * Update booking status in Firestore
   */
  static async updateBookingStatus(bookingId: string, status: BookingRecord["status"]): Promise<boolean> {
    if (db) {
      try {
        await updateDoc(doc(db, "bookings", bookingId), { status });
        return true;
      } catch (error) {
        console.warn("Failed to update booking status in Firestore:", error);
      }
    }
    return true;
  }

  /**
   * Fetch room status & pricing from Firestore
   */
  static async getRooms(): Promise<RoomRecord[]> {
    if (db) {
      try {
        const snapshot = await getDocs(collection(db, "rooms"));
        if (!snapshot.empty) {
          return snapshot.docs.map((d) => ({
            id: d.id,
            branch: d.data().branch || "Pondicherry",
            ...d.data(),
          })) as RoomRecord[];
        }
      } catch (error) {
        console.warn("Firestore rooms fetch error, using local fallback:", error);
      }
    }

    return [
      // Pondicherry Branch Rooms
      { id: "pdy-101", roomNumber: "PDY-101", branch: "Pondicherry", name: "Deluxe Room", type: "Deluxe", basePrice: 3000, status: "AVAILABLE", features: ["King Bed", "Wi-Fi", "AC"] },
      { id: "pdy-102", roomNumber: "PDY-102", branch: "Pondicherry", name: "Deluxe Room", type: "Deluxe", basePrice: 3000, status: "OCCUPIED", features: ["King Bed", "Wi-Fi", "AC"] },
      { id: "pdy-201", roomNumber: "PDY-201", branch: "Pondicherry", name: "Luxury Twin Room", type: "Twin", basePrice: 3500, status: "AVAILABLE", features: ["Twin Beds", "Wi-Fi", "AC"] },
      { id: "pdy-202", roomNumber: "PDY-202", branch: "Pondicherry", name: "Luxury Twin Room", type: "Twin", basePrice: 3500, status: "CLEANING", features: ["Twin Beds", "Wi-Fi", "AC"] },
      { id: "pdy-301", roomNumber: "PDY-301", branch: "Pondicherry", name: "Presidential Suite", type: "Suite", basePrice: 6500, status: "OCCUPIED", features: ["Jacuzzi", "Balcony", "Butler"] },
      
      // Tindivanam Branch Rooms
      { id: "tdv-101", roomNumber: "TDV-101", branch: "Tindivanam", name: "Deluxe Room", type: "Deluxe", basePrice: 2800, status: "AVAILABLE", features: ["King Bed", "Wi-Fi", "AC"] },
      { id: "tdv-102", roomNumber: "TDV-102", branch: "Tindivanam", name: "Executive Suite", type: "Suite", basePrice: 5200, status: "OCCUPIED", features: ["King Bed", "Living Room", "Smart TV"] },
      { id: "tdv-201", roomNumber: "TDV-201", branch: "Tindivanam", name: "Royal Twin Room", type: "Twin", basePrice: 3200, status: "AVAILABLE", features: ["Twin Beds", "High Speed Internet", "AC"] },
      { id: "tdv-202", roomNumber: "TDV-202", branch: "Tindivanam", name: "Heritage Villa", type: "Villa", basePrice: 7000, status: "MAINTENANCE", features: ["Private Garden", "Jacuzzi", "Breakfast Included"] },
    ];
  }

  /**
   * Update room status in Firestore
   */
  static async updateRoomStatus(roomId: string, status: RoomRecord["status"]): Promise<boolean> {
    if (db) {
      try {
        await updateDoc(doc(db, "rooms", roomId), { status });
        return true;
      } catch (error) {
        console.warn("Failed to update room status in Firestore:", error);
      }
    }
    return true;
  }

  /**
   * Fetch guest contact inquiries
   */
  static async getInquiries(): Promise<InquiryRecord[]> {
    if (db) {
      try {
        const snapshot = await getDocs(collection(db, "inquiries"));
        if (!snapshot.empty) {
          return snapshot.docs.map((d) => ({
            id: d.id,
            branch: d.data().branch || "Pondicherry",
            ...d.data(),
          })) as InquiryRecord[];
        }
      } catch (error) {
        console.warn("Firestore inquiries error, using fallback:", error);
      }
    }

    return [];
  }
}
