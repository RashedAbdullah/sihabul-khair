"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBankProfit } from "../../../../@types/bank-profit";

const BankProfits = ({ bankProfits }: { bankProfits: IBankProfit[] }) => {
  // Load data into form for editing
  // const handleEdit = (profit: BankProfit) => {
  //   setSelectedProfit(profit);
  //   form.reset({
  //     amount: profit.amount,
  //     creditedDate: format(parseISO(profit.creditedDate), "yyyy-MM-dd"),
  //     description: profit.description,
  //   });
  // };

  // const deleteProfit = (id: string) => {
  //   setBankProfits(bankProfits.filter((profit) => profit.id !== id));
  // };

  // Calculate total profits
  const totalProfits = bankProfits.reduce(
    (sum, profit) => sum + profit.amount,
    0
  );
  return (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800">
          মোট ব্যাংক প্রফিট: {totalProfits} টাকা
        </h3>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">ব্যাংক প্রফিটের তালিকা</h3>
        {bankProfits.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>তারিখ</TableHead>
                <TableHead className="text-right">পরিমাণ</TableHead>
                <TableHead>বিবরণ</TableHead>
                <TableHead className="text-right">কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankProfits
                .sort(
                  (a, b) =>
                    new Date(b.creditedDate).getTime() -
                    new Date(a.creditedDate).getTime()
                )
                .map((profit) => (
                  <TableRow key={profit._id}>
                    <TableCell>
                      {format(parseISO(profit.creditedDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      {profit.amount} টাকা
                    </TableCell>
                    <TableCell>{profit.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm">এডিট</Button>
                        <Button size="sm" variant="destructive">
                          মুছুন
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <p>কোন ব্যাংক প্রফিট রেকর্ড পাওয়া যায়নি</p>
        )}
      </div>
    </div>
  );
};

export default BankProfits;
