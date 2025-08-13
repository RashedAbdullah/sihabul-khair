import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateYearlyPayment from "@/components/dashboard/yearly-payments/create-yearly-payments";
import UpdateYearlyPayment from "@/components/dashboard/yearly-payments/update-yearly-payments";
import YearlyPayments from "@/components/dashboard/yearly-payments/yearly-payments";
import { memberService } from "@/services";

const YearlyPaymentsPage = async () => {
  try {
    const { data: members } = await memberService.getMembers();
    return (
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">বার্ষিক পেমেন্ট ব্যবস্থাপনা</h2>
        <Tabs defaultValue="add">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="add">নতুন পেমেন্ট যুক্ত করুন</TabsTrigger>
            <TabsTrigger value="update">পেমেন্ট আপডেট করুন</TabsTrigger>
          </TabsList>

          {/* Add Profit Tab */}
          <TabsContent value="add" className="mt-6">
            <CreateYearlyPayment
              members={JSON.parse(JSON.stringify(members))}
            />
          </TabsContent>

          {/* Update Profit Tab */}
          <TabsContent value="update" className="mt-6">
            <UpdateYearlyPayment />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch yearly payments:", error);
    return <div>Error loading yearly payments.</div>;
  }
};

export default YearlyPaymentsPage;
