export const formatPrice = (price) => {
  return Intl.NumberFormat("bn", {
    style: "currency",
    currency: "BDT",
  }).format(price);
};
