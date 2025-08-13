import CommonHeader from "@/components/common/common-header";
import HeroSection from "@/components/common/hero-section";
import Members from "@/components/members/members";
import React from "react";
import mosque from "@/assets/mosque.jpg";

const MembersPage = () => {
  return (
    <div>
      <HeroSection
        badge="যাদের মাধ্যমে আমাদের পথচলা"
        description="আমাদের সম্মানিত সদস্যবৃন্দ। যাদের মাধ্যমে আমাদের পথচলা। যাদেরকে নিয়ে এই সংগঠন স্বপ্ন দেখে নতুন কিছু করার, অনেককিছু জয় করার।"
        title="সদস্যবৃন্দ"
        image={mosque}
      />
      <CommonHeader
        title="সকল সদস্য"
        description="আমাদের সম্মানিত সদস্যবৃন্দ। যাদের মাধ্যমে আমাদের পথচলা। যাদেরকে নিয়ে এই সংগঠন স্বপ্ন দেখে নতুন কিছু করার, অনেককিছু জয় করার।"
      />
      <Members />
    </div>
  );
};

export default MembersPage;
