import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";

export const signinService = {
  getSignin: async (email: string, password: string) => {
    try {
      await database_connection();

      if (!email || !password) {
        return {
          success: false,
          data: null,
          message: "Email And Password is required",
        };
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return {
          success: false,
          data: null,
          message: `User with this ${email} not found`,
        };
      }

      const isPasswordCorrect = await user.isPasswordCorrect(password);

      if (!isPasswordCorrect) {
        return {
          success: false,
          data: null,
          message: `This password is not correct`,
        };
      }

      const loggedinUser = await userModel
        .findById(user._id)
        .select("name avatar email role");

      return {
        success: true,
        data: loggedinUser,
        message: "Login successful",
      };
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw new Error("Failed to sign in");
    }
  },
};
