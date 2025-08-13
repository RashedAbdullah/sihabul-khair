export const formatPrice = (price: number) => {
  return Intl.NumberFormat("bn", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
