import { yearlyPaymentModel } from "@/models/yearly-payment-model";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (_req: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;

    const bankProfit = await yearlyPaymentModel.findOne({
      member: id,
      title: "2025-2026",
    });

    return NextResponse.json(
      {
        success: true,
        data: bankProfit,
        message: "Bank profit fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to fetch Bank profit ", error);
  }
  return NextResponse.json(
    {
      success: false,
      message: "Failed to fetch Bank profit",
    },
    { status: 200 }
  );
};
