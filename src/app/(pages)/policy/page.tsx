import HeroSection from "@/components/policy/hero-section";
import Policies from "@/components/policy/policies";
import PolicyHeader from "@/components/policy/policy-header";
import React from "react";

const PolicyPage = () => {
  return (
    <div>
      <HeroSection />
      <PolicyHeader />
      <Policies />
    </div>
  );
};

export default PolicyPage;
