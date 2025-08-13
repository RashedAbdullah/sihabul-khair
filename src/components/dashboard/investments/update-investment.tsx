"use client";

import React, { useState } from "react";
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
import { format, parseISO } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IInvestment } from "../../../../@types/investment";
import { formatPrice } from "@/utils/formate-price";
import { toast } from "sonner";

// Updated schema with only the fields used in the PATCH controller
const investmentSchema = z.object({
  investee: z.string().min(1, "Investee name is required"),
  reference: z.string().min(1, "Reference is required"),
  contact: z.string().min(1, "Contact is required"),
  investedAmount: z.number().positive("Amount must be positive"),
  instalments: z.number().min(1, "At least 1 instalment required"),
  loanStartDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  chargedAmount: z.number().min(0, "Profit cannot be negative"),
  status: z.enum(["Active", "Closed"]),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

const UpdateInvestment = ({ investments }: { investments: IInvestment[] }) => {
  const [selectedInvestment, setSelectedInvestment] =
    useState<IInvestment | null>(null);

  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      investee: "",
      reference: "",
      contact: "",
      investedAmount: 0,
      instalments: 1,
      loanStartDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date(), "yyyy-MM-dd"),
      chargedAmount: 0,
      status: "Active",
    },
  });

  // Load data into form for editing
  const handleEdit = (investment: IInvestment) => {
    setSelectedInvestment(investment);
    form.reset({
      ...investment,
      loanStartDate: format(parseISO(investment.loanStartDate), "yyyy-MM-dd"),
      dueDate: format(parseISO(investment.dueDate), "yyyy-MM-dd"),
    });
  };

  const onUpdate = async (data: InvestmentFormValues) => {
    try {
      if (!selectedInvestment) return;

      const response = await fetch(
        `/api/investments/${selectedInvestment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update investment");
      }

      toast.success("ইনভেস্টমেন্ট সফলভাবে আপডেট করা হয়েছে");

      form.reset();
      setSelectedInvestment(null);
    } catch (error) {
      console.error("Error updating investment:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Select
          onValueChange={(value) => {
            const inv = investments.find((i) => i._id === value);
            if (inv) handleEdit(inv);
          }}
          value={selectedInvestment?._id.toString() || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="বিনিয়োগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {investments.map((inv) => (
              <SelectItem key={inv._id.toString()} value={inv._id.toString()}>
                {inv.investee} ({inv.reference}) -{" "}
                {formatPrice(inv.investedAmount)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedInvestment ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="investee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>বিনিয়োগ গ্রহীতা</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>উকিল</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>যোগাযোগ নম্বর</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>বিনিয়োগ পরিমাণ (টাকা)</FormLabel>
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
                name="instalments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>কিস্তির সংখ্যা</FormLabel>
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
                name="loanStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>শুরু তারিখ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>শেষ তারিখ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chargedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ধার্যকৃত (টাকা)</FormLabel>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>অবস্থা</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="অবস্থা নির্বাচন করুন" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">সক্রিয়</SelectItem>
                        <SelectItem value="Closed">বন্ধ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">আপডেট করুন</Button>
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSelectedInvestment(null);
                }}
              >
                বাতিল
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="text-center py-8">একটি বিনিয়োগ নির্বাচন করুন</p>
      )}
    </>
  );
};

export default UpdateInvestment;
