import { database_connection } from "@/lib/db";
import { userModel } from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import { getCloudinaryResponse } from "@/utils/cloudinary";

// GET: Fetch all members
export async function GET() {
  try {
    await database_connection();

    const members = await userModel
      .find({})
      .select("name avatar position shares father");
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.log("Error while fetching members ", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST: Create a new member
export async function POST(req: NextRequest) {
  try {
    await database_connection();
    const formData = await req.formData();

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
    } = Object.fromEntries(formData.entries());

    if (isNaN(Number(shares))) {
      return NextResponse.json(
        { success: false, error: "Invalid shares value" },
        { status: 400 }
      );
    }


    let avatarReponse = "";

    const avatar = formData.get("avatar");
    if (avatar && typeof avatar === "object" && "arrayBuffer" in avatar) {
      const arrayBuffer = await avatar.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      avatarReponse = (await getCloudinaryResponse(buffer)) ?? "";
    }

    if (!name || !email || !password || !entryDate || !shares || !position) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingMember = await userModel.findOne({ email });
    if (existingMember) {
      return NextResponse.json(
        { success: false, error: "Member already exists" },
        { status: 400 }
      );
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
      avatar: avatarReponse,
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    console.error("Member creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
