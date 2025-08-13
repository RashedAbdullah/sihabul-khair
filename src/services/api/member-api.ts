import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";
import { getCloudinaryResponse } from "@/utils/cloudinary";
import { IUser } from "../../../@types/user";

export const memberService = {
  getMembers: async () => {
    try {
      await database_connection();
      const members = await userModel.find({}).lean();
      members.sort((a, b) => a.name.localeCompare(b.name));
      return { success: true, data: members };
    } catch (error) {
      console.error("Error fetching members:", error);
      throw new Error("Failed to fetch members");
    }
  },

  getMemberById: async (id: string) => {
    try {
      await database_connection();
      const member = await userModel.findById(id);

      if (!member) {
        throw new Error("Member not found");
      }

      return { success: true, data: member };
    } catch (error) {
      console.error("Error fetching member by ID:", error);
      throw new Error("Failed to fetch member by ID");
    }
  },

  createMember: async (memberData: FormData) => {
    try {
      await database_connection();

      const {
        name,
        father,
        nationalId,
        mobile,
        email,
        password,
        entryDate,
        shares,
        position,
        role,
      } = Object.fromEntries(memberData.entries());

      let avatarResponse = "";

      const avatar = memberData.get("avatar");
      if (avatar && typeof avatar === "object" && "arrayBuffer" in avatar) {
        const arrayBuffer = await avatar.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        avatarResponse = (await getCloudinaryResponse(buffer)) ?? "";
      }

      if (!name || !email || !password || !entryDate || !shares || !position) {
        return { success: false, error: "All fields are required" };
      }

      const existingMember = await userModel.findOne({ email });
      if (existingMember) {
        return { success: false, error: "Member already exists" };
      }

      console.log("existingMember ", existingMember);

      const member = await userModel.create({
        name,
        email,
        password,
        father,
        nationalId,
        entryDate,
        mobile,
        position,
        role,
        shares: Number(shares),
        avatar: avatarResponse,
      });

      return { success: true, data: member };
    } catch (error) {
      console.error("Error creating member:", error);
      throw new Error("Failed to create member");
    }
  },

  updateMember: async (id: string, memberData: IUser) => {
    try {
      await database_connection();
      const member = await userModel.findByIdAndUpdate(id, memberData, {
        new: true,
      });

      if (!member) {
        throw new Error("Member not found");
      }

      return { success: true, data: member };
    } catch (error) {
      console.error("Error updating member:", error);
      throw new Error("Failed to update member");
    }
  },

  deleteMember: async (id: string) => {
    try {
      await database_connection();
      const member = await userModel.findByIdAndDelete(id);

      if (!member) {
        throw new Error("Member not found");
      }

      return { success: true, data: member };
    } catch (error) {
      console.error("Error deleting member:", error);
      throw new Error("Failed to delete member");
    }
  },
};
