export interface IBankProfit {
  _id?: string;
  amount: number;
  creditedDate: string;
  description?: string;

  // Optional timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
