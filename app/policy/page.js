import { policies } from "@/data/policy";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import { FaBalanceScale, FaExclamationTriangle } from "react-icons/fa";

export const metadata = {
  title: "নীতিমালা | সিহাবুল খায়ের ফাউন্ডেশন",
  description:
    "সিহাবুল খায়ের ফাউন্ডেশনের সকল নীতিমালা এখানে বিস্তারিতভাবে দেয়া হয়েছে।",
  keywords: [
    "নীতিমালা",
    "সিহাবুল খায়ের",
    "Islamic policy",
    "financial rules",
    "বাংলা সমিতি",
  ],
  alternates: {
    canonical: "/policy",
  },
  openGraph: {
    title: "নীতিমালা | সিহাবুল খায়ের ফাউন্ডেশন",
    description:
      "সিহাবুল খায়ের ফাউন্ডেশনের সকল নীতিমালা এখানে বিস্তারিতভাবে দেয়া হয়েছে।",
    url: "https://jamiatullatif.com/policy",
    siteName: "সিহাবুল খায়ের ফাউন্ডেশন",
    locale: "bn_BD",
    type: "article",
  },
};

const PolicyPage = () => {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full mb-4">
          <FaBalanceScale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          সংগঠনের নীতিমালা
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          সিহাবুল খায়ের ফাউন্ডেশনের গঠনতন্ত্র ও পরিচালনা সংক্রান্ত বিধি-বিধান
        </p>
      </div>

      {/* Policies List */}
      <div className="space-y-6">
        {policies.map((policy, ind) => {
          const isImportant =
            policy.includes(
              "যথা সময়ে (প্রতি মাসের ১৫ তারিখের ভেতর) নির্ধারিত টাকা দিতে না পারলে দায়িত্বশীলদেরকে অবগত করবে।"
            ) ||
            policy.includes(
              "পরপর দুই মাস নির্ধারিত টাকা না দিলে সে সমিতির আইন লঙ্ঘনকারী হিসেবে বিবেচিত হবে।"
            );

          return (
            <article
              key={ind}
              className={`flex items-start gap-4 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                isImportant
                  ? "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/30 border-l-4 border-red-500"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isImportant
                    ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}
              >
                {isImportant ? (
                  <FaExclamationTriangle className="w-5 h-5" />
                ) : (
                  <span className="font-bold">{getEngToBnNumber(ind + 1)}</span>
                )}
              </div>
              <div>
                <p
                  className={`text-gray-800 dark:text-gray-200 ${
                    isImportant
                      ? "font-medium text-red-700 dark:text-red-300"
                      : ""
                  }`}
                >
                  {policy}
                </p>
                {isImportant && (
                  <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                    গুরুত্বপূর্ণ নীতি
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          সর্বশেষ হালনাগাদ:{" "}
          {getEngToBnNumber(new Date().toLocaleDateString("bn-BD"))}
        </p>
      </div>
    </main>
  );
};

export default PolicyPage;
