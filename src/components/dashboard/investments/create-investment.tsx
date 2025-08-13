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
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { IUser } from "../../../../@types/user";

// Schema for form validation
const investmentSchema = z.object({
  investee: z.string().min(1, "Investee name is required"),
  reference: z.string().min(1, "Reference is required"),
  agreement: z.any().optional(), // For file upload
  contact: z.string().min(1, "Contact is required"),
  investedAmount: z.number().positive("Amount must be positive"),
  instalments: z.number().min(1, "At least 1 instalment required"),
  loanStartDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  chargedAmount: z.number().min(0, "Profit cannot be negative"),
  status: z.enum(["Active", "Closed"]),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

const CreateInvestment = ({ members }: { members: IUser[] }) => {
  const [agreementPreview, setAgreementPreview] = useState<string | null>(null);

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

  const onSubmit = async (data: InvestmentFormValues) => {
    try {
      const formData = new FormData();
      formData.append("investee", data.investee);
      formData.append("reference", data.reference);
      formData.append("contact", data.contact);
      formData.append("investedAmount", data.investedAmount.toString());
      formData.append("instalments", data.instalments.toString());
      formData.append("loanStartDate", data.loanStartDate);
      formData.append("dueDate", data.dueDate);
      formData.append("chargedAmount", data.chargedAmount.toString());
      formData.append("status", data.status);

      // Handle file upload properly
      if (data.agreement && data.agreement.length > 0) {
        formData.append("agreement", data.agreement[0]);
      } else {
        formData.append("agreement", "");
      }

      const res = await fetch("/api/investments", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create investment");
      }

      toast.success("নতুন ইনভেস্টমেন্ট যুক্ত করা হয়েছে।");

      form.reset();
      setAgreementPreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Consider adding user feedback here
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="investee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  বিনিয়োগ গ্রহীতা (আইডি কার্ড ফলো করে নাম যুক্ত করুন)
                </FormLabel>
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
                <FormLabel>
                  রেফারেন্স / উকিল (যার মাধ্যমে বিনিয়োগ সম্পাদিত হয়েছে)
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="মেম্বার সিলেক্ট করুন" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member._id} value={member.name}>
                        {member.name}
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
            name="agreement"
            render={({}) => (
              <FormItem>
                <FormLabel>চুক্তি (ইমেজ)</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={() => {}} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {agreementPreview && (
            <div className="col-span-2">
              <p className="text-sm font-medium mb-2">চুক্তি প্রিভিউ:</p>
              <Image
                src={agreementPreview}
                alt="Agreement preview"
                width={300}
                height={200}
                className="border rounded"
              />
            </div>
          )}

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
                <FormLabel>ধার্যকৃত (মুনাফা সহ)</FormLabel>
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

        <Button type="submit">যোগ করুন</Button>
      </form>
    </Form>
  );
};

export default CreateInvestment;
