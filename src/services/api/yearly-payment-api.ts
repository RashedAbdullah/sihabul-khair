import { database_connection } from "@/lib/db";
import { yearlyPaymentModel } from "@/models/yearly-payment-model";
import { IYearlyPayment } from "../../../@types/yearly-amount";

export const yearlyPaymentService = {
  getYealyPayments: async () => {
    try {
      await database_connection();
      const yearlyPayments = await yearlyPaymentModel.find({});
      return { data: yearlyPayments };
    } catch (error) {
      console.error("Error fetching yearly payments:", error);
      throw new Error("Failed to fetch yearly payments");
    }
  },

  getYealyPaymentsByMemberId: async (id: string) => {
    try {
      await database_connection();

      const yearlyPayments = await yearlyPaymentModel.find({ member: id });
      return { data: yearlyPayments };
    } catch (error) {
      console.error("Error fetching yearly payments by member ID:", error);
      throw new Error("Failed to fetch yearly payments by member ID");
    }
  },

  getYealyPaymentById: async (id: string) => {
    try {
      await database_connection();

      const yearlyPayment = await yearlyPaymentModel.findById(id);
      return { data: yearlyPayment };
    } catch (error) {
      console.error("Error fetching yearly payment by ID:", error);
      throw new Error("Failed to fetch yearly payment by ID");
    }
  },

  createYearlyPayment: async (amountData: unknown) => {
    try {
      await database_connection();
      const newYearlyPayment = await yearlyPaymentModel.create(amountData);
      return { data: newYearlyPayment };
    } catch (error) {
      console.error("Error creating yearly payment:", error);
      throw new Error("Failed to create yearly payment");
    }
  },

  updatePayment: async (id: string, amountData: IYearlyPayment) => {
    try {
      await database_connection();
      const updatedPayment = await yearlyPaymentModel.findByIdAndUpdate(
        id,
        amountData,
        { new: true }
      );
      return { data: updatedPayment };
    } catch (error) {
      console.error("Error updating yearly payment:", error);
      throw new Error("Failed to update yearly payment");
    }
  },

  deletePayment: async (id: string) => {
    try {
      await database_connection();
      const deletedPayment = await yearlyPaymentModel.findByIdAndDelete(id);
      if (!deletedPayment) {
        throw new Error("Yearly payment not found");
      }
      return { data: deletedPayment };
    } catch (error) {
      console.error("Error deleting yearly payment:", error);
      throw new Error("Failed to delete yearly payment");
    }
  },
};
