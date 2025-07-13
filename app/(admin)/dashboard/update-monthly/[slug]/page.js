import { getMember, upsertMonthlyPayment } from "@/actions/members";
import { Button } from "@/components/ui/button";
import months from "@/data/months.json";

const UpdateTheMonthlyPayment = async ({ params: { slug } }) => {
  try {
    const member = await getMember(slug);

    if (!member) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            সদস্য পাওয়া যায়নি
          </div>
        </div>
      );
    }

    const handleUpdateMonthlyPayment = async (formdata) => {
      "use server";
      try {
        const month = formdata.get("month");
        const year = formdata.get("year");
        const amount = Number(formdata.get("amount"));
        const payment_date = formdata.get("payment_date");

        if (!month || !year || !amount || !payment_date) {
          throw new Error("সমস্ত তথ্য প্রদান করুন");
        }

        if (amount < 1500) {
          throw new Error("ন্যূনতম ১৫০০ টাকা প্রদান করতে হবে");
        }

        const updatedPayment = {
          month,
          year,
          amount,
          payment_date,
        };

        await upsertMonthlyPayment(slug, updatedPayment);

        return { success: true, message: "সফলভাবে আপডেট করা হয়েছে" };
      } catch (err) {
        return { success: false, message: err.message || "একটি সমস্যা হয়েছে" };
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{member.name}</h2>
            <p className="mt-2 text-lg text-gray-600">ইবনে {member.father}</p>
          </div>

          <div className="space-y-6">
            {[...member.amounts].reverse().map((amount, ind) => (
              <form
                action={handleUpdateMonthlyPayment}
                key={ind}
                className="bg-white shadow rounded-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor={`month-${ind}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      মাস:
                    </label>
                    <select
                      id={`month-${ind}`}
                      name="month"
                      defaultValue={amount.month}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      {months.map((month) => (
                        <option key={month.month} value={month.month}>
                          {month.month_bn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`year-${ind}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      বছর:
                    </label>
                    <input
                      type="number"
                      id={`year-${ind}`}
                      name="year"
                      defaultValue={amount.year}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`payment_date-${ind}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      পরিশোধের তারিখ:
                    </label>
                    <input
                      type="date"
                      id={`payment_date-${ind}`}
                      name="payment_date"
                      defaultValue={
                        new Date(amount.payment_date)
                          .toISOString()
                          .split("T")[0]
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`amount-${ind}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      পরিমাণ:
                    </label>
                    <input
                      type="number"
                      id={`amount-${ind}`}
                      name="amount"
                      defaultValue={amount.amount}
                      min={1500}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" className="px-4 py-2">
                    আপডেট করুন
                  </Button>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          একটি ত্রুটি হয়েছে: {err.message}
        </div>
      </div>
    );
  }
};

export default UpdateTheMonthlyPayment;
