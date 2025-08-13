import { database_connection } from "@/lib/db";
import { expenseModel } from "@/models/expense-model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async () => {};
export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json(
        { success: false, message: "Invalid expense ID" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const { cost, amount, date, note } = body;

    if (!cost || !amount || !date) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedExpense = await expenseModel.findByIdAndUpdate(id, {
      cost,
      amount,
      date,
      note,
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedExpense,
        message: "Expense updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update expense" },
      { status: 500 }
    );
  }
};
export const DELETE = async () => {};
