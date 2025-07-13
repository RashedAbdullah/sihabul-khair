import { getExpenses } from "@/actions/expense";
import { auth } from "@/auth";
import { formatPrice } from "@/lib/foramt-amount";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UpdateCostListPage = async () => {
   const session = await auth();
   if (!session) {
     redirect("/signin");
   }
  const costList = await getExpenses();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
        খরচের তালিকা
      </h1>
      <ul className="space-y-4 max-w-3xl mx-auto">
        {costList.map((expense) => (
          <li
            key={expense.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                <span className="font-bold">খরচ:</span> {expense.cost}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">পরিমাণ:</span>{" "}
                {formatPrice(expense.amount)} টাকা
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold">তারিখ:</span>{" "}
                {new Date(expense.date).toLocaleDateString("bn")}
              </p>
            </div>
            <Link
              href={`/update-cost/${expense.id}`}
              className="inline-block text-center bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-4 py-2 rounded-md shadow hover:opacity-90 focus:ring focus:ring-indigo-300 focus:outline-none"
            >
              আপডেট করুন
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateCostListPage;
