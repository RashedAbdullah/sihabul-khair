"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IInvestment } from "../../../../@types/investment";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvestmentService } from "@/services";
import { formatPrice } from "@/utils/formate-price";

export const instalmentSchema = z.object({
  investmentId: z.string().min(1, "বিনিয়োগ নির্বাচন করুন"),
  amount: z.number().min(1, "পরিমাণ অবশ্যই ১ টাকার বেশি হতে হবে"),
  date: z.string().min(1, "তারিখ অবশ্যই প্রদান করতে হবে"),
});

type FormData = z.infer<typeof instalmentSchema>;

const AddInstalmentForm = ({ investments }: { investments: IInvestment[] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof instalmentSchema>>({
    resolver: zodResolver(instalmentSchema),
    defaultValues: {
      investmentId: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedInvestee = form.watch("investmentId");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/investments/${data.investmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(data.amount),
          date: data.date,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add instalment");
      }

      toast.success("নতুন কিস্তি সফলভাবে যোগ করা হয়েছে");
      form.reset();
    } catch (error) {
      console.error("Error while adding instalment ", error);
      toast.error("ইনস্টলমেন্ট যোগ করতে ব্যর্থ হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        নতুন কিস্তি যোগ করুন
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="investmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>বিনিয়োগ নির্বাচন করুন</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="-- নির্বাচন করুন --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {investments.map((investment) => (
                      <SelectItem
                        key={investment._id.toString()}
                        value={investment._id.toString()}
                      >
                        {investment.investee} -{" "}
                        {formatPrice(investment.chargedAmount)}
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>কিস্তির পরিমাণ (টাকা)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="পরিমাণ লিখুন"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={!selectedInvestee}
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
                <FormLabel>কিস্তির তারিখ</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    disabled={!selectedInvestee}
                    max={new Date().toISOString().split("T")[0]} // Prevent future dates
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !selectedInvestee}
            className="w-full"
          >
            {isSubmitting ? "সাবমিট করা হচ্ছে..." : "কিস্তি যোগ করুন"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddInstalmentForm;
