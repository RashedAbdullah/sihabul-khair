import { getTotalAmount } from "@/utils/get-total-amount";
import { getEngToBnMonth } from "@/utils/get-eng-to-bn-month";
import { formatPrice } from "@/lib/foramt-amount";
import Link from "next/link";
import { getMembers } from "@/actions/members";

const MonthlyDetails = async () => {
  const members = await getMembers();
  return (
    <div className="container mx-auto px-2 py-4 max-w-4xl">
      <h1 className="text-xl font-bold text-center mb-4">
        মাসিক অর্থের সারাংশ
      </h1>

      <div className="grid gap-4">
        {members.map((member) => (
          <div key={member.name} className="bg-white rounded-lg shadow p-3">
            <div className="flex justify-between items-center mb-2 border-b pb-2">
              <Link href="/">
                <h2 className="font-semibold">{member.name}</h2>
              </Link>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                মোট: {getTotalAmount(member.amounts.map((a) => a.amount))}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
              {member.amounts.reverse().map((amount) => (
                <div key={amount.month} className="border p-2 rounded">
                  <div className="font-medium">
                    {getEngToBnMonth(amount.month)}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {new Date(amount.payment_date).toLocaleDateString("bn", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-green-600 font-medium mt-1">
                    {formatPrice(amount.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-100 p-3 rounded-lg text-right font-bold">
          সর্বমোট:{" "}
          {formatPrice(
            members.reduce(
              (total, member) =>
                total + member.amounts.reduce((a, b) => a + b.amount, 0),
              0
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyDetails;
