import mongoose, { Schema } from "mongoose";

const bankProfitSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    creditedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      default: "ব্যাংক থেকে আসা প্রফিট",
    },
  },
  { timestamps: true }
);

const BankProfitModel =
  mongoose.models.BankProfit || mongoose.model("BankProfit", bankProfitSchema);

export default BankProfitModel;
