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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <PageTitle>টুকটাক খরচ</PageTitle>

      {expenses.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-lg">
                  বিবরণ
                </th>
                <th className="py-3 px-4 text-left font-semibold text-lg">
                  তারিখ
                </th>
                <th className="py-3 px-4 text-right font-semibold text-lg">
                  পরিমাণ
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
                >
                  <td className="py-4 px-4 text-gray-800 dark:text-gray-300">
                    {expense.cost}
                  </td>
                  <td className="py-4 px-4 text-gray-800 dark:text-gray-300">
                    {formatDate(expense.date)}
                  </td>
                  <td className="py-4 px-4 text-right text-indigo-600 dark:text-indigo-400 font-semibold">
                    {formatPrice(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <tr className="font-bold">
                <td className="py-4 px-4">
                  মোট
                </td>
                <td className="py-4 px-4"></td>
                <td className="py-4 px-4 text-right">
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
