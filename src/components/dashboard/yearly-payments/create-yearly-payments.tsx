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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "../../../../@types/user";
import { IYearlyPayment } from "../../../../@types/yearly-amount";
import mongoose from "mongoose";
import { toast } from "sonner";

// Schema for form validation with Bangla error messages
const paymentSchema = z.object({
  member: z.string().min(1, "সদস্য নির্বাচন করতে হবে"),
  amount: z.number().positive("টাকার পরিমাণ অবশ্যই পজিটিভ হতে হবে"),
  title: z.string().min(1, "মাস অবশ্যই YYYY-MM ফরম্যাটে হতে হবে"),
  paymentDate: z.string().min(1, "পেমেন্টের তারিখ দিতে হবে"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const CreateYearlyPayment = ({ members }: { members: IUser[] }) => {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      member: "",
      amount: 10000,
      title: "",
      paymentDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const memberSelected = form.watch("member") !== "";

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      // For Add Payment tab
      // Convert member string to ObjectId
      const newPayment: IYearlyPayment = {
        member: new mongoose.Types.ObjectId(data.member),
        amount: data.amount,
        title: data.title,
        paymentDate: data.paymentDate,
      };

      const res = await fetch("/api/yearly-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPayment),
      });

      if (!res.ok) {
        throw new Error("Failed to create yearly payment");
      }

      toast.success("নতুন বার্ষিক / এককালীন এমাউন্ট যুক্ত করা হয়েছে।");

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormLabel>সদস্য</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="সদস্য নির্বাচন করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem
                      key={member._id.toString()}
                      value={member._id.toString()}
                    >
                      {member.name} ({member.position})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বছর সিলেক্ট</FormLabel>
              <Select
                disabled={!memberSelected}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="বছর সিলেক্ট করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["2025-2026", "2026-2027", "2027-2028", "2028-2029"].map(
                    (year, index) => (
                      <SelectItem
                        key={index}
                        value={year}
                        disabled={!memberSelected}
                      >
                        {year}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>টাকার পরিমাণ</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={!memberSelected}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পেমেন্ট তারিখ</FormLabel>
              <FormControl>
                <Input type="date" {...field} disabled={!memberSelected} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!memberSelected}>
          যোগ করুন
        </Button>
      </form>
    </Form>
  );
};

export default CreateYearlyPayment;
