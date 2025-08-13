export const formatDateToBangla = (
  date: Date | string,
  isOnlyYearAndMonth?: boolean
) => {
  if (isOnlyYearAndMonth) {
    return new Date(date).toLocaleDateString("bn-BD", {
      month: "long",
      year: "numeric",
    });
  }
  return new Date(date).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
