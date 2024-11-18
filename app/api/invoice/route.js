import { database_connection } from "@/database/database-connection";
import { invoiceModel } from "@/models/invoice-model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await database_connection();

    const invoices = await invoiceModel.find({});

    return NextResponse.json(
      { success: true, data: invoices },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching invoices:", error);

    const errorMessage = error.message || "An unexpected error occurred";
    const statusCode = error.name === "MongoNetworkError" ? 503 : 500;

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
};
