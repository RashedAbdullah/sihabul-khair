"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { format } from "date-fns";
import { IBankProfit } from "../../../../@types/bank-profit";
import { toast } from "sonner";

// Schema for form validation
const bankProfitSchema = z.object({
  amount: z.number().min(0, "Amount must be positive"),
  creditedDate: z.string().min(1, "Date is required"),
  description: z.string().optional(),
});

type BankProfitFormValues = z.infer<typeof bankProfitSchema>;

const CreateProfit = () => {
  const form = useForm<BankProfitFormValues>({
    resolver: zodResolver(bankProfitSchema),
    defaultValues: {
      amount: 0,
      creditedDate: format(new Date(), "yyyy-MM-dd"),
      description: "ব্যাংক থেকে আসা প্রফিট",
    },
  });

  const onSubmit = async (data: BankProfitFormValues) => {
    try {
      const newBankProfit: IBankProfit = {
        amount: data.amount,
        creditedDate: data.creditedDate,
        description: data.description || "ব্যাংক থেকে আসা প্রফিট",
      };

      const res = await fetch("/api/bank-profit", {
        method: "POST",
        body: JSON.stringify(newBankProfit),
      });

      if (!res.ok) {
        throw new Error("Failed to create bank profit");
      }

      toast.success("নতুন প্রফিট যুক্ত করা হয়েছে।");

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
            name="creditedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>জমার তারিখ</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিবরণ (ঐচ্ছিক)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className="resize-none"
                  placeholder="ব্যাংক থেকে আসা প্রফিট"
                />
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

export default CreateProfit;
