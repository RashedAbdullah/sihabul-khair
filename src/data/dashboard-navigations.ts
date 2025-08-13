import {
  IconCurrencyTaka,
  IconUsersGroup,
  IconChartDots,
  IconReceipt2,
  IconBuildingBank,
} from "@tabler/icons-react";

export const dashboardNavigations = [
  {
    title: "মাসিক পেমেন্ট",
    url: "/dashboard/amounts",
    icon: IconCurrencyTaka,
  },
  {
    title: "বার্ষিক পেমেন্ট",
    url: "/dashboard/yearly-payments",
    icon: IconCurrencyTaka,
  },
  {
    title: "সদস্যবৃন্দ",
    url: "/dashboard/members",
    icon: IconUsersGroup, // group of people
  },
  {
    title: "ইনভেস্টমেন্টস",
    url: "/dashboard/investments",
    icon: IconChartDots, // investment trend icon
  },
  {
    title: "খরচ-পাতি",
    url: "/dashboard/expenses",
    icon: IconReceipt2, // resembles expenses or receipts
  },
  {
    title: "ব্যাংক প্রফিট",
    url: "/dashboard/bank-profit",
    icon: IconBuildingBank, // for bank-related profit
  },
];
