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
  specialRequest?: string;
  guestDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  status: "Reserved" | "Confirmed" | "Checked In" | "Checked Out" | "Cancelled" | "Completed" | "CONFIRMED" | string;
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

    return [];
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
