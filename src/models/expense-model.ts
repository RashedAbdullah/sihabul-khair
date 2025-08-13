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
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

expenseSchema.index({ date: 1 });

const expenseModel =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export { expenseModel };
