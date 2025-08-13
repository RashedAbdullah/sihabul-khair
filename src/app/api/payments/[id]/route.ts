import { database_connection } from "@/lib/db";
import { paymentModel } from "@/models/payment-model";
import { userModel } from "@/models/user-model";
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

    // Fetch user info
    const user = await userModel.findById(id).select("name avatar father");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch all amount entries related to the user
    const amounts = await paymentModel.find({ member: id }).sort({ month: -1 });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          father: user.father,
          avatar: user.avatar,
        },
        amounts: amounts.map((a) => ({
          amount: a.amount,
          month: a.month,
          paymentDate: a.paymentDate,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user with amounts" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;
    const { payment, month, paymentDate } = await req.json();

    // Validate request body
    if (!payment || !month || !paymentDate) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Update the amount entry
    const updatedAmount = await paymentModel.findByIdAndUpdate(
      id,
      {
        payment,
        month,
        paymentDate,
      },
      { new: true }
    );

    if (!updatedAmount) {
      return NextResponse.json(
        { success: false, error: "Amount entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedAmount,
    });
  } catch (error) {
    console.error("Error updating amount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update amount" },
      { status: 500 }
    );
  }
};
export const DELETE = async (_req: NextRequest, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;

    // Delete the amount entry
    const deletedAmount = await paymentModel.findByIdAndDelete(id);

    if (!deletedAmount) {
      return NextResponse.json(
        { success: false, error: "Amount entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedAmount,
    });
  } catch (error) {
    console.error("Error deleting amount:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete amount" },
      { status: 500 }
    );
  }
};
