import React from "react";
import Link from "next/link";
import { InvestmentService } from "@/services";
import { IInvestment } from "../../../@types/investment";
import { getEnToBn } from "@/utils/en-to-bn";
import { formatPrice } from "@/utils/formate-price";

const Investments = async () => {
  try {
    const { data: investments } = await InvestmentService.getInvestments();

    return (
      <div className="container my-16">
        <div className="lg:grid grid-cols-12">
          <div className="col-span-4" />
          <div className="col-span-8">
            <ul>
              <li>
                <div
                  className={`p-6 grid grid-cols-12 border-b border-card-and-Heiglighter`}
                >
                  <div className="col-span-1 font-semibold">ক্র.</div>
                  <div className="col-span-6 font-semibold">নাম</div>
                  <div className="col-span-2 font-semibold">এমাউন্ট</div>
                  <div className="col-span-2 font-semibold">ধার্যকৃত লাভ</div>
                  <div className="col-span-1 font-semibold">স্ট্যাটাস</div>
                </div>
              </li>
              {investments.map((investment: IInvestment, index: number) => (
                <li key={index}>
                  <Link
                    href={`/investments/${investment._id}`}
                    className={`p-6 grid grid-cols-12 border-b border-card-and-Heiglighter hover:bg-card-and-Heiglighter transition-colors duration-300 ${
                      investment.status === "Closed" && "line-through"
                    }`}
                  >
                    <div className="col-span-1 flex items-center justify-start">
                      <div
                        className={`h-8 w-8 text-white rounded-full flex justify-center items-center ${
                          investment.status === "Closed"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {getEnToBn(index + 1)}
                      </div>
                    </div>
                    <div className="col-span-6">{investment.investee}</div>
                    <div className="col-span-2">
                      <p>{formatPrice(investment.investedAmount)}</p>
                      {investment.instalments && (
                        <p className="text-sm text-weak">
                          {getEnToBn(investment.instalments)} কিস্তি
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      {formatPrice(investment.profit ?? 0)}
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div
                        className={`${
                          investment.status === "Closed"
                            ? "bg-red-500 px-2 py-1 rounded-full text-xs text-white"
                            : "bg-green-500 px-2 py-1 rounded-full text-xs text-white"
                        }`}
                      >
                        {investment.status === "Closed" ? "ক্লোজড" : "চলমান"}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch investments:", error);
    return <div>Error loading investments.</div>;
  }
};

export default Investments;
