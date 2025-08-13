import { database_connection } from "@/lib/db";
import { expenseModel } from "@/models/expense-model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await database_connection();

    const expenses = await expenseModel.find({});

    return NextResponse.json({ success: true, data: expenses });
  } catch (error) {
    console.log("Failed to fetch expenses ", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const { cost, amount, date, note } = await req.json();

    if (!cost || !amount || !date) {
      throw new Error("All fields are required");
    }

    const newPayment = await expenseModel.create({
      cost,
      amount,
      date,
      note,
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
