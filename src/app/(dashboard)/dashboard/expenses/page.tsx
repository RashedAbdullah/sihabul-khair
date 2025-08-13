import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Expenses from "@/components/dashboard/expenses/expenses";
import CreateExpense from "@/components/dashboard/expenses/create-expense";
import UpdateExpense from "@/components/dashboard/expenses/update-expense";
import { expensesService } from "@/services";

const ExpensesPage = async () => {
  try {
    const { data: expenses } = await expensesService.getExpenses();

    return (
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">খরচ ব্যবস্থাপনা</h2>
        <Tabs defaultValue="view">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="view">খরচ দেখুন</TabsTrigger>
            <TabsTrigger value="add">নতুন খরচ</TabsTrigger>
            <TabsTrigger value="update">খরচ আপডেট</TabsTrigger>
          </TabsList>

          {/* View Expenses Tab */}
          <TabsContent value="view" className="mt-6">
            <Expenses expenses={JSON.parse(JSON.stringify(expenses))} />
          </TabsContent>

          {/* Add Expense Tab */}
          <TabsContent value="add" className="mt-6">
            <CreateExpense />
          </TabsContent>

          {/* Update Expense Tab */}
          <TabsContent value="update" className="mt-6">
            <UpdateExpense expenses={JSON.parse(JSON.stringify(expenses))} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    return <div>Error loading expenses.</div>;
  }
};

export default ExpensesPage;
