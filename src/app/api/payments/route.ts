import { database_connection } from "@/lib/db";
import { paymentModel } from "@/models/payment-model";
import { userModel } from "@/models/user-model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (req: NextRequest) => {
  try {
    await database_connection();

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("member");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // Handle case when only memberId is provided
    if (memberId && !from && !to) {
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return NextResponse.json(
          { success: false, error: "Invalid user id" },
          { status: 400 }
        );
      }

      // Verify user exists
      const user = await userModel.findById(memberId);
      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
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

      return NextResponse.json({
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
      });
    }

    // Original logic for other cases (with from/to params or all users)
    let users;
    // If memberId is provided (with from/to), fetch only that user
    if (memberId) {
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return NextResponse.json(
          { success: false, error: "Invalid user id" },
          { status: 400 }
        );
      }
      users = await userModel.find({ _id: memberId });
      if (!users.length) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
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
        return NextResponse.json(
          { success: false, error: "Invalid from/to format" },
          { status: 400 }
        );
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
    let paymentQuery: any = {};
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

    return NextResponse.json({
      success: true,
      months,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching payment summary:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment summary" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const { member, payment, month, paymentDate } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(member)) {
      throw new Error("Invalid member ID");
    }

    const existPayment = await paymentModel.findOne({ member, month });

    if (existPayment) {
      throw new Error(
        "Already exists this payment for this user in this month"
      );
    }

    const newPayment = await paymentModel.create({
      member,
      payment,
      month,
      paymentDate,
    });

    return NextResponse.json(
      { success: true, data: newPayment },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to create neew payment ", error);
    return NextResponse.json(
      { success: false, error: "Failed to ceate new payment" },
      { status: 500 }
    );
  }
};
