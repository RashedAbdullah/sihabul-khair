import PageTitle from "@/components/page-title";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const InvestmentPage = async () => {
  const investments = [
    {
      _id: "1",
      consumerName: "রহমত উল্লাহ",
      Amount: 5000,
      paidAmount: 2500,
      due: 200,
      takenDate: "2023-01-15",
      paymentLastDate: "2023-06-15",
      profitAmount: 500,
    },
    {
      _id: "2",
      consumerName: "খালিদ সাইফুল্লাহ",
      Amount: 10000,
      paidAmount: 8000,
      due: 200,
      takenDate: "2023-03-20",
      paymentLastDate: "2023-09-20",
      profitAmount: 800,
    },
    {
      _id: "3",
      consumerName: "রায়হান আহমদ",
      Amount: 15000,
      paidAmount: 15000,
      due: 200,
      takenDate: "2022-11-30",
      paymentLastDate: "2023-05-30",
      profitAmount: 1500,
    },
  ];

  const totalAmount = investments.reduce(
    (acc, investment) => acc + investment.Amount,
    0
  );
  const totalPaidAmount = investments.reduce(
    (acc, investment) => acc + investment.paidAmount,
    0
  );
  const totalProfitAmount = investments.reduce(
    (acc, investment) => acc + investment.profitAmount,
    0
  );

  const deuAmount = investments.reduce(
    (acc, investment) => acc + investment.due,
    0
  );

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
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  নেওয়ার তারিখ
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  পরিশোধের শেষ ডেট
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  মুনাফা
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800">
                    {investment.consumerName}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    ৳{getEngToBnNumber(investment.Amount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    ৳{getEngToBnNumber(investment.paidAmount)}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    ৳{getEngToBnNumber(investment.due)}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    {new Date(investment.takenDate).toLocaleDateString("bn")}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    {new Date(investment.paymentLastDate).toLocaleDateString(
                      "bn"
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                    ৳{getEngToBnNumber(investment.profitAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td className="py-4 px-4 text-gray-800">মোট</td>
                <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                  ৳{getEngToBnNumber(totalAmount)}
                </td>
                <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                  ৳{getEngToBnNumber(totalPaidAmount)}
                </td>
                <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                  ৳{getEngToBnNumber(deuAmount)}
                </td>
                <td className="py-4 px-4 text-gray-800"></td>
                <td className="py-4 px-4 text-gray-800"></td>
                <td className="py-4 px-4 text-gray-800 font-Tiro_Bangla">
                  ৳{getEngToBnNumber(totalProfitAmount)}
                </td>
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
