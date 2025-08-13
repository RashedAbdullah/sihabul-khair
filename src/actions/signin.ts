"use server";

import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const handleSigninUser = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Invalid form submission");
    }

    await database_connection();

    const user = await userModel.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/", RedirectType.push);
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};
