import { Types } from "mongoose";

export interface IPayment {
  member: Types.ObjectId;
  payment: number;
  month: string;
  paymentDate: string;

  // Optional timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Virtuals
  formattedMonth?: string;
}
