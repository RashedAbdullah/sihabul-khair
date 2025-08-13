// models/PaymentSession.ts
import mongoose, { Schema } from "mongoose";

const yearlyPaymentSchema = new Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const yearlyPaymentModel =
  mongoose.models.YearlyPayment ||
  mongoose.model("YearlyPayment", yearlyPaymentSchema);
