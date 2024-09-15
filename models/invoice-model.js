import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema({
  invoice: {
    type: Number,
    required: true,
  },
  memberName: {
    type: String,
    required: true,
  },

  post: {
    type: String,
    required: true,
  },
  totalShare: {
    type: Number,
    required: true,
  },
  membershipDate: {
    type: String,
    required: true,
  },
  July: {
    type: Number,
    required: true,
  },

  August: {
    type: Number,
    required: true,
  },
  September: {
    type: Number,
    required: true,
  },
  October: {
    type: Number,
    required: true,
  },

  November: {
    type: Number,
    required: true,
  },
  December: {
    type: Number,
    required: true,
  },
  January: {
    type: Number,
    required: true,
  },
  February: {
    type: Number,
    required: true,
  },
  March: {
    type: Number,
    required: true,
  },
  April: {
    type: Number,
    required: true,
  },
  May: {
    type: Number,
    required: true,
  },
  June: {
    type: Number,
    required: true,
  },
});

const invoiceModel =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

export { invoiceModel };
