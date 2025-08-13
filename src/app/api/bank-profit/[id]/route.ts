import { database_connection } from "@/lib/db";
import BankProfitModel from "@/models/bank-profit-model";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (_req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    await database_connection();

    const bankProfit = await BankProfitModel.findById(id);

    if (!bankProfit) {
      return NextResponse.json(
        { success: false, error: "Bank profit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: bankProfit });
  } catch (error) {
    console.log("Failed to fetch bank profit ", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bank profit" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const { amount, creditedDate, description } = await req.json();

    await database_connection();

    const updated = await BankProfitModel.findByIdAndUpdate(
      id,
      { amount, creditedDate, description },
      {
        new: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Bank profit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
      console.log("Failed to update bank profit ", error);
    return NextResponse.json(
      { success: false, error: "Failed to update bank profit" },
      { status: 500 }
    );
  }
};

// DELETE: Delete bank profit by ID
export const DELETE = async (_req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;

    await database_connection();

    const deleted = await BankProfitModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Bank profit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bank profit deleted successfully",
    });
  } catch (error) {
     console.log("Failed to delete bank profit ", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete bank profit" },
      { status: 500 }
    );
  }
};
