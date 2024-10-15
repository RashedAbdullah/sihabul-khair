import mongoose, { Schema } from "mongoose";

const investmentSchema = new Schema(
  {
    consumerName: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    takenDate: {
      type: String,
      required: true,
    },
    paymentLastDate: {
      type: String,
      required: true,
    },
    profitAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const investmentModel =
  mongoose.models.Investment || mongoose.model("Investment", investmentSchema);

export { investmentModel };
