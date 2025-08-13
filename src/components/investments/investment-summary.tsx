import { formatPrice } from "@/utils/formate-price";
import React from "react";
import { ChartSpline, Coins, PackageCheck } from "lucide-react";
import { summaryService } from "@/services";

const InvestmentSummary = async () => {
  const summary = await summaryService.getSummary();
  console.log(summary);
  const summaryData = [
    {
      title: "মোট ইনভেস্ট করা হয়েছে",
      value: summary.totalInvestment,
      icon: <ChartSpline className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "পরিশোধিত",
      value: summary.paymentFromInvestment,
      icon: <PackageCheck className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "বকেয়া",
      value: summary.currentInvestment,
      icon: <ChartSpline className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "মোট মুনাফা",
      value: summary.profitDeposits,
      icon: <Coins className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="container pt-10">
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
  );
};

export default InvestmentSummary;
