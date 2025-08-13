import { database_connection } from "@/lib/db";
import BankProfitModel from "@/models/bank-profit-model";
import { expenseModel } from "@/models/expense-model";
import { investmentModel } from "@/models/investment-model";
import { paymentModel } from "@/models/payment-model";
import { userModel } from "@/models/user-model";
import { yearlyPaymentModel } from "@/models/yearly-payment-model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await database_connection();

    // 1. মোট ইনভেস্ট
    const totalInvestment = await investmentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 2. ইনভেস্ট থেকে জমা
    const paymentFromInvestment = await investmentModel.aggregate([
      { $unwind: "$instalmentHistory" },
      {
        $group: {
          _id: null,
          total: { $sum: "$instalmentHistory.amount" },
        },
      },
    ]);

    // 3. শেয়ার বাবদ টোটাল জমা (assume per-share value is constant)
    const paymentsFromShares = await paymentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$payment" } } },
    ]);

    // 4. মুনাফা বাবদ টোটাল জমা
    const profitsFromInvestments = await investmentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$paidProfit" } } },
    ]);

    // 5. মোট সদস্য-সংখ্যা
    const memberCount = await userModel.countDocuments();

    // 6. মোট শেয়ার-সংখ্যা
    const sharesCount = await userModel.aggregate([
      { $group: { _id: null, total: { $sum: "$shares" } } },
    ]);

    // 7. টোটাল ইয়ারলি এমাউন্ট
    const yearlyPayments = await yearlyPaymentModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 8. মোট খরচ (Expenses)
    const totalExpense = await expenseModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 9. ব্যাংক প্রফিট (Bank profits)
    const bankProfit = await BankProfitModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 10. হিসাব: মোট টাকাঃ
    const currentDeposit =
      (paymentFromInvestment[0]?.total || 0) +
      (paymentsFromShares[0]?.total || 0) +
      (profitsFromInvestments[0]?.total || 0) +
      (bankProfit[0]?.total || 0) +
      (yearlyPayments[0]?.total || 0) -
      (totalInvestment[0]?.total || 0) -
      (totalExpense[0]?.total || 0);

    return NextResponse.json({
      totalInvestment: totalInvestment[0]?.total || 0,
      paymentFromInvestment: paymentFromInvestment[0]?.total || 0,
      paymentsFromShares:
        (paymentsFromShares[0]?.total || 0) + (yearlyPayments[0]?.total || 0),
      profitDeposits: profitsFromInvestments[0]?.total || 0,
      totalMembers: memberCount,
      totalBankProfit: bankProfit[0]?.total || 0,
      totalShares: sharesCount[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      currentDeposit,
    });
  } catch (error) {
    console.error("Summary API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
};
