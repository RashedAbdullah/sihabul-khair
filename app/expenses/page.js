import { getExpenses, getTotalCost } from "@/actions/expense";
import PageTitle from "@/components/page-title";
import { formatPrice } from "@/lib/foramt-amount";

const ExpensesPage = async () => {
  const expenses = await getExpenses();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("bn-BD", options) + " ইং";
  };

  return (
    <div className="container mx-auto p-6">
      <PageTitle>টুকটাক খরচ</PageTitle>

      {expenses.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">কারণ</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">তারিখ</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-700 dark:text-gray-300">পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4 text-gray-800 dark:text-gray-300">{expense.cost}</td>
                  <td className="py-4 px-4 text-gray-800 dark:text-gray-300">{formatDate(expense.date)}</td>
                  <td className="py-4 px-4 text-right text-indigo-600 dark:text-indigo-400 font-semibold">
                    {formatPrice(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100 dark:bg-gray-700">
                <td className="py-4 px-4 text-gray-800 dark:text-gray-300">মোট</td>
                <td className="py-4 px-4"></td>
                <td className="py-4 px-4 text-right text-indigo-600 dark:text-indigo-400">
                  {formatPrice(getTotalCost(expenses))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">কোনো খরচ নেই</p>
      )}
    </div>
  );
};

export default ExpensesPage;
