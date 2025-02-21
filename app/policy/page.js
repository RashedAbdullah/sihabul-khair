import PageTitle from "@/components/page-title";
import { policies } from "@/data/policy";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const PolicyPage = () => {
  return (
    <div className="container mx-auto p-6">
      <PageTitle>নীতিমালা</PageTitle>
      <div className="mt-6 space-y-4">
        {policies.map((policy, ind) => {
          const isImportant =
            policy.includes(
              "যথা সময়ে (প্রতি মাসের ১৫ তারিখের ভেতর) নির্ধারিত টাকা দিতে না পারলে দায়িত্বশীলদেরকে অবগত করবে।"
            ) ||
            policy.includes(
              "পরপর দুই মাস নির্ধারিত টাকা না দিলে সে সমিতির আইন লঙ্ঘনকারী হিসেবে বিবেচিত হবে।"
            );

          return (
            <div key={ind} className="flex items-start gap-3">
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {getEngToBnNumber(ind + 1)}.
              </span>
              <p
                className={`text-gray-800 dark:text-gray-300 ${
                  isImportant ? "font-semibold text-red-700" : ""
                }`}
              >
                {policy}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyPage;
