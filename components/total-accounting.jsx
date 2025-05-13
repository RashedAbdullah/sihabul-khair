import { getExpenses, getTotalCost } from "@/actions/expense";
import { getTotalAmount, getTotalShare } from "@/actions/getInvices";
import { Separator } from "@/components/ui/separator";
import {
  getInvestments,
  getTotalInvestment,
  getTotalPaidAmount,
  getTotalProfitAmount,
} from "@/actions/investment";
import { getMembers } from "@/actions/members";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";

import AmountCard from "./amount-card";

const TotalAcounting = async () => {
  const members = await getMembers();
  const investments = await getInvestments();
  const expenses = await getExpenses();

  const deposit = getTotalAmount(members) - getTotalInvestment(investments);
  const costs = deposit - getTotalCost(expenses);
  const currentDeposit =
    costs + getTotalPaidAmount(investments) + getTotalProfitAmount(investments);

  const items = [
    { title: "মোট সদস্য-সংখ্যা", value: getEngToBnNumber(members.length) },
    { title: "শেয়ার সংখ্যা", value: getEngToBnNumber(getTotalShare(members)) },
    {
      title: "শেয়ার বাবদ টোটাল জমা",
      value: formatPrice(getTotalAmount(members)),
    },
    {
      title: "ইনভেস্ট করা হয়েছে",
      value: formatPrice(getTotalInvestment(investments)),
    },
    {
      title: "ইনভেস্ট থেকে জমা",
      value: formatPrice(getTotalPaidAmount(investments)),
    },
    {
      title: "মুনাফা বাবদ টোটাল জমা",
      value: formatPrice(getTotalProfitAmount(investments)),
    },
    {
      title: "ব্যাংক ফি ও অনান্য বাবাদ খরচ",
      value: formatPrice(getTotalCost(expenses)),
    },
    {
      title: "বর্তমান জমা",
      value: formatPrice(currentDeposit),
      highlight: true,
    },
  ];



  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          আর্থিক সারাংশ
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          সিহাবুল খায়ের ফাউন্ডেশনের বর্তমান আর্থিক অবস্থা ও পরিসংখ্যান
        </p>
        <Separator className="mt-4 max-w-md mx-auto bg-gray-300 dark:bg-gray-700" />
      </div>

      <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {items.map((item, index) => (
          <AmountCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TotalAcounting;
