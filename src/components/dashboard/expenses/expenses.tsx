"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { IExpense } from "../../../../@types/expense";



const Expenses = ({ expenses }: { expenses: IExpense[] }) => {







  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800">মোট খরচ: 43543 টাকা</h3>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">সকল খরচের তালিকা</h3>
        {expenses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>তারিখ</TableHead>
                <TableHead>খরচের বিবরণ</TableHead>
                <TableHead className="text-right">পরিমাণ</TableHead>
                <TableHead>নোট</TableHead>
                <TableHead className="text-right">কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{format(expense.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{expense.cost}</TableCell>
                    <TableCell className="text-right">
                      {expense.amount} টাকা
                    </TableCell>
                    <TableCell>{expense.note || "-"}</TableCell>
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
          <p>কোন খরচ রেকর্ড পাওয়া যায়নি</p>
        )}
      </div>
    </div>
  );
};

export default Expenses;
