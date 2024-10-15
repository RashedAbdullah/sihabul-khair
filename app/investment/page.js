import {
  getInvestments,
  getTotalDeuAmount,
  getTotalInvestment,
  getTotalPaidAmount,
  getTotalProfitAmount,
} from "@/actions/investment";
import PageTitle from "@/components/page-title";
import { formatPrice } from "@/lib/foramt-amount";

const InvestmentPage = async () => {
  const investments = await getInvestments();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div className="min-h-screen p-8 container">
      <PageTitle> ইনভেস্টমেন্টস</PageTitle>

      {investments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  কনজিউমার
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  এমাউন্ট
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  পরিশোধিত
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  বকেয়া
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 text-nowrap">
                  নেওয়ার তারিখ
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 text-nowrap">
                  পরিশোধের শেষ ডেট
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  মুনাফা
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  হিসাব
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr
                  key={investment.consumerName}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-gray-800 text-nowrap">
                    {investment.consumerName}
                  </td>
                  <td className="py-4 px-4 text-gray-800">
                    {formatPrice(investment.amount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800">
                    {formatPrice(investment.paidAmount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800">
                    {formatPrice(investment.amount - investment.paidAmount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800 text-nowrap">
                    {new Date(investment.takenDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td className="py-4 px-4 text-gray-800 text-nowrap">
                    {new Date(investment.paymentLastDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td className="py-4 px-4 text-gray-800">
                    {formatPrice(investment.profitAmount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800">চলমান</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td className="py-4 px-4 text-gray-800">মোট</td>
                <td className="py-4 px-4 text-gray-800">
                  {formatPrice(getTotalInvestment(investments))}
                </td>
                <td className="py-4 px-4 text-gray-800">
                  {formatPrice(getTotalPaidAmount(investments))}
                </td>
                <td className="py-4 px-4 text-gray-800">
                  {formatPrice(getTotalDeuAmount(investments))}
                </td>
                <td className="py-4 px-4 text-gray-800"></td>
                <td className="py-4 px-4 text-gray-800"></td>
                <td className="py-4 px-4 text-gray-800">
                  {formatPrice(getTotalProfitAmount(investments))}
                </td>
                <td className="py-4 px-4 text-gray-800"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No investments found.</p>
      )}
    </div>
  );
};

export default InvestmentPage;
