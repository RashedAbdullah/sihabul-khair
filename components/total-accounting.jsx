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

  return (
    <div className="flex lg:flex-row flex-col justify-between container mt-10 flex-wrap">
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">{getEngToBnNumber(invoices.length)}</h3>
        <h3>মোট সদস্য-সংখ্যা</h3>
      </div>
      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">
          {getEngToBnNumber(getTotalShare(invoices))}
        </h3>
        <h3>শেয়ার সংখ্যা</h3>
      </div>

      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">{formatPrice(getTotalAmount(invoices))}</h3>
        <h3>শেয়ার বাবদ টোটাল জমা</h3>
      </div>

      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">
          {formatPrice(getTotalInvestment(investments))}
        </h3>
        <h3>ইনভেস্ট করা হয়েছে</h3>
      </div>

      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">
          {formatPrice(getTotalPaidAmount(investments))}
        </h3>
        <h3>ইনভেস্ট থেকে জমা</h3>
      </div>

      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">
          {formatPrice(getTotalProfitAmount(investments))}
        </h3>
        <h3>মুনাফা বাবদ টোটাল জমা</h3>
      </div>

      <div className="lg:border-r-2 border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl">{formatPrice(getTotalCost(expenses))}</h3>
        <h3>ব্যাংক ফি ও অনান্য বাবাদ খরচ</h3>
      </div>

      <div className="lg:border-r-2 border-black border-b-2 lg:hidden md:block"></div>
      <div className="p-4 md:w-full lg:w-1/2">
        <h3 className="text-4xl font-semibold">
          {formatPrice(currentDeposit)}
        </h3>
        <h3>বর্তমান জমা</h3>
      </div>
    </div>
  );
};

export default TotalAcounting;
