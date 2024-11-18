import { database_connection } from "@/database/database-connection";
import { investmentModel } from "@/models/investment-model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await database_connection();

    const investments = await investmentModel.find({});
    return NextResponse.json({ success: true, data: investments });
  } catch (err) {
    console.error("Error fetching investments:", err);

    const errorMessage = err.message || "An unexpected error occurred";
    const statusCode = err.name === "MongoNetworkError" ? 503 : 500;

    return new NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
};
