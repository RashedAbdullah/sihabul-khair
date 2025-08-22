import { database_connection } from "@/lib/db";
import { paymentModel } from "@/models/payment-model";
import { userModel } from "@/models/user-model";
import mongoose from "mongoose";

interface UserInfo {
  _id: string;
  name: string;
  avatar: string;
  shares: number;
}

interface AmountStatus {
  _id: string;
  payment: number;
  paymentDate: Date;
}

type PaymentStatus = AmountStatus | "Doesn't pay";

interface MonthlyPayment {
  month: string; // e.g. "2025-07"
  status: PaymentStatus;
}

interface UserPaymentSummary {
  user: UserInfo;
  payments: MonthlyPayment[];
}

interface SingleUserPayment {
  _id: string;
  month: string;
  payment: number;
  paymentDate: Date;
}

// Helper to parse "MM-YYYY" or "YYYY-MM" to Date
function parseMonthString(monthStr: string): Date | null {
  // Accepts "MM-YYYY" or "YYYY-MM"
  if (/^\d{2}-\d{4}$/.test(monthStr)) {
    const [mm, yyyy] = monthStr.split("-");
    return new Date(Number(yyyy), Number(mm) - 1, 1);
  }
  if (/^\d{4}-\d{2}$/.test(monthStr)) {
    const [yyyy, mm] = monthStr.split("-");
    return new Date(Number(yyyy), Number(mm) - 1, 1);
  }
  return null;
}

