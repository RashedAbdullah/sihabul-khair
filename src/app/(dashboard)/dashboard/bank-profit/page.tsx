import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateProfit from "@/components/dashboard/bank-profit/update-profit";
import CreateProfit from "@/components/dashboard/bank-profit/create-profit";
import BankProfits from "@/components/dashboard/bank-profit/profit";
import { BankProfitService } from "@/services";

const BankProfit = async () => {
  try {
    const { data: bankProfits } = await BankProfitService.getBankProfits();

    return (
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">ব্যাংক প্রফিট ব্যবস্থাপনা</h2>
        <Tabs defaultValue="view">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="view">প্রফিট দেখুন</TabsTrigger>
            <TabsTrigger value="add">নতুন প্রফিট</TabsTrigger>
            <TabsTrigger value="update">প্রফিট আপডেট</TabsTrigger>
          </TabsList>

          {/* View Profits Tab */}
          <TabsContent value="view" className="mt-6">
            <BankProfits
              bankProfits={JSON.parse(JSON.stringify(bankProfits))}
            />
          </TabsContent>

          {/* Add Profit Tab */}
          <TabsContent value="add" className="mt-6">
            <CreateProfit />
          </TabsContent>

          {/* Update Profit Tab */}
          <TabsContent value="update" className="mt-6">
            <UpdateProfit bankProfits={JSON.parse(JSON.stringify(bankProfits))} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch bank profit:", error);
    return <div>Error loading bank profit.</div>;
  }
};

export default BankProfit;
