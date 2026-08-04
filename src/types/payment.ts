export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  method: "razorpay" | "upi" | "card" | "netbanking"
  status: "pending" | "success" | "failed" | "refunded"
  transactionId?: string
  createdAt: string
}
