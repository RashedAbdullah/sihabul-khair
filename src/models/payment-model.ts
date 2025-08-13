import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ member: 1, month: 1 }, { unique: true });

paymentSchema.virtual("formattedMonth").get(function () {
  return this.month.toISOString().slice(0, 7);
});

export const paymentModel =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
