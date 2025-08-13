// import { getCurrentUser } from "@/lib/auth";

import HeroSection from "@/components/home/hero-section";
import InvestmentCategorySection from "@/components/home/investment-category-section";
import OurGoalSection from "@/components/home/our-goal-section";
import SummarySection from "@/components/home/summary-section";
// import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  // const user = await getCurrentUser();

  // console.log("Home page current user", user);
  return (
    <div>
      <HeroSection />
      <OurGoalSection />
      <div className="mt-20 lg:mt-35">
        <SummarySection />
      </div>
      <InvestmentCategorySection />
    </div>
  );
}
