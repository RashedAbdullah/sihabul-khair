import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  father: {
    type: String,
  },
  avatar: {
    type: String,
  },
  contact: {
    type: String,
  },
  nid: {
    type: String,
  },
  post: {
    type: String,
  },
  membershipDate: {
    type: String,
    required: true,
  },
  totalShare: {
    type: Number,
    required: true,
  },
  amounts: [
    {
      amount: {
        type: Number,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      payment_date: {
        type: String,
      },
    },
  ],
  benefits: {
    type: Number,
  },
});

const memberModel =
  mongoose.models.Member || mongoose.model("Member", memberSchema);

export { memberModel };
