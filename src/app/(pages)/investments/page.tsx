import HeroSection from "@/components/common/hero-section";
import mosque from "@/assets/mosque.jpg";
import React from "react";
import InvestmentSummary from "@/components/investments/investment-summary";
import Investments from "@/components/investments/investments";

const InvestmentsPage = () => {
  return (
    <div>
      <HeroSection
        title="ইনভেস্টমেন্টস"
        badge="শরিয়াহ সম্মত বিনিয়োগের বিস্তারিত তথ্য ও পরিসংখ্যান"
        description=""
        image={mosque}
      />
      <InvestmentSummary />
      <Investments />
    </div>
  );
};

export default InvestmentsPage;
