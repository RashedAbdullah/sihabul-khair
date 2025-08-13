"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { IExpense } from "../../../../@types/expense";
import { toast } from "sonner";

// Schema for form validation
const expenseSchema = z.object({
  cost: z.string().min(1, "Cost description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const UpdateExpense = ({ expenses }: { expenses: IExpense[] }) => {
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      cost: "",
      amount: 0,
      date: format(new Date(), "yyyy-MM-dd"),
      note: "",
    },
  });

  // Load data into form for editing
  const handleEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    form.reset({
      ...expense,
      date: format(expense.date, "yyyy-MM-dd"),
    });
  };

  const onUpdate = async (data: ExpenseFormValues) => {
    try {
      if (!selectedExpense) return;

      const res = await fetch(`/api/expenses/${selectedExpense._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to update expense");
      }

      toast.success("খরচ আপডেট করা হয়েছে।");

      form.reset();
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Select
          onValueChange={(value) => {
            const exp = expenses.find((e) => e._id === value);
            if (exp) handleEdit(exp);
          }}
          value={selectedExpense?._id || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="খরচ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {expenses.map((exp) => (
              <SelectItem key={exp._id} value={exp._id}>
                {exp.cost} - {exp.amount} টাকা ({format(exp.date, "dd/MM/yyyy")}
                )
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedExpense ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>খরচের বিবরণ</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পরিমাণ (টাকা)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>তারিখ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>নোট (ঐচ্ছিক)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">আপডেট করুন</Button>
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSelectedExpense(null);
                }}
              >
                বাতিল
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="text-center py-8">একটি খরচ নির্বাচন করুন</p>
      )}
    </>
  );
};

export default UpdateExpense;
