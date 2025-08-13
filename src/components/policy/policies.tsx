import React from "react";
import policies from "@/data/policies.json";
import { getEnToBn } from "@/utils/en-to-bn";

const Policies = () => {
  return (
    <div className="container my-16">
      <div className="lg:grid grid-cols-12">
        <div className="col-span-4" />
        <div className="col-span-8">
          <ul>
            {policies.map(
              (policy: { content: string; important?: boolean }, index) => (
                <li key={index}>
                  <div
                    className={`p-6 grid grid-cols-12 border-b border-card-and-Heiglighter ${
                      policy.important && "bg-[#F7D4D4]"
                    }`}
                  >
                    <div className="col-span-1">{getEnToBn(index + 1)}</div>
                    <div
                      className={`${
                        policy.important
                          ? "lg:col-span-9 col-span-11"
                          : "col-span-11"
                      }`}
                    >
                      {policy.content}
                    </div>
                    {policy.important && (
                      <div className="lg:col-span-2 col-span-6 lg:ml-0 ml-4 bg-white rounded-full px-2 lg:text-base text-sm mt-2 lg:mt-2 lg:px-4 py-1 text-center text-[#d74f4f]">
                        গুরুত্বপূর্ণ নীতি
                      </div>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Policies;
