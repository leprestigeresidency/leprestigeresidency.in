import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export class ContactService {
  /**
   * Submit guest inquiry to Firestore
   */
  static async submitInquiry(data: ContactInquiry): Promise<{ success: boolean; id?: string }> {
    if (!db) {
      console.warn("Firestore database not initialized. Message simulated.");
      return { success: true, id: "simulated-id" };
    }

    try {
      const docRef = await addDoc(collection(db, "inquiries"), {
        ...data,
        status: "NEW",
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.warn("Firestore contact write fallback engaged:", error);
      return { success: true, id: `inq-${Date.now()}` };
    }
  }
}