export const paymentService = {
  getPayments: async () => {
    try {
      await database_connection();
      const payments = await paymentModel.find({}).sort({ month: -1 });
      return payments;
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw new Error("Failed to fetch payments");
    }
  },

  getPaymentsByMemberId: async (memberId: string, from: string, to: string) => {
    try {
      await database_connection();

      // Handle case when only memberId is provided
      if (memberId && !from && !to) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }

        // Verify user exists
        const user = await userModel.findById(memberId);
        if (!user) {
          return { success: false, error: "User not found" };
        }

        // Get all payments for this user
        const payments = await paymentModel
          .find({ member: memberId })
          .sort({ month: -1 }) // Sort by month in descending order
          .lean();

        // Format the payments
        const formattedPayments: SingleUserPayment[] = payments.map(
          (payment) => ({
            _id: (payment._id as mongoose.Types.ObjectId).toString(),
            month: payment.month.toISOString().slice(0, 7),
            payment: payment.payment,
            paymentDate: payment.paymentDate,
          })
        );

        return {
          success: true,
          data: {
            user: {
              _id: user._id.toString(),
              name: user.name,
              avatar: user.avatar,
              shares: user.shares,
            },
            payments: formattedPayments,
          },
        };
      }

      // Original logic for other cases (with from/to params or all users)
      let users;
      // If memberId is provided (with from/to), fetch only that user
      if (memberId) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }
        users = await userModel.find({ _id: memberId });
        if (!users.length) {
          return { success: false, error: "User not found" };
        }
      } else {
        users = await userModel.find({});
      }

      // Determine months range
      let months: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let monthFilter: any = {};

      if (from && to) {
        const fromDate = parseMonthString(from);
        const toDate = parseMonthString(to);
        if (!fromDate || !toDate) {
          return { success: false, error: "Invalid from/to format" };
        }
        // months between fromDate and toDate inclusive
        const d = new Date(fromDate);
        while (d <= toDate) {
          months.push(d.toISOString().slice(0, 7));
          d.setMonth(d.getMonth() + 1);
        }
        monthFilter = {
          $gte: new Date(months[0] + "-01"),
          $lte: new Date(months[months.length - 1] + "-01"),
        };
      } else {
        // Default: all months for all users
        const allMonths = await paymentModel.find({}).distinct("month");
        months = allMonths.map((d: Date) => d.toISOString().slice(0, 7));
        months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
        if (months.length) {
          monthFilter = {
            $gte: new Date(months[months.length - 1] + "-01"),
            $lte: new Date(months[0] + "-01"),
          };
        }
      }

      // Get all payments for these users and months
      const paymentQuery: Record<string, unknown> = {};
      if (memberId) {
        paymentQuery.member = memberId;
      }
      if (months.length) {
        paymentQuery.month = monthFilter;
      }

      const payments = await paymentModel
        .find(paymentQuery)
        .populate("member", "name avatar");

      // Organize payments by user and month
      const userMonthMap: Record<string, Record<string, AmountStatus>> = {};

      for (const payment of payments) {
        const uid = payment.member._id.toString();
        const formattedMonth = payment.month.toISOString().slice(0, 7);
        if (!userMonthMap[uid]) userMonthMap[uid] = {};
        userMonthMap[uid][formattedMonth] = {
          _id: payment._id,
          payment: payment.payment,
          paymentDate: payment.paymentDate,
        };
      }

      // If months is empty, fallback to last 3 months
      if (!months.length) {
        const today = new Date();
        for (let i = 0; i < 3; i++) {
          const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          months.push(date.toISOString().slice(0, 7));
        }
        months = months.reverse();
      }

      // Sort months in reverse chronological order
      months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

      // Create final structure
      const result: UserPaymentSummary[] = users.map((user) => {
        const userId = user._id.toString();
        const monthlyData: MonthlyPayment[] = months.map((month) => {
          const status = userMonthMap[userId]?.[month]
            ? userMonthMap[userId][month]
            : "Doesn't pay";
          return { month, status };
        });
        return {
          user: {
            _id: user._id.toString(),
            name: user.name,
            avatar: user.avatar,
            shares: user.shares,
          },
          payments: monthlyData,
        };
      });

      return {
        success: true,
        months,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching payments by member ID:", error);
      throw new Error("Failed to fetch payments by member ID");
    }
  },

  getPaymentsForFewMonths: async (
    from: string,
    to: string,
    memberId: string
  ) => {
    // ✅ Safe formatter for YYYY-MM (no timezone shift)
    const formatYearMonth = (date: Date): string => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      return `${year}-${month}`;
    };

    try {
      await database_connection();

      // Handle case when only memberId is provided
      if (memberId && !from && !to) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }

        // Verify user exists
        const user = await userModel.findById(memberId);
        if (!user) {
          return { success: false, error: "User not found" };
        }

        // Get all payments for this user
        const payments = await paymentModel
          .find({ member: memberId })
          .sort({ month: -1 }) // Sort by month in descending order
          .lean();

        // Format the payments
        const formattedPayments: SingleUserPayment[] = payments.map(
          (payment) => ({
            _id: (payment._id as mongoose.Types.ObjectId).toString(),
            month: formatYearMonth(payment.month),
            payment: payment.payment,
            paymentDate: payment.paymentDate,
          })
        );

        return {
          success: true,
          data: {
            user: {
              _id: user._id.toString(),
              name: user.name,
              avatar: user.avatar,
              shares: user.shares,
            },
            payments: formattedPayments,
          },
        };
      }

      // Original logic for other cases (with from/to params or all users)
      let users;
      if (memberId) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }
        users = await userModel.find({ _id: memberId });
        if (!users.length) {
          return { success: false, error: "User not found" };
        }
      } else {
        users = await userModel.find({});
      }

      // Determine months range
      let months: string[] = [];
      let monthFilter: unknown = {};

      if (from && to) {
        const fromDate = parseMonthString(from);
        const toDate = parseMonthString(to);
        if (!fromDate || !toDate) {
          return { success: false, error: "Invalid from/to format" };
        }
        // months between fromDate and toDate inclusive
        const d = new Date(fromDate);
        while (d <= toDate) {
          months.push(formatYearMonth(d));
          d.setUTCMonth(d.getUTCMonth() + 1); // ✅ UTC safe increment
        }
        monthFilter = {
          $gte: new Date(from + "-01"),
          $lte: new Date(to + "-01"),
        };
      } else {
        // Default: all months for all users
        const allMonths = await paymentModel.find({}).distinct("month");
        months = allMonths.map((d: Date) => formatYearMonth(d));
        months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
        if (months.length) {
          monthFilter = {
            $gte: new Date(months[months.length - 1] + "-01"),
            $lte: new Date(months[0] + "-01"),
          };
        }
      }

      // Get all payments for these users and months
      const paymentQuery: Record<string, unknown> = {};
      if (memberId) {
        paymentQuery.member = memberId;
      }
      if (months.length) {
        paymentQuery.month = monthFilter;
      }

      const payments = await paymentModel
        .find(paymentQuery)
        .populate("member", "name avatar");

      // Organize payments by user and month
      const userMonthMap: Record<string, Record<string, AmountStatus>> = {};

      for (const payment of payments) {
        const uid = payment.member._id.toString();
        const formattedMonth = formatYearMonth(payment.month);
        if (!userMonthMap[uid]) userMonthMap[uid] = {};
        userMonthMap[uid][formattedMonth] = {
          _id: payment._id,
          payment: payment.payment,
          paymentDate: payment.paymentDate,
        };
      }

      // If months is empty, fallback to last 3 months
      if (!months.length) {
        const today = new Date();
        for (let i = 0; i < 3; i++) {
          const date = new Date(
            Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i, 1)
          );
          months.push(formatYearMonth(date));
        }
        months = months.reverse();
      }

      // Sort months in reverse chronological order
      months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

      // Create final structure
      const result: UserPaymentSummary[] = users.map((user) => {
        const userId = user._id.toString();
        const monthlyData: MonthlyPayment[] = months.map((month) => {
          const status = userMonthMap[userId]?.[month]
            ? userMonthMap[userId][month]
            : "Doesn't pay";
          return { month, status };
        });
        return {
          user: {
            _id: user._id.toString(),
            name: user.name,
            avatar: user.avatar,
            shares: user.shares,
          },
          payments: monthlyData,
        };
      });

      return {
        success: true,
        months,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching payments for few months:", error);
      throw new Error("Failed to fetch payments for few months");
    }
  },

  getPaymentsByMemberForFewMonths: async (
    memberId: string,
    from: string,
    to: string
  ) => {
    try {
      await database_connection();

      // Handle case when only memberId is provided
      if (memberId && !from && !to) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }

        // Verify user exists
        const user = await userModel.findById(memberId);
        if (!user) {
          return { success: false, error: "User not found" };
        }

        // Get all payments for this user
        const payments = await paymentModel
          .find({ member: memberId })
          .sort({ month: -1 }) // Sort by month in descending order
          .lean();

        // Format the payments
        const formattedPayments: SingleUserPayment[] = payments.map(
          (payment) => ({
            _id: (payment._id as mongoose.Types.ObjectId).toString(),
            month: payment.month.toISOString().slice(0, 7),
            payment: payment.payment,
            paymentDate: payment.paymentDate,
          })
        );

        return {
          success: true,
          data: {
            user: {
              _id: user._id.toString(),
              name: user.name,
              avatar: user.avatar,
              shares: user.shares,
            },
            payments: formattedPayments,
          },
        };
      }

      // Original logic for other cases (with from/to params or all users)
      let users;
      // If memberId is provided (with from/to), fetch only that user
      if (memberId) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          return { success: false, error: "Invalid user id" };
        }
        users = await userModel.find({ _id: memberId });
        if (!users.length) {
          return { success: false, error: "User not found" };
        }
      } else {
        users = await userModel.find({});
      }

      // Determine months range
      let months: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let monthFilter: any = {};

      if (from && to) {
        const fromDate = parseMonthString(from);
        const toDate = parseMonthString(to);
        if (!fromDate || !toDate) {
          return { success: false, error: "Invalid from/to format" };
        }
        // months between fromDate and toDate inclusive
        const d = new Date(fromDate);
        while (d <= toDate) {
          months.push(d.toISOString().slice(0, 7));
          d.setMonth(d.getMonth() + 1);
        }
        monthFilter = {
          $gte: new Date(months[0] + "-01"),
          $lte: new Date(months[months.length - 1] + "-01"),
        };
      } else {
        // Default: all months for all users
        const allMonths = await paymentModel.find({}).distinct("month");
        months = allMonths.map((d: Date) => d.toISOString().slice(0, 7));
        months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
        if (months.length) {
          monthFilter = {
            $gte: new Date(months[months.length - 1] + "-01"),
            $lte: new Date(months[0] + "-01"),
          };
        }
      }

      // Get all payments for these users and months
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      const paymentQuery: any = {};
      if (memberId) {
        paymentQuery.member = memberId;
      }
      if (months.length) {
        paymentQuery.month = monthFilter;
      }

      const payments = await paymentModel
        .find(paymentQuery)
        .populate("member", "name avatar");

      // Organize payments by user and month
      const userMonthMap: Record<string, Record<string, AmountStatus>> = {};

      for (const payment of payments) {
        const uid = payment.member._id.toString();
        const formattedMonth = payment.month.toISOString().slice(0, 7);
        if (!userMonthMap[uid]) userMonthMap[uid] = {};
        userMonthMap[uid][formattedMonth] = {
          _id: payment._id,
          payment: payment.payment,
          paymentDate: payment.paymentDate,
        };
      }

      // If months is empty, fallback to last 3 months
      if (!months.length) {
        const today = new Date();
        for (let i = 0; i < 3; i++) {
          const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          months.push(date.toISOString().slice(0, 7));
        }
        months = months.reverse();
      }

      // Sort months in reverse chronological order
      months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

      // Create final structure
      const result: UserPaymentSummary[] = users.map((user) => {
        const userId = user._id.toString();
        const monthlyData: MonthlyPayment[] = months.map((month) => {
          const status = userMonthMap[userId]?.[month]
            ? userMonthMap[userId][month]
            : "Doesn't pay";
          return { month, status };
        });
        return {
          user: {
            _id: user._id.toString(),
            name: user.name,
            avatar: user.avatar,
            shares: user.shares,
          },
          payments: monthlyData,
        };
      });

      return {
        success: true,
        months,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching payments by member for few months:", error);
      throw new Error("Failed to fetch payments by member for few months");
    }
  },

  getPaymentById: async (id: string) => {
    try {
      await database_connection();
      const payment = await paymentModel
        .findById(id)
        .populate("member", "name avatar");

      if (!payment) {
        throw new Error("Payment not found");
      }
      return { success: true, data: payment };
    } catch (error) {
      console.error("Error fetching payment by ID:", error);
      throw new Error("Failed to fetch payment by ID");
    }
  },

  createPayment: async (amountData: unknown) => {
    try {
      await database_connection();
      const { member, payment, month, paymentDate } = amountData as {
        member: string;
        payment: number;
        month: string;
        paymentDate: Date;
      };
      const newPayment = new paymentModel({
        member,
        payment,
        month,
        paymentDate,
      });
      await newPayment.save();
      return { success: true, data: newPayment };
    } catch (error) {
      console.error("Error creating payment:", error);
      throw new Error("Failed to create payment");
    }
  },

  updatePayment: async (id: string, amountData: unknown) => {
    try {
      await database_connection();
      const isValidId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidId) {
        throw new Error("Invalid payment ID");
      }
      const payment = await paymentModel.findById(id);

      if (!payment) {
        throw new Error("Payment not found");
      }
      const {
        member,
        payment: newPayment,
        month,
        paymentDate,
      } = amountData as {
        member: string;
        payment: number;
        month: string;
        paymentDate: Date;
      };
      payment.member = member;
      payment.payment = newPayment;
      payment.month = month;
      payment.paymentDate = paymentDate;
      await payment.save();

      return { success: true, data: payment };
    } catch (error) {
      console.error("Error updating payment:", error);
      throw new Error("Failed to update payment");
    }
  },

  deletePayment: async (id: string) => {
    try {
      await database_connection();
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new Error("Invalid payment ID");
      }
      const payment = await paymentModel.findByIdAndDelete(id);
      if (!payment) {
        throw new Error("Payment not found");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw new Error("Failed to delete payment");
    }
  },
};
