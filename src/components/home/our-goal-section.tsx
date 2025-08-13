import { organizationInfo } from "@/data/organization-info";
import React from "react";

const OurGoalSection = () => {
  return (
    <div className="container lg:mt-36 mt-20">
      <div>
        <h2 className="text-2xl lg:text-5xl font-medium">
          {organizationInfo.goal.title}
        </h2>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <div className="lg:col-span-4 col-span-0" />
        <div className="lg:col-span-6 col-span-4 text-justify mt-2 lg:mt-12">
          <p className="text-weak text-base">
            {organizationInfo.goal.description}
          </p>
        </div>
        <div className="lg:col-span-2 col-span-0" />
      </div>
      <div className="lg:grid grid-cols-12 gap-6 mt-8 lg:mt-16 lg:space-y-0 space-y-4">
        {organizationInfo.goal.types.map((type, index) => (
          <div key={index} className="col-span-4 bg-card-and-Heiglighter p-8">
            <div className="flex flex-col gap-32">
              <div className="flex items-center gap-2">
                {type.icon}
                <h3 className="text-3xl font-medium">{type.title}</h3>
              </div>
              <div>
                <p className="text-justify text-[14px] text-weak">
                  {type.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurGoalSection;
