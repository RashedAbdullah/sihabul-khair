import { database_connection } from "@/lib/db";
import { expenseModel } from "@/models/expense-model";
import { IExpense } from "../../../@types/expense";

export const expensesService = {
  getExpenses: async () => {
    try {
      await database_connection();
      const expenses = await expenseModel.find({});
      return { data: expenses, success: true };
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw new Error("Failed to fetch expenses");
    }
  },

  getExpenseById: async (id: string) => {
    try {
      await database_connection();
      const expense = await expenseModel.findById(id);
      return { data: expense, success: true };
    } catch (error) {
      console.error("Error fetching expense by ID:", error);
      throw new Error("Failed to fetch expense by ID");
    }
  },

  createExpense: async (expense: unknown) => {
    try {
      await database_connection();
      const newExpense = await expenseModel.create(expense);
      return { data: newExpense, success: true };
    } catch (error) {
      console.error("Error creating expense:", error);
      throw new Error("Failed to create expense");
    }
  },

  updateExpense: async (id: string, expense: IExpense) => {
    try {
      await database_connection();
      const updatedExpense = await expenseModel.findByIdAndUpdate(id, expense, {
        new: true,
      });
      return { data: updatedExpense, success: true };
    } catch (error) {
      console.error("Error updating expense:", error);
      throw new Error("Failed to update expense");
    }
  },

  deleteExpense: async (id: string) => {
    try {
      await database_connection();
      await expenseModel.findByIdAndDelete(id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw new Error("Failed to delete expense");
    }
  },
};
