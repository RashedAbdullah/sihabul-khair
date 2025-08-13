import { database_connection } from "@/lib/db";
import { investmentModel } from "@/models/investment-model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const PATCH = async (req: Request, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;

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
    } = await req.json();

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json({
        success: false,
        message: "Invalid investment ID",
      });
    }

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

    return NextResponse.json({
      success: true,
      message: "Installment added successfully",
      data: updatedInstalment,
    });
  } catch (error) {
    console.error("Error updating investment:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update investment" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;
    const { amount, date } = await req.json();

    // Find the investment
    const investment = await investmentModel.findById(id);
    if (!investment) {
      return NextResponse.json(
        { success: false, message: "বিনিয়োগ পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    // Add the new instalment
    investment.instalmentHistory.push({
      amount,
      date,
    });

    await investment.save();

    return NextResponse.json(
      {
        success: true,
        message: "কিস্তি সফলভাবে যোগ করা হয়েছে",
        data: investment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while adding new instalment:", error);
    return NextResponse.json(
      { success: false, message: "failed to add installment" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json(
        { success: false, message: "Invalid investment ID" },
        { status: 400 }
      );
    }

    const deleted = await investmentModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Bank profit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "investment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting investment:", error);
    return NextResponse.json(
      { success: false, message: "failed to delete investment" },
      { status: 500 }
    );
  }
};
