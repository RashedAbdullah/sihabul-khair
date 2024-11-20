"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateCostForm = ({ singleCost, updateCost }) => {
  const router = useRouter();
  const [cost, setCost] = useState(singleCost.cost);
  const [date, setDate] = useState(singleCost.date);
  const [amount, setAmount] = useState(singleCost.amount);

  const handleUpdateCost = async () => {
    try {
      const updatedCost = {
        cost,
        date,
        amount,
      };
      await updateCost(updatedCost);
      router.push("/expenses");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form action={handleUpdateCost} className="mt-6 space-y-6">
      <div>
        <label
          htmlFor="cost"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          বিবরণ
        </label>
        <input
          required
          type="text"
          id="cost"
          name="cost"
          onChange={(e) => setCost(e.target.value)}
          defaultValue={singleCost.cost}
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
          required
          type="number"
          id="amount"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          defaultValue={singleCost.amount}
          className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-200 focus:outline-none"
          placeholder="খরচের পরিমাণ লিখুন"
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          খরচের তারিখ
        </label>
        <input
          required
          type="date"
          id="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          defaultValue={singleCost.date}
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
  );
};

export default UpdateCostForm;
