import {
  getInvestments,
  getTotalDeuAmount,
  getTotalInvestment,
  getTotalPaidAmount,
  getTotalProfitAmount,
} from "@/actions/investment";
import PageTitle from "@/components/page-title";
import { formatPrice } from "@/lib/foramt-amount";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaCalendarTimes,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const InvestmentPage = async () => {
  const investments = await getInvestments();
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Summary cards data
  const summaryData = [
    {
      title: "মোট ইনভেস্টমেন্ট",
      value: getTotalInvestment(investments),
      icon: <FaChartLine className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "পরিশোধিত",
      value: getTotalPaidAmount(investments),
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "বকেয়া",
      value: getTotalDeuAmount(investments),
      icon: <MdOutlinePendingActions className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "মোট মুনাফা",
      value: getTotalProfitAmount(investments),
      icon: <RiMoneyDollarCircleLine className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 container">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 shadow-sm">
                  <FaChartLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  ইনভেস্টমেন্টস
                </span>
              </div>
            </h2>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            শরিয়াহ সম্মত বিনিয়োগের বিস্তারিত তথ্য ও পরিসংখ্যান
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl shadow-sm border ${
                item.color.split(" ")[0]
              } border-opacity-30`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {formatPrice(item.value)}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${item.color} bg-opacity-30`}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {investments.length > 0 ? (
        <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    {
                      name: "কনজিউমার",
                      icon: <FaMoneyBillWave className="w-4 h-4" />,
                    },
                    {
                      name: "এমাউন্ট",
                      icon: <RiMoneyDollarCircleLine className="w-4 h-4" />,
                    },
                    {
                      name: "পরিশোধিত",
                      icon: <FaCalendarCheck className="w-4 h-4" />,
                    },
                    {
                      name: "বকেয়া",
                      icon: <MdOutlinePendingActions className="w-4 h-4" />,
                    },
                    {
                      name: "নেওয়ার তারিখ",
                      icon: <FaCalendarCheck className="w-4 h-4" />,
                    },
                    {
                      name: "পরিশোধের শেষ ডেট",
                      icon: <FaCalendarTimes className="w-4 h-4" />,
                    },
                    {
                      name: "মুনাফা",
                      icon: <FaChartLine className="w-4 h-4" />,
                    },
                    { name: "হিসাব", icon: null },
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-1">
                        {header.icon}
                        {header.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((investment) => (
                  <tr
                    key={investment.consumerName}
                    className={`hover:bg-gray-50 transition-colors ${
                      investment.status === "ক্লোজড" ? "bg-gray-100" : ""
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        investment.status === "ক্লোজড"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-3 w-3 rounded-full mr-3 ${
                            investment.status === "ক্লোজড"
                              ? "bg-gray-400"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <div
                            className={`font-medium ${
                              investment.status === "ক্লোজড"
                                ? "line-through"
                                : ""
                            }`}
                          >
                            {investment.consumerName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {formatPrice(investment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {formatPrice(investment.paidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {formatPrice(investment.amount - investment.paidAmount)}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        investment.status === "ক্লোজড"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {new Date(investment.takenDate).toLocaleDateString(
                        "bn",
                        options
                      )}{" "}
                      ইং
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        investment.status === "ক্লোজড"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {new Date(investment.paymentLastDate).toLocaleDateString(
                        "bn",
                        options
                      )}{" "}
                      ইং
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {formatPrice(investment.profitAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          investment.status === "ক্লোজড"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {investment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr className="font-medium text-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">মোট</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(getTotalInvestment(investments))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(getTotalPaidAmount(investments))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(getTotalDeuAmount(investments))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(getTotalProfitAmount(investments))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaChartLine className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            কোনো ইনভেস্টমেন্ট পাওয়া যায়নি
          </h3>
          <p className="text-gray-500">নতুন ইনভেস্টমেন্ট যোগ করুন</p>
        </div>
      )}
    </div>
  );
};

export default InvestmentPage;
