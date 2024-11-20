"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateInvestmentForm = ({ singleInvestment, onUpdateInvestment }) => {
  const [consumer, setConsumer] = useState(singleInvestment.consumerName);
  const [amount, setAmount] = useState(singleInvestment.amount);
  const [paidAmount, setPaindAmount] = useState(singleInvestment.paidAmount);
  const [takenDate, setTakenDate] = useState(singleInvestment.takenDate);
  const [status, setStatus] = useState(singleInvestment.status);
  const [paymentLastDate, setPaymentLastDate] = useState(
    singleInvestment.paymentLastDate
  );
  const [profitAmount, setProfitAmount] = useState(
    singleInvestment.profitAmount
  );
  const router = useRouter();

  const handleInvestment = async () => {
    try {
      const updatedData = {
        consumerName: consumer,
        amount, paidAmount, takenDate, paymentLastDate, profitAmount, status,
      };

      await onUpdateInvestment(updatedData);
      router.push("/investment");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form action={handleInvestment} className="space-y-4">
      <div>
        <label
          htmlFor="consumerName"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          কনজিউমার
        </label>
        <input
          required
          type="text"
          id="consumerName"
          name="consumerName"
          defaultValue={singleInvestment.consumerName}
          onChange={(e) => setConsumer(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          এমাউন্ট
        </label>
        <input
          required
          type="number"
          id="amount"
          name="amount"
          defaultValue={singleInvestment.amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="paidAmount"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          পরিশোধ করছে
        </label>
        <input
          required
          type="number"
          id="paidAmount"
          name="paidAmount"
          defaultValue={singleInvestment.paidAmount}
          onChange={(e) => setPaindAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="takenDate"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          নেওয়ার তারিখ
        </label>
        <input
          required
          type="date"
          id="takenDate"
          name="takenDate"
          defaultValue={singleInvestment.takenDate}
          onChange={(e) => setTakenDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="paymentLastDate"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          পরিশোধের শেষ ডেট
        </label>
        <input
          required
          type="date"
          id="paymentLastDate"
          name="paymentLastDate"
          defaultValue={singleInvestment.paymentLastDate}
          onChange={(e) => setPaymentLastDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="profitAmount"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          মুনাফা
        </label>
        <input
          required
          type="number"
          id="profitAmount"
          name="profitAmount"
          defaultValue={singleInvestment.profitAmount}
          onChange={(e) => setProfitAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-gray-700 dark:text-gray-300 font-semibold"
        >
          হিসাব
        </label>
        <select
          required
          id="status"
          name="status"
          defaultValue={singleInvestment.status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring focus:ring-slate-500 focus:outline-none"
        >
          <option value="">হিসাব স্ট্যাটাস</option>
          <option value="চলমান">চলমান</option>
          <option value="ক্লোজড">ক্লোজড</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition duration-200"
        >
          সাবমিট করুন
        </button>
      </div>
    </form>
  );
};

export default UpdateInvestmentForm;
