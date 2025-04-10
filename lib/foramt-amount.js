export const formatPrice = (price) => {
  return Intl.NumberFormat("bn", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
