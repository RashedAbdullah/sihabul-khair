import months from "@/data/months.json";

export const getEngToBnMonth = (en_month) => {
  const month = months.find((mnt) => mnt.month === en_month);
  return month.month_bn;
}