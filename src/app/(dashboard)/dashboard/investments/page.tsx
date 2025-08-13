import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateInvestment from "@/components/dashboard/investments/create-investment";
import UpdateInvestment from "@/components/dashboard/investments/update-investment";
import { InvestmentService, memberService } from "@/services";
import AddInstalmentForm from "@/components/dashboard/investments/add-instalment";

const InvestmentsPage = async () => {
  try {
    const { data: investments } = await InvestmentService.getInvestments();
    const { data: members } = await memberService.getMembers();

    return (
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">বিনিয়োগ ব্যবস্থাপনা</h2>
        <Tabs defaultValue="instalment">
          <TabsList className="grid grid-cols-3 w-full">
            {investments.length > 0 && (
              <TabsTrigger value="instalment">কিস্তি পরিশোধ</TabsTrigger>
            )}
            <TabsTrigger value="add">নতুন বিনিয়োগ</TabsTrigger>
            {investments.length > 0 && (
              <TabsTrigger value="update">বিনিয়োগ আপডেট</TabsTrigger>
            )}
          </TabsList>

          {/* Add Investment Tab */}
          {investments.length > 0 && (
            <TabsContent value="instalment" className="mt-6">
              <AddInstalmentForm
                investments={JSON.parse(JSON.stringify(investments))}
              />
            </TabsContent>
          )}

          {/* Add Investment Tab */}
          <TabsContent value="add" className="mt-6">
            <CreateInvestment members={JSON.parse(JSON.stringify(members))} />
          </TabsContent>

          {/* Update Investment Tab */}
          {investments.length > 0 && (
            <TabsContent value="update" className="mt-6">
              <UpdateInvestment
                investments={JSON.parse(JSON.stringify(investments))}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch investments:", error);
    return <div>Error loading investments.</div>;
  }
};

export default InvestmentsPage;
