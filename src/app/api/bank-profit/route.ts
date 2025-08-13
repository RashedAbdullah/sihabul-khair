import { database_connection } from "@/lib/db";
import BankProfitModel from "@/models/bank-profit-model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await database_connection();

    const bankProfits = await BankProfitModel.find({});

    return NextResponse.json(
      { success: true, data: bankProfits },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get bank profite ", error);
    return NextResponse.json(
      { success: false, error: "Failed to get bank profite" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();

    const { amount, creditedDate, description } = await req.json();

    const bankProfit = await BankProfitModel.create({
      amount,
      creditedDate,
      description,
    });

    return NextResponse.json(
      { success: true, data: bankProfit },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to create bank profit ", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bank profit" },
      { status: 500 }
    );
  }
};
