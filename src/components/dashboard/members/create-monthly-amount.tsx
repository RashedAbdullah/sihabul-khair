"use client";

import React, { useEffect } from "react";
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

type Payment = {
  member: string;
  payment: number;
  month: string;
  paymentDate: string;
};

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "../../../../@types/user";
import { toast } from "sonner";
// import { paymentService } from "@/services";

// Schema for form validation with Bangla error messages
const paymentSchema = z.object({
  member: z.string().min(1, "সদস্য নির্বাচন করতে হবে"),
  payment: z.number().positive("টাকার পরিমাণ অবশ্যই পজিটিভ হতে হবে"),
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "মাস অবশ্যই YYYY-MM ফরম্যাটে হতে হবে"),
  paymentDate: z.string().min(1, "পেমেন্টের তারিখ দিতে হবে"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const CreateMonthlyAmount = ({ members }: { members: IUser[] }) => {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      member: "",
      payment: 3000,
      month: format(new Date(), "yyyy-MM"),
      paymentDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const selectedMemberId = form.watch("member");
  const memberSelected = selectedMemberId !== "";

  useEffect(() => {
    const selectedMember = members.find(
      (m) => m._id.toString() === selectedMemberId
    );
    if (selectedMember) {
      const newAmount = selectedMember.shares * 3000;
      form.setValue("payment", newAmount);
    }
  }, [selectedMemberId, members, form]);

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      // For Add Payment tab
      const newPayment: Payment = {
        member: data.member,
        payment: data.payment,
        month: data.month,
        paymentDate: data.paymentDate,
      };
      // Call the service to create the payment
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPayment),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment");
      }

      toast.success("নতুন মাসের টাকা যুক্ত করা হয়েছে।");
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
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>মাস</FormLabel>
              <FormControl>
                <Input type="month" {...field} disabled={!memberSelected} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment"
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

export default CreateMonthlyAmount;
