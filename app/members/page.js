import { getMembers } from "@/actions/members";
import { getTotalAmount } from "@/utils/get-total-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import {
  User2Icon,
  CalendarDaysIcon,
  CoinsIcon,
  BadgeIcon,
} from "lucide-react";
import Link from "next/link";

const MembersPage = async () => {
  try {
    const members = await getMembers();

    return (
      <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
            সদস্যবৃন্দ
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <Link
                href={`/members/${member?._id || "#"}`}
                key={member.name}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:bg-gray-100 transition-all duration-300 hover:scale-95 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-[#3A4C50] text-white p-3 rounded-full">
                    <User2Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#3A4C50] transition-colors duration-200">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.post}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <BadgeIcon className="h-4 w-4 text-[#3A4C50]" />
                    মোট শেয়ার:{" "}
                    <span className="font-medium text-gray-800">
                      {getEngToBnNumber(member.totalShare)}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CoinsIcon className="h-4 w-4 text-[#3A4C50]" />
                    মোট জমা:{" "}
                    <span className="font-medium text-gray-800">
                      {getTotalAmount(member.amounts.map((am) => am.amount))}{" "}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4 text-[#3A4C50]" />
                    সদস্যপদ গ্রহণ:{" "}
                    <span className="text-gray-700">
                      {new Date(member.membershipDate).toLocaleDateString(
                        "bn",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      ইং
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (err) {
    return (
      <div className="text-center text-red-500 mt-10">
        সদস্য তথ্য লোড করতে সমস্যা হয়েছে।
      </div>
    );
  }
};

export default MembersPage;
