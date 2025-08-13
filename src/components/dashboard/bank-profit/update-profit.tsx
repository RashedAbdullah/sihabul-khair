"use client";

import React, { useState } from "react";
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
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBankProfit } from "../../../../@types/bank-profit";
import { toast } from "sonner";

// Schema for form validation
const bankProfitSchema = z.object({
  amount: z.number().min(0, "Amount must be positive"),
  creditedDate: z.string().min(1, "Date is required"),
  description: z.string().optional(),
});

type BankProfitFormValues = z.infer<typeof bankProfitSchema>;

const UpdateProfit = ({ bankProfits }: { bankProfits: IBankProfit[] }) => {
  const [selectedProfit, setSelectedProfit] = useState<IBankProfit | null>(
    null
  );

  const form = useForm<BankProfitFormValues>({
    resolver: zodResolver(bankProfitSchema),
    defaultValues: {
      amount: 0,
      creditedDate: format(new Date(), "yyyy-MM-dd"),
      description: "ব্যাংক থেকে আসা প্রফিট",
    },
  });

  // Load data into form for editing
  const handleEdit = (profit: IBankProfit) => {
    setSelectedProfit(profit);
    form.reset({
      amount: profit.amount,
      creditedDate: format(parseISO(profit.creditedDate), "yyyy-MM-dd"),
      description: profit.description,
    });
  };

  const onUpdate = async (data: BankProfitFormValues) => {
    try {
      if (!selectedProfit) return;

      const res = await fetch(`/api/bank-profit/${selectedProfit._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update bank profit");
      }

      toast.success("ব্যাংক প্রফিট আপডেট করা হয়েছে।");

      form.reset();
      setSelectedProfit(null);
    } catch (error) {
      console.error("Error updating bank profit:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Select
          onValueChange={(value) => {
            const profit = bankProfits.find((p) => p._id === value);
            if (profit) handleEdit(profit);
          }}
          value={selectedProfit?._id || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="প্রফিট নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {bankProfits.map((profit) => (
              <SelectItem key={profit._id} value={profit._id ?? ""}>
                {profit.amount} টাকা -{" "}
                {format(parseISO(profit.creditedDate), "dd/MM/yyyy")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProfit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
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
                  setSelectedProfit(null);
                }}
              >
                বাতিল
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="text-center py-8">একটি ব্যাংক প্রফিট নির্বাচন করুন</p>
      )}
    </>
  );
};

export default UpdateProfit;
