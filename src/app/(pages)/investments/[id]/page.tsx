import React from "react";
import Image from "next/image";
import {
  CalendarDays,
  Phone,
  User2,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Coins,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/formate-price";
import { Progress } from "@/components/ui/progress";
import { InvestmentService } from "@/services";
import { getEnToBn } from "@/utils/en-to-bn";
import { formatDateToBangla } from "@/utils/format-date";
import { IInvestment } from "../../../../../@types/investment";

interface Installment {
  amount: number;
  date: Date;
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const InvestmentDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const { data } = await InvestmentService.getInvestmentById(id);
  const investment = Array.isArray(data)
    ? (data[0] as unknown as unknown as IInvestment)
    : (data as unknown as IInvestment);

  const totalPaid = investment.instalmentHistory.reduce(
    (sum, installment) => sum + installment.amount,
    0
  );

  const remainingAmount =
    investment.investedAmount - (totalPaid - investment.paidProfit);
  const repaymentProgress =
    ((totalPaid - investment.paidProfit) /
      (investment.chargedAmount - investment.profit)) *
    100;

  console.log("repaymentProgress ", repaymentProgress);

  const profitProgress = (investment.paidProfit / investment.profit) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-kalpurush">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">বিনিয়োগ বিবরণ</h1>
          <div className="flex items-center gap-4 mt-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User2 className="w-5 h-5 text-primary" />
              {investment.investee}
            </h2>
            <Badge
              variant={
                investment.status === "Active" ? "default" : "destructive"
              }
              className="text-sm"
            >
              {investment.status === "Active" ? "চলমান" : "বন্ধ"}
            </Badge>
          </div>
        </div>
        <div className="bg-secondary/50 px-4 py-2 rounded-lg">
          <p className="text-sm text-muted-foreground">রেফারেন্স / উকিল</p>
          <p className="font-medium">{investment.reference}</p>
        </div>
      </div>

      {/* Basic Information Card */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            মৌলিক তথ্য
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          {investment.contact && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="w-4 h-4" />
                যোগাযোগ
              </p>
              <p className="font-medium">{investment.contact}</p>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">কিস্তি সংখ্যা</p>
            <p className="font-medium">
              {getEnToBn(investment.instalments)} টি
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              ঋণের শুরু
            </p>
            <p className="font-medium">
              {formatDateToBangla(investment.loanStartDate)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              সময়সীমা
            </p>
            <p className="font-medium">
              {formatDateToBangla(investment.dueDate)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Agreement Image */}
      {investment.agreement && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              চুক্তিপত্র
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg shadow-sm border border-muted bg-white">
              <Image
                src={investment.agreement}
                alt="চুক্তিপত্র"
                width={800}
                height={500}
                className="rounded-md w-full h-auto object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Principal Amount Card */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="w-5 h-5 text-primary" />
              মূল অর্থ বিবরণ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-muted-foreground">মোট অর্থ</p>
                <p className="text-sm font-medium">
                  {formatPrice(investment.chargedAmount - investment.profit)}
                </p>
              </div>
              <Progress value={repaymentProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-800">পরিশোধিত</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatPrice(totalPaid - investment.paidProfit)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ({repaymentProgress.toFixed(1)}%)
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <p className="text-sm text-amber-800">অবশিষ্ট</p>
                <p className="text-lg font-semibold text-amber-600">
                  {formatPrice(remainingAmount)}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  ({(100 - repaymentProgress).toFixed(1)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="w-5 h-5 text-primary" />
              লাভের বিবরণ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-muted-foreground">পরিশোধিত লাভ</p>
                <p className="text-sm font-medium text-blue-600">
                  {formatPrice(investment.profit)}
                </p>
              </div>
              <Progress value={profitProgress} className="h-2 bg-blue-100" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-800">পরিশোধিত লাভ</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatPrice(investment.paidProfit)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ({profitProgress.toFixed(1)}%)
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <p className="text-sm text-amber-800">অবশিষ্ট লাভ</p>
                <p className="text-lg font-semibold text-amber-600">
                  {formatPrice(investment.profit - investment.paidProfit)}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  ({(100 - profitProgress).toFixed(1)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installment History */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5 text-primary" />
            কিস্তি পরিশোধ হিস্টোরি
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investment.instalmentHistory.length > 0 ? (
              <ul className="space-y-3">
                {investment.instalmentHistory.map(
                  (inst: Installment, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {formatDateToBangla(inst.date)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            কিস্তি #{idx + 1}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatPrice(inst.amount)}
                      </span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p>কোন কিস্তি পরিশোধের তথ্য পাওয়া যায়নি</p>
              </div>
            )}

            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center">
                <p className="font-medium">মোট পরিশোধিত</p>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(totalPaid)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-muted-foreground">মূল অর্থ থেকে</p>
                <p className="text-sm font-medium">
                  {repaymentProgress.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentDetailsPage;
