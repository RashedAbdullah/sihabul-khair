import { organizationInfo } from "@/data/organization-info";
import React from "react";

const PolicyHeader = () => {
  return (
    <div className="container lg:mt-36 mt-20">
      {" "}
      <div>
        <h2 className="text-2xl lg:text-5xl font-medium">
         {organizationInfo.policy.subTitle}
        </h2>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-12">
        <div className="lg:col-span-4 col-span-0" />
        <div className="lg:col-span-5 col-span-4 text-justify mt-2 lg:mt-12">
          <p className="text-weak text-base">
            {organizationInfo.policy.subDescription}
          </p>
        </div>
        <div className="lg:col-span-4 col-span-0" />
      </div>
    </div>
  );
};

export default PolicyHeader;
