import { getExpenses, getTotalCost } from "@/actions/expense";
import PageTitle from "@/components/page-title";
import { formatPrice } from "@/lib/foramt-amount";

const ExpensesPage = async () => {
  const expenses = await getExpenses();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("bn-BD", options); // format date in Bangla
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800">
      <PageTitle>টুকটাক খরচ</PageTitle>
      <ul className="space-y-2 mt-6">
        {expenses.map((expense, ind) => (
          <li
            key={ind}
            className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm"
          >
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {expense.cost}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(expense.date)} ইং
              </p>
            </div>
            <div>
              <p className="text-xl text-indigo-600 dark:text-indigo-400">
                {formatPrice(expense.amount)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {/* Total Amount Section */}
      <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          মোট খরচ:
        </h3>
        <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
          {formatPrice(getTotalCost(expenses))}
        </p>
      </div>
    </div>
  );
};

export default ExpensesPage;
