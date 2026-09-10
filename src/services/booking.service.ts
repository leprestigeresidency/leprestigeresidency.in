import { db, functions, httpsCallable } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface CheckAvailabilityParams {
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
}

export interface CheckAvailabilityResponse {
  available: boolean;
  availableCount: number;
  message?: string;
}

export interface CreateBookingParams {
  branch: string;
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
    address?: string;
  };
}

export interface CreateBookingResponse {
  success: boolean;
  bookingId: string;
  referenceNumber: string;
  status: string;
  totalPrice?: number;
}

export class BookingService {
  /**
   * Check room availability for the given date range and room type
   */
  static async checkAvailability(params: CheckAvailabilityParams): Promise<CheckAvailabilityResponse> {
    if (functions) {
      try {
        const checkFn = httpsCallable<CheckAvailabilityParams, CheckAvailabilityResponse>(functions, "checkAvailability");
        const res = await checkFn(params);
        return res.data;
      } catch (error) {
        console.error("Cloud function checkAvailability failed:", error);
        throw new Error("Failed to check room availability.");
      }
    }

    // Fallback: Assume available if functions are disabled
    return { available: true, availableCount: 5, message: "Availability fallback active." };
  }

  /**
   * Create a new room reservation (via Cloud Function or Direct Firestore fallback)
   */
  static async createBooking(params: CreateBookingParams): Promise<CreateBookingResponse> {
    const rawBranch = (params.branch || "").trim();
    const isPondy = 
      rawBranch === "Pondy" || 
      rawBranch === "Pondicherry" || 
      rawBranch === "Puducherry" || 
      rawBranch.toLowerCase().includes("pondy") || 
      rawBranch.toLowerCase().includes("pondi") ||
      rawBranch.toLowerCase().includes("pudu");

    const normalizedBranch = isPondy ? "Pondy" : "Tindivanam";
    const refNum = `LPR-${Math.floor(100000 + Math.random() * 900000)}`;
    let docId = `bk-${Date.now()}`;

    if (functions) {
      try {
        const createFn = httpsCallable<CreateBookingParams, CreateBookingResponse>(functions, "createBooking");
        const res = await createFn({ ...params, branch: normalizedBranch });
        return res.data;
      } catch (error) {
        console.error("Cloud function createBooking failed:", error);
        throw new Error("Failed to create booking through backend.");
      }
    }

    // Direct Firestore fallback
    if (db) {
      try {
        const bookingRecord = {
          ...params,
          branchId: normalizedBranch,
          branch: normalizedBranch,
          referenceNumber: refNum,
          status: "CONFIRMED",
          total: params.roomType === "Suite" ? 4499 : params.roomType === "Twin" ? 2799 : 2199,
          createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "bookings"), bookingRecord);
        docId = docRef.id;

        // Create explicit real-time Notification alert in Firestore
        await addDoc(collection(db, "notifications"), {
          branchId: normalizedBranch,
          branch: normalizedBranch,
          type: "New Booking",
          title: "New Reservation Received",
          description: `${params.guestDetails?.fullName || "Guest"} reserved ${params.roomType || "Room"} for ${params.checkIn ? params.checkIn.split("T")[0] : "upcoming dates"}.`,
          bookingId: docId,
          referenceNumber: refNum,
          guestName: params.guestDetails?.fullName || "Guest",
          read: false,
          createdAt: serverTimestamp(),
        }).catch((e) => console.warn("Notification write warning:", e));
        
        return {
          success: true,
          bookingId: docId,
          referenceNumber: refNum,
          status: "CONFIRMED",
          totalPrice: bookingRecord.total,
        };

      } catch (err) {
        console.error("Direct Firestore booking write error:", err);
        throw new Error("Failed to save booking to database.");
      }
    }

    throw new Error("Backend connection is required to create a booking.");
  }
}
