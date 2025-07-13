import { createNewInvest } from "@/actions/investment";
import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import { redirect } from "next/navigation";

const NewInvestPage = async() => {
   const session = await auth();
   if (!session) {
     redirect("/signin");
   }
  const handleNewInvest = async (foromData) => {
    "use server";
    try {
      const data = {
        consumerName: foromData.get("consumerName"),
        amount: Number(foromData.get("amount")),
        paidAmount: Number(foromData.get("paidAmount")),
        takenDate: foromData.get("takenDate"),
        paymentLastDate: foromData.get("paymentLastDate"),
        profitAmount: Number(foromData.get("profitAmount")),
        status: foromData.get("status"),
      };

      await createNewInvest(data);
      redirect("/investment");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <PageTitle>নতুন ইনভেস্ট</PageTitle>
      <form action={handleNewInvest} className="space-y-4">
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
    </div>
  );
};

export default NewInvestPage;
