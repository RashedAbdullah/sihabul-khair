import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    cost: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const expenseModel =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export { expenseModel };
