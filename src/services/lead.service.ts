// ── Le Prestige — Landing Pages Lead Service ──────────────────────
//
// Sends lead data to the existing deployed Google Apps Script Web App.
// Uses no-cors mode with URLSearchParams (application/x-www-form-urlencoded)
// which is the most reliable format for Apps Script doPost() on cross-origin
// browser requests without a CORS preflight.
//
// Firestore is kept as a silent parallel backup.
// No UI is ever blocked by the Firestore write — only the Apps Script call
// determines success/failure from the frontend's perspective.

import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface TouristLeadPayload {
  source: "Tourist Landing Page";
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomPreference: string;
}

export interface BusinessLeadPayload {
  source: "Business Landing Page";
  name: string;
  phone: string;
  email: string;
  company: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  roomPreference: string;
}

// ── Production Apps Script endpoint ─────────────────────────────────
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzv7xD5Gt_TXJFUF-nLlSQ1CmhNFaaHZfM7WOj1flNxFn-UxoXYNutN599XfUztiDMcvg/exec";

// ── Internal helper — converts a plain object to URLSearchParams ─────
function toFormBody(data: Record<string, string>): string {
  return Object.entries(data)
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )
    .join("&");
}

// ── Internal helper — POST to Apps Script via no-cors ────────────────
// no-cors means we cannot read the response body; we treat any completed
// network call as a success and rely on the Sheet + email to confirm.
async function postToAppsScript(
  data: Record<string, string>
): Promise<void> {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: toFormBody(data),
    mode: "no-cors",
  });
}

// ── Internal helper — Firestore backup (silent, non-blocking) ────────
async function backupToFirestore(
  data: Record<string, string>
): Promise<void> {
  try {
    if (db) {
      await addDoc(collection(db, "landing_leads"), {
        ...data,
        status: "New",
        createdAt: serverTimestamp(),
      });
    }
  } catch {
    // Firestore backup failure must never surface to the user
  }
}

// ── LeadService ──────────────────────────────────────────────────────
export class LeadService {
  /**
   * Tourist Landing Page → Google Sheet "Tourist Leads" tab
   * Fields: source, name, phone, checkIn, checkOut, guests, roomPreference
   */
  static async submitTouristLead(
    data: TouristLeadPayload
  ): Promise<{ success: boolean }> {
    const payload: Record<string, string> = {
      source: data.source,
      name: data.name,
      phone: data.phone,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      roomPreference: data.roomPreference,
    };

    // Primary: Apps Script → Google Sheet
    await postToAppsScript(payload);

    // Secondary: Firestore backup (non-blocking)
    backupToFirestore(payload);

    return { success: true };
  }

  /**
   * Business Landing Page → Google Sheet "Business Leads" tab
   * Fields: source, name, phone, email, company, checkIn, checkOut, guests, roomPreference
   */
  static async submitBusinessLead(
    data: BusinessLeadPayload
  ): Promise<{ success: boolean }> {
    const payload: Record<string, string> = {
      source: data.source,
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      roomPreference: data.roomPreference,
    };

    // Primary: Apps Script → Google Sheet
    await postToAppsScript(payload);

    // Secondary: Firestore backup (non-blocking)
    backupToFirestore(payload);

    return { success: true };
  }
}
