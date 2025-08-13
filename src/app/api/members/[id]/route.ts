import { getCurrentUser } from "@/lib/auth";
import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Member ID is required" },
        { status: 400 }
      );
    }
    await database_connection();
    const authUser = await getCurrentUser();

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json(
        { success: false, message: "Invalid member ID" },
        { status: 400 }
      );
    }

    let user;
    if (authUser?.role !== "ADMIN" || authUser?._id !== id) {
      user = await userModel
        .findById(id)
        .select("-nationalId -password -role -refreshToken -mobile");
    }

    user = await userModel.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch member" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    await database_connection();

    const { id } = await params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json(
        { success: false, message: "Invalid member ID" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const {
      name,
      email,
      mobile,
      nationalId,
      role,
      password,
      position,
      father,
    } = body;

    const updatedMember = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      mobile,
      nationalId,
      role,
      password,
      position,
      father,
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedMember,
        message: "Member updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update member" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: Props) => {
  try {
    await database_connection();

    const authUser = await getCurrentUser();
    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json(
        { success: false, message: "Invalid member ID" },
        { status: 400 }
      );
    }

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete member" },
      { status: 500 }
    );
  }
};
