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

  console.log(investments[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 container">
      <PageTitle>ইনভেস্টমেন্টস</PageTitle>

      {investments.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-xl bg-white">
          <table className="min-w-full bg-white table-auto border-separate border-spacing-0">
            <thead className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
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
                    className="py-4 px-6 text-center text-lg font-semibold"
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
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } transition duration-300`}
                >
                  <td
                    className={`py-4 px-6 text-gray-800 text-center ${
                      investment.status === "ক্লোজড" && "line-through"
                    }`}
                  >
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
                  <td
                    className={`py-4 px-6 text-gray-800 text-center ${
                      investment.status === "ক্লোজড" && "line-through"
                    }`}
                  >
                    {new Date(investment.takenDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td
                    className={`py-4 px-6 text-gray-800 text-center ${
                      investment.status === "ক্লোজড" && "line-through"
                    }`}
                  >
                    {new Date(investment.paymentLastDate).toLocaleDateString(
                      "bn",
                      options
                    )}{" "}
                    ইং
                  </td>
                  <td className="py-4 px-6 text-gray-800 text-center">
                    {formatPrice(investment.profitAmount)}
                  </td>
                  <td
                    className={`py-4 px-6 text-center font-semibold text-green-500 ${
                      investment.status === "ক্লোজড" && "text-red-500"
                    }`}
                  >
                    {investment.status}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
              <tr className="font-bold">
                <td className="py-4 px-6 text-center">মোট</td>
                <td className="py-4 px-6 text-center">
                  {formatPrice(getTotalInvestment(investments))}
                </td>
                <td className="py-4 px-6 text-center">
                  {formatPrice(getTotalPaidAmount(investments))}
                </td>
                <td className="py-4 px-6 text-center">
                  {formatPrice(getTotalDeuAmount(investments))}
                </td>
                <td className="py-4 px-6 text-center"></td>
                <td className="py-4 px-6 text-center"></td>
                <td className="py-4 px-6 text-center">
                  {formatPrice(getTotalProfitAmount(investments))}
                </td>
                <td className="py-4 px-6 text-center"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          কোনো ইনভেস্টমেন্ট পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
};

export default InvestmentPage;
