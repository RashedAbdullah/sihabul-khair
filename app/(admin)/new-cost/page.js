import { createExpense } from "@/actions/expense";
import PageTitle from "@/components/page-title";
import { redirect } from "next/navigation";
import React from "react";

const NewCostPage = () => {
  const handleNewCost = async (formData) => {
    "use server";
    try {
      const data = {
        cost: formData.get("cost"),
        amount: formData.get("amount"),
        date: formData.get("date"),
      };

      await createExpense(data);
      redirect("/expenses");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <PageTitle>নতুন খরচ যুক্ত করুন</PageTitle>
      <form action={handleNewCost} className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="cost"
            className="block text-gray-700 dark:text-gray-300 font-semibold"
          >
            বিবরণ
          </label>
          <input
            type="text"
            id="cost"
            name="cost"
            className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-200 focus:outline-none"
            placeholder="খরচের বিবরণ লিখুন"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 dark:text-gray-300 font-semibold"
          >
            পরিমাণ
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-200 focus:outline-none"
            placeholder="খরচের পরিমাণ লিখুন"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-gray-700 dark:text-gray-300 font-semibold"
          >
            তারিখ
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-200 focus:outline-none"
            placeholder="খরচের পরিমাণ লিখুন"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition duration-200"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCostPage;
