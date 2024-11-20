import { getSingleInvestment, updateInvestMent } from "@/actions/investment";
import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import UpdateInvestmentForm from "@/components/update-investment-form";
import { redirect } from "next/navigation";
import React from "react";

const UpdateSingleInvestmentPage = async ({ params: { slug } }) => {
  const singleInvestment = await getSingleInvestment(slug);
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const handleUpdateInvestment = async (data) => {
    "use server";
    await updateInvestMent(slug, data);
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <PageTitle>ইনভেস্ট আপডেট করুন</PageTitle>
      <UpdateInvestmentForm
        singleInvestment={singleInvestment}
        onUpdateInvestment={handleUpdateInvestment}
      />
    </div>
  );
};

export default UpdateSingleInvestmentPage;
