import { policies } from "@/data/policy";
import { getEngToBnNumber } from "@/utils/getEngToBn";

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
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        নীতিমালা
      </h1>

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
              className={`flex items-start gap-3 p-4 rounded-lg ${
                isImportant
                  ? "bg-red-50 border-l-4 border-red-600"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {getEngToBnNumber(ind + 1)}.
              </span>
              <p
                className={`text-gray-800 dark:text-gray-200 ${
                  isImportant
                    ? "font-semibold text-red-700 dark:text-red-400"
                    : ""
                }`}
              >
                {policy}
              </p>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default PolicyPage;
