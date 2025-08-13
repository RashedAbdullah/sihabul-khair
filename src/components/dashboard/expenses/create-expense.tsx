"use client";

import React from "react";
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
import { toast } from "sonner";

type Expense = {
  cost: string;
  amount: number;
  date: string;
  note: string;
};

// Schema for form validation
const expenseSchema = z.object({
  cost: z.string().min(1, "Cost description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const CreateExpense = () => {
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      cost: "",
      amount: 1,
      date: format(new Date(), "yyyy-MM-dd"),
      note: "",
    },
  });

  const onSubmit = async (data: ExpenseFormValues) => {
    try {
      const newExpense: Expense = {
        cost: data.cost,
        amount: data.amount,
        date: data.date,
        note: data.note || "",
      };

      const res = await fetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify(newExpense),
      });

      if (!res.ok) {
        throw new Error("Failed to create expense");
      }

      toast.success("নতুন খরচ যুক্ত করা হয়েছে।");

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <Button type="submit">যোগ করুন</Button>
      </form>
    </Form>
  );
};

export default CreateExpense;
