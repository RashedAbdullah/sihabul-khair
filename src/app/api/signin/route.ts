import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Email And Password is required",
        },
        { status: 401 }
      );
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `User with this ${email} not found`,
        },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `This password is not correct`,
        },
        { status: 401 }
      );
    }

    const loggedinUser = await userModel
      .findById(user._id)
      .select("name avatar email role");

    return NextResponse.json(
      {
        success: true,
        data: loggedinUser,
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal server error ", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
