import Image from "next/image";
import React from "react";
import { organizationInfo } from "@/data/organization-info";

const InvestmentCategorySection = () => {
  return (
    <div className="container my-20 lg:my-35">
      <div className="lg:grid grid-cols-12">
        <div className="col-span-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-brand" />
            <p className="text-xs lg:text-base">
              {organizationInfo.investment.badge}
            </p>
          </div>
          <h3 className="text-2xl lg:text-5xl lg:leading-[65px]">
            {organizationInfo.investment.title}
          </h3>
        </div>
      </div>

      <div className="grid col-span-1 lg:grid-cols-12 pt-16 gap-6">
        {organizationInfo.investment.types.map((type, index) => (
          <div key={index} className="col-span-3 gap-6 relative">
            <Image
              src={type.background}
              alt="Shop image"
              className="object-cover h-full"
            />
            <div className="w-full absolute bottom-0 bg-[#040404] p-4 text-white">
              <h4 className="text-lg font-medium">{type.title}</h4>
              <p className="text-base">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentCategorySection;
