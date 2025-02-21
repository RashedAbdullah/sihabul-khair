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
      <PageTitle>ইনভেস্টমেন্টস</PageTitle>

      {investments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "কনজিউমার",
                  "এমাউন্ট",
                  "পরিশোধিত",
                  "বকেয়া",
                  "নেওয়ার তারিখ",
                  "পরিশোধের শেষ ডেট",
                  "মুনাফা",
                  "হিসাব",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-6 text-center font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr
                  key={investment.consumerName}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {investment.consumerName}
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {formatPrice(investment.amount)}
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {formatPrice(investment.paidAmount)}
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {formatPrice(investment.amount - investment.paidAmount)}
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {new Date(investment.takenDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {new Date(investment.paymentLastDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {formatPrice(investment.profitAmount)}
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">চলমান</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td className="py-4 px-6 text-gray-800 text-center">মোট</td>
                <td className="py-4 px-6 text-gray-800 text-center">
                  {formatPrice(getTotalInvestment(investments))}
                </td>
                <td className="py-4 px-6 text-gray-800 text-center">
                  {formatPrice(getTotalPaidAmount(investments))}
                </td>
                <td className="py-4 px-6 text-gray-800 text-center">
                  {formatPrice(getTotalDeuAmount(investments))}
                </td>
                <td className="py-4 px-6 text-gray-800"></td>
                <td className="py-4 px-6 text-gray-800"></td>
                <td className="py-4 px-6 text-gray-800 text-center">
                  {formatPrice(getTotalProfitAmount(investments))}
                </td>
                <td className="py-4 px-6 text-gray-800"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          কোনো ইনভেস্টমেন্ট পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default InvestmentPage;
