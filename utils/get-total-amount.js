import { formatPrice } from "@/lib/foramt-amount";

export const getTotalAmount = (amount = []) => {
  const totalAmount = amount.reduce((sum, item) => sum + item, 0);
  return formatPrice(totalAmount);
};
