import { getExpenses, getTotalCost } from "@/actions/expense";
import {
  getInvoices,
  getTotalAmount,
  getTotalShare,
} from "@/actions/getInvices";
import {
  getInvestments,
  getTotalInvestment,
  getTotalPaidAmount,
  getTotalProfitAmount,
} from "@/actions/investment";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const TotalAcounting = async () => {
  const invoices = await getInvoices();
  const investments = await getInvestments();
  const expenses = await getExpenses();

  const deposit = getTotalAmount(invoices) - getTotalInvestment(investments);
  const costs = deposit - getTotalCost(expenses);
  const currentDeposit =
    costs + getTotalPaidAmount(investments) + getTotalProfitAmount(investments);

  const items = [
    { title: "মোট সদস্য-সংখ্যা", value: getEngToBnNumber(invoices.length) },
    { title: "শেয়ার সংখ্যা", value: getEngToBnNumber(getTotalShare(invoices)) },
    {
      title: "শেয়ার বাবদ টোটাল জমা",
      value: formatPrice(getTotalAmount(invoices)),
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
    <div className="mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-6 rounded-2xl shadow-md border border-gray-200`}
        >
          <h3
            className={`text-3xl font-bold ${
              item.highlight && "text-blue-600"
            } ${
              item.value.includes("-") ||
              (item.value.startsWith("০.") && "text-red-500")
            } `}
          >
            {item.value}
          </h3>
          <h4 className={"text-lg text-gray-600 mt-2"}>{item.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default TotalAcounting;
