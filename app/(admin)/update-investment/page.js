import { getInvestments } from "@/actions/investment";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UpdateInvestmentPage = async () => {
  const investmentsList = await getInvestments();
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
        বিনিয়োগ তালিকা
      </h1>
      <ul className="space-y-4 max-w-4xl mx-auto">
        {investmentsList.map((investment) => (
          <li
            key={investment.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                <span className="font-bold">গ্রাহকের নাম:</span>{" "}
                {investment.consumerName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">বিনিয়োগ:</span>{" "}
                {investment.amount.toLocaleString("bn")} টাকা
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">পরিশোধিত:</span>{" "}
                {investment.paidAmount.toLocaleString("bn")} টাকা
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">নেওয়ার তারিখ:</span>{" "}
                {new Date(investment.takenDate).toLocaleDateString("bn")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">শেষ পরিশোধের তারিখ:</span>{" "}
                {new Date(investment.paymentLastDate).toLocaleDateString("bn")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">অবস্থা:</span> {investment.status}
              </p>
            </div>
            <Link
              href={`/update-investment/${investment.id}`}
              className="inline-block text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-md shadow hover:opacity-90 focus:ring focus:ring-green-300 focus:outline-none"
            >
              আপডেট
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateInvestmentPage;
