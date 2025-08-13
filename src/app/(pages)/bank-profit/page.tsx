"use client";

import { Banknote, CalendarCheck, StickyNote, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dummyProfits = [
  {
    _id: "1",
    amount: 5000,
    creditedDate: "2025-06-01",
    description: "সঞ্চয়ী অ্যাকাউন্টের প্রফিট",
  },
  {
    _id: "2",
    amount: 3000,
    creditedDate: "2025-06-15",
    description: "এফডিআর প্রফিট",
  },
  {
    _id: "3",
    amount: 4500,
    creditedDate: "2025-07-01",
    description: "ডিপিএস প্রফিট",
  },
];

export default function BankProfitsPage() {
  const totalProfit = dummyProfits.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-primary">ব্যাংক প্রফিট</h1>
        <p className="text-muted-foreground">সমস্ত ব্যাংক প্রফিটের বিবরণ</p>
      </div>

      {/* Total Profit Summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <Banknote className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">মোট প্রফিট</p>
          <p className="text-3xl font-bold text-primary">
            {totalProfit.toLocaleString()} ৳
          </p>
        </CardContent>
      </Card>

      {/* Profits List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
          <StickyNote className="w-5 h-5" />
          প্রফিটের তালিকা
        </h2>

        {dummyProfits.map((profit) => (
          <Card key={profit._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-lg text-primary">
                    {profit.amount.toLocaleString()} ৳
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profit.description}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <Badge variant="outline" className="text-xs mb-1">
                    {new Date(profit.creditedDate).toLocaleDateString("bn-BD", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarCheck className="w-3 h-3" />
                    {new Date(profit.creditedDate).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
