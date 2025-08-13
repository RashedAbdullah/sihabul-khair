import { database_connection } from "@/lib/db";
import { investmentModel } from "@/models/investment-model";
import { getCloudinaryResponse } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await database_connection();
    const formData = await req.formData();
    const {
      investee,
      reference,
      contact,
      investedAmount,
      instalments,
      loanStartDate,
      dueDate,
      chargedAmount,
      status,
    } = Object.fromEntries(formData.entries());



    // Handle case when no file is uploaded
    let agreementReponse = "";

    const agreement = formData.get("agreement");
    if (
      agreement &&
      typeof agreement === "object" &&
      "arrayBuffer" in agreement
    ) {
      const arrayBuffer = await agreement.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      agreementReponse = (await getCloudinaryResponse(buffer)) ?? "";
    }

    const investment = await investmentModel.create({
      investee,
      reference,
      loanStartDate,
      dueDate,
      status,
      contact,
      investedAmount: Number(investedAmount),
      chargedAmount: Number(chargedAmount),
      instalments: Number(instalments),
      agreement: agreementReponse,
      installmentHistory: [],
    });

    return NextResponse.json(
      { success: true, data: investment },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to create investment ", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create investment",
      },
      { status: 500 }
    );
  }
};
