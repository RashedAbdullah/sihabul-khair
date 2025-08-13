import { database_connection } from "@/lib/db";
import { yearlyPaymentModel } from "@/models/yearly-payment-model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await database_connection();

    const yearlyPayments = await yearlyPaymentModel.find({});

    return NextResponse.json({ success: true, data: yearlyPayments });
  } catch (error) {
    console.log("Error while fetching yearly payments ", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch yearly payments" },
      { status: 500 }
    );
  }
}

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const { member, title, amount, paymentDate } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(member)) {
      throw new Error("Invalid member ID");
    }

    const existPayment = await yearlyPaymentModel.findOne({ member, title });

    if (existPayment) {
      throw new Error("Already exists this payment for this user in this year");
    }

    const newPayment = await yearlyPaymentModel.create({
      member,
      title,
      amount,
      paymentDate,
    });

    return NextResponse.json(
      { success: true, data: newPayment },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to create new yearly payment ", error);
    return NextResponse.json(
      { success: false, error: "Failed to ceate new yealy payment" },
      { status: 500 }
    );
  }
};
