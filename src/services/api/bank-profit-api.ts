import { database_connection } from "@/lib/db";
import BankProfitModel from "@/models/bank-profit-model";
import { IBankProfit } from "../../../@types/bank-profit";

export const BankProfitService = {
  getBankProfits: async () => {
    try {
      await database_connection();

      const bankProfits = await BankProfitModel.find({});

      return { success: true, data: bankProfits };
    } catch (error) {
      console.log("Failed to connect to the database", error);
      throw new Error("Database connection failed");
    }
  },

  createBankProfit: async (bankProfitData: unknown) => {
    try {
      await database_connection();

      const bankProfit = await BankProfitModel.create(bankProfitData);

      return { success: true, data: bankProfit };
    } catch (error) {
      console.log("Failed to create bank profit", error);
      throw new Error("Failed to create bank profit");
    }
  },

  updateBankProfit: async (id: string, bankProfitData: IBankProfit) => {
    try {
      await database_connection();
      const updated = await BankProfitModel.findByIdAndUpdate(
        id,
        bankProfitData,
        {
          new: true,
        }
      );

      if (!updated) {
        return { success: false, error: "Bank profit not found" };
      }

      return { success: true, data: updated };
    } catch (error) {
      console.log("Failed to update bank profit", error);
      throw new Error("Failed to update bank profit");
    }
  },

  deleteBankProfit: async (id: string) => {
    try {
      await database_connection();
      const deleted = await BankProfitModel.findByIdAndDelete(id);

      if (!deleted) {
        return { success: false, error: "Bank profit not found" };
      }

      return {
        success: true,
        message: "Bank profit deleted successfully",
      };
    } catch (error) {
      console.log("Failed to delete bank profit", error);
      throw new Error("Failed to delete bank profit");
    }
  },
};
