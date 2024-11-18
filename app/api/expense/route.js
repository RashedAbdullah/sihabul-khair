import { database_connection } from "@/database/database-connection";
import { expenseModel } from "@/models/cost-model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await database_connection();

    const expenses = await expenseModel.find({});

    return NextResponse.json({ success: true, data: expenses });
  } catch (err) {
    console.error("Error fetching expenses:", err);

    const errorMessage = err.message || "An unexpected error occurred";
    const statusCode = err.name === "MongoNetworkError" ? 503 : 500;

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
};
