export interface IExpense {
  _id: string;
  cost: string;
  amount: number;
  date: Date;
  note?: string;

  // Optional timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
