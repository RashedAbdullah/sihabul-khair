import { organizationInfo } from "@/data/organization-info";
import { summaryService } from "@/services";
import { getEnToBn } from "@/utils/en-to-bn";
import { formatPrice } from "@/utils/formate-price";

const SummarySection = async () => {
  try {
    const summaryData = await summaryService.getSummary();

    const summary = [
      {
        title: "সর্বমোট ইনভেস্ট করা হয়েছে",
        value: formatPrice(summaryData.totalInvestment),
      },
      {
        title: "বকেয়া ইনভেস্ট",
        value: formatPrice(summaryData.currentInvestment),
      },
      // {
      //   title: "মুনাফা বাবদ টোটাল জমা",
      //   value: formatPrice(summaryData.profitDeposits),
      // },
      // {
      //   title: "বকেয়া মুনাফা",
      //   value: formatPrice(
      //     summaryData.totalProfit - summaryData.profitDeposits
      //   ),
      // },
      {
        title: "লাভসহ ইনভেস্ট থেকে জমা",
        value: formatPrice(summaryData.paymentFromInvestment),
      },
      {
        title: "শেয়ার বাবদ টোটাল জমা",
        value: formatPrice(summaryData.paymentsFromShares),
      },
      {
        title: "ব্যাংক প্রফিট",
        value: formatPrice(summaryData.totalBankProfit),
      },
      {
        title: "ব্যাংক ফি ও অনান্য বাবাদ খরচ",
        value: formatPrice(summaryData.totalExpense),
      },
      {
        title: "মোট সদস্য-সংখ্যা",
        value: getEnToBn(summaryData.totalMembers),
      },
      {
        title: "শেয়ার সংখ্যা",
        value: getEnToBn(summaryData.totalShares),
      },
    ];

    return (
      <div className="bg-gradient-to-br from-brand2 to-brand selection:bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Organization Info */}
            <div className="lg:w-5/12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-white rounded-full animate-pulse" />
                  <p className="text-white text-sm lg:text-base font-medium tracking-wide">
                    {organizationInfo.summary.badge}
                  </p>
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  {organizationInfo.summary.title}
                </h3>
                <p className="text-lg text-white/90 font-light leading-relaxed">
                  {organizationInfo.summary.description}
                </p>
              </div>

              {/* Current Deposit Highlight */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-2">
                  {formatPrice(summaryData.currentDeposit)}
                </h2>
                <p className="text-xl text-white/80">বর্তমান জমা</p>
              </div>
            </div>

            {/* Right Column - Summary Stats */}
            <div className="lg:w-7/12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {summary.map((sum, index) => (
                  <div
                    key={index}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <h3 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                      {sum.value}
                    </h3>
                    <p className="text-lg text-white/80">{sum.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching summary:", error);
    return (
      <div className="container flex justify-center items-center bg-red-100/90 text-red-800 p-6 rounded-lg shadow-md">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4 text-red-500"
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
          <p className="text-lg font-medium">
            সারাংশ তথ্য লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </div>
    );
  }
};

export default SummarySection;
