import { Types } from "mongoose";

export interface IYearlyPayment {
  member: Types.ObjectId;
  amount: number;
  title: string;
  paymentDate: string;

  // Optional timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
