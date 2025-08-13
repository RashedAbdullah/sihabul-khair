import { database_connection } from "@/lib/db";
import { investmentModel } from "@/models/investment-model";
import { getCloudinaryResponse } from "@/utils/cloudinary";
import mongoose from "mongoose";
import { IInvestment } from "../../../@types/investment";

export const InvestmentService = {
  getInvestments: async () => {
    try {
      await database_connection();

      const investments = await investmentModel.find({}).lean();
      investments.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === "Active") return -1;
        if (b.status === "Active") return 1;
        return 0;
      });

      return { success: true, data: investments };
    } catch (error) {
      console.error("Error fetching investments:", error);
      throw new Error("Failed to fetch investments");
    }
  },

  getInvestmentById: async (id: string) => {
    try {
      await database_connection();
      const investment = await investmentModel.findById(id).lean();

      if (!investment) {
        throw new Error("Investment not found");
      }

      return { success: true, data: investment };
    } catch (error) {
      console.error("Error fetching investment by ID:", error);
      throw new Error("Failed to fetch investment by ID");
    }
  },

  createInvestment: async (investmentData: FormData) => {
    try {
      await database_connection();
      const {
        investee,
        reference,
        contact,
        amount,
        instalments,
        loanStartDate,
        dueDate,
        chargedProfit,
        status,
      } = Object.fromEntries(investmentData.entries());

      // Handle case when no file is uploaded
      let agreementResponse = "";

      const { agreement } = Object.fromEntries(investmentData.entries());
      if (
        agreement &&
        typeof agreement === "object" &&
        "arrayBuffer" in agreement
      ) {
        const arrayBuffer = await agreement.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        agreementResponse = (await getCloudinaryResponse(buffer)) ?? "";
      }

      const investment = await investmentModel.create({
        investee,
        reference,
        loanStartDate,
        dueDate,
        chargedProfit: Number(chargedProfit),
        status,
        contact,
        amount: Number(amount),
        instalments: Number(instalments),
        agreement: agreementResponse,
        installmentHistory: [],
      });

      return { success: true, data: investment };
    } catch (error) {
      console.error("Error creating investment:", error);
      throw new Error("Failed to create investment");
    }
  },

  addInstalment: async (id: string, investmentData: unknown) => {
    try {
      await database_connection();

      const isValidId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidId) {
        throw new Error("Invalid investment ID");
      }

      const investment = await investmentModel.findById(id);

      if (!investment) {
        throw new Error("Investment not found");
      }

      const { amount, date } = investmentData as {
        amount: number;
        date: Date;
      };

      investment.instalmentHistory.push({
        amount,
        date,
      });

      await investment.save();

      return { success: true, data: investment };
    } catch (error) {
      console.error("Error adding instalment:", error);
      throw new Error("Failed to add instalment");
    }
  },

  updateInvestment: async (id: string, investmentData: IInvestment) => {
    try {
      await database_connection();

      const {
        investee,
        reference,
        contact,
        amount,
        instalments,
        loanStartDate,
        dueDate,
        status,
        chargedProfit,
        paidProfit,
      } = investmentData;

      const updatedInstalment = await investmentModel.findByIdAndUpdate(id, {
        investee,
        reference,
        contact,
        amount,
        instalments,
        loanStartDate,
        dueDate,
        status,
        chargedProfit,
        paidProfit,
      });

      return {
        success: true,
        data: updatedInstalment,
      };
    } catch (error) {
      console.error("Error updating investment:", error);
      throw new Error("Failed to update investment");
    }
  },

  deleteInvestment: async (id: string) => {
    try {
      await database_connection();

      const isValidId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidId) {
        throw new Error("Invalid investment ID");
      }

      const investment = await investmentModel.findById(id);

      if (!investment) {
        throw new Error("Investment not found");
      }

      await investment.remove();

      return { success: true, message: "Investment deleted successfully" };
    } catch (error) {
      console.error("Error deleting investment:", error);
      throw new Error("Failed to delete investment");
    }
  },
};
