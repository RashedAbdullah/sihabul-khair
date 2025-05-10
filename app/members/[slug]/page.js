import { getMember } from "@/actions/members";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnMonth } from "@/utils/get-eng-to-bn-month";
import { getTotalAmount } from "@/utils/get-total-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import {
  CalendarIcon,
  PhoneIcon,
  UserIcon,
  CoinsIcon,
  UsersIcon,
  ScrollTextIcon,
} from "lucide-react";

const SingleMemberPage = async ({ params: { slug } }) => {
  try {
    const member = await getMember(slug);

    if (!member)
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center border border-gray-200">
            <div className="text-red-500 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-50 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              সদস্য খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-gray-600">
              অনুগ্রহ করে সদস্য তালিকা থেকে সঠিক নাম নির্বাচন করুন
            </p>
          </div>
        </div>
      );

    return (
      <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Member Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            {/* Profile Header */}
            <div className="bg-[#3A4C50] p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {member.name}
                  </h1>
                  <p className="mt-1 flex items-center gap-2 opacity-90">
                    <UserIcon className="h-4 w-4" />
                    {member.post}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-2 text-sm opacity-90">
                  <CalendarIcon className="h-4 w-4" />
                  সদস্যপদ গ্রহণ:{" "}
                  {new Date(member.membershipDate).toLocaleDateString("bn", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  ইং
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <UsersIcon className="h-5 w-5 text-[#3A4C50]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">পিতার নাম</p>
                    <p className="font-medium text-gray-800">{member.father}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <PhoneIcon className="h-5 w-5 text-[#3A4C50]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">মোবাইল</p>
                    <p className="font-medium text-gray-800">
                      <a href={`tel:+88${member.contact}`}>{member.contact}</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CoinsIcon className="h-5 w-5 text-[#3A4C50]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">মোট শেয়ার</p>
                    <p className="font-medium text-gray-800">
                      {getEngToBnNumber(member.totalShare)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ScrollTextIcon className="h-5 w-5 text-[#3A4C50]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">মোট জমা</p>
                    <p className="font-medium text-gray-800">
                      {getTotalAmount(member.amounts.map((am) => am.amount))}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                পরিশোধ হিস্টোরি
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {member.amounts.reverse().map((amount, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium text-gray-800">
                        {getEngToBnMonth(amount.month)}{" "}
                        {getEngToBnNumber(amount.year)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        প্রদান তারিখ:{" "}
                        {new Date(amount.payment_date).toLocaleDateString(
                          "bn",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-[#3A4C50]">
                      {formatPrice(amount.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center border border-gray-200">
          <div className="text-red-500 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-red-50 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            সদস্য লোড করতে সমস্যা হয়েছে
          </h3>
          <p className="text-gray-600">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন
          </p>
        </div>
      </div>
    );
  }
};

export default SingleMemberPage;
