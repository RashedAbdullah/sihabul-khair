"use client";

import React, { useEffect, useState } from "react";
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
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "../../../../@types/user";
import { toast } from "sonner";

const paymentSchema = z.object({
  member: z.string().min(1, "Member is required"),
  payment: z.number().positive("Payment must be positive"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
  paymentDate: z.string().min(1, "Payment date is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

type ApiPaymentResponse = {
  success: boolean;
  months: string[];
  data: Array<{
    user: IUser;
    payments: Array<{
      month: string;
      status: {
        _id: string;
        payment: number;
        paymentDate: string;
      };
    }>;
  }>;
};

type ProcessedPayment = {
  _id: string;
  member: string;
  memberName: string;
  payment: number;
  month: string;
  paymentDate: string;
};

const UpdateMonthlyPayment = ({ members }: { members: IUser[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedPayment, setSelectedPayment] =
    useState<ProcessedPayment | null>(null);
  const [memberPayments, setMemberPayments] = useState<ProcessedPayment[]>([]);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      member: "",
      payment: 0,
      month: "",
      paymentDate: "",
    },
  });

  // Process API response into a more usable format
  const processPayments = (data: ApiPaymentResponse): ProcessedPayment[] => {
    // If no data or invalid structure, return empty array
    if (
      !data.success ||
      !data.data?.length ||
      !data.data[0]?.payments?.length
    ) {
      return [];
    }

    const userData = data.data[0];

    // Filter out any invalid payments that might be in the response
    return userData.payments
      .filter(
        (payment) =>
          payment?.status?._id &&
          payment?.month &&
          payment?.status?.payment !== undefined
      )
      .map((payment) => ({
        _id: payment.status._id,
        member: userData.user._id.toString(),
        memberName: userData.user.name,
        payment: payment.status.payment,
        month: payment.month,
        paymentDate: payment.status.paymentDate || "",
      }));
  };

  // Fetch payments when member is selected
  useEffect(() => {
    const fetchPayments = async () => {
      if (!selectedMember) return;

      setIsLoading(true);
      try {
        const ress = await fetch(`/api/payments?member=${selectedMember}`);
        const processedPayments = processPayments(await ress.json());

        setMemberPayments(processedPayments);
        setSelectedPayment(null);
        form.reset({
          member: selectedMember,
          payment: 0,
          month: "",
          paymentDate: "",
        });
      } catch (error) {
        toast("Error", {
          description: "Failed to fetch payments",
        });
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMember]);

  // Populate form when payment is selected
  useEffect(() => {
    if (!selectedPayment) return;

    const { member, payment, month, paymentDate } = selectedPayment;

    // ✅ Defensive check: make sure paymentDate is a valid string
    if (!paymentDate || isNaN(Date.parse(paymentDate))) {
      console.warn("Invalid or missing paymentDate:", paymentDate);
      return;
    }

    form.reset({
      member,
      payment,
      month,
      paymentDate: format(parseISO(paymentDate), "yyyy-MM-dd"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPayment]);

  const onUpdate = async (data: PaymentFormValues) => {
    if (!selectedPayment) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/payments/${selectedPayment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member: selectedPayment.member,
          month: data.month,
          payment: data.payment,
          paymentDate: new Date(data.paymentDate).toISOString(),
        }),
      });

      // Refresh payments after update
      const response = await fetch(
        `/api/payments?member=${selectedPayment.member}`
      );
      if (!res.ok || !response.ok) {
        throw new Error("Failed to update payment");
      }
      const processedPayments = processPayments(await response.json());
      setMemberPayments(processedPayments);

      toast("Success", {
        description: "Payment updated successfully",
      });

      // Reset form
      setSelectedPayment(null);
      form.reset();
    } catch (error) {
      toast("Error", {
        description: "Failed to update payment",
      });
      console.error("Error updating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
      {/* Member Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          সদস্য নির্বাচন করুন
        </label>
        <Select
          value={selectedMember}
          onValueChange={setSelectedMember}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-4 py-2 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all">
            <SelectValue
              placeholder={
                <span className="text-gray-400">সদস্য নির্বাচন করুন</span>
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg mt-1 py-1">
            {members.map((member) => (
              <SelectItem
                key={member._id.toString()}
                value={member._id.toString()}
                className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 focus:bg-indigo-100"
              >
                <span className="font-medium">{member.name}</span>
                <span className="text-indigo-600 ml-1">
                  ({member.position})
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Payment Selection */}
      {selectedMember && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            পেমেন্ট নির্বাচন করুন
          </label>

          {memberPayments.length === 0 ? (
            <div className="text-sm text-red-500 p-3 bg-red-50 rounded-lg border border-red-100 text-center">
              এই সদস্যের কোনো পেমেন্ট ইতিহাস নেই।
            </div>
          ) : (
            <Select
              value={selectedPayment?._id || ""}
              onValueChange={(value) => {
                const payment = memberPayments.find((p) => p._id === value);
                setSelectedPayment(payment || null);
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-white border border-gray-300 rounded-lg px-4 py-2 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all">
                <SelectValue
                  placeholder={
                    <span className="text-gray-400">পেমেন্ট নির্বাচন করুন</span>
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg mt-1 py-1 max-h-60 overflow-y-auto">
                {memberPayments.map((payment) => {
                  if (!payment._id || !payment.month) return null;

                  return (
                    <SelectItem
                      key={payment._id}
                      value={payment._id}
                      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 focus:bg-indigo-100"
                    >
                      <div className="flex items-center">
                        <span className="text-indigo-600 mr-2">
                          {payment.paymentDate
                            ? format(
                                parseISO(payment.paymentDate),
                                "dd MMM yyyy"
                              )
                            : "তারিখ নেই"}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="mx-2 font-medium">
                          {payment.month}
                        </span>
                        <span className="text-green-600 font-semibold ml-auto">
                          ৳{payment.payment}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {/* Payment Form */}
      {selectedPayment && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdate)}
            className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">
              পেমেন্ট তথ্য আপডেট করুন
            </h3>

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">মাস</FormLabel>
                  <FormControl>
                    <Input
                      type="month"
                      {...field}
                      disabled={isLoading}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">টাকার পরিমাণ</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">
                        ৳
                      </span>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading}
                        className="bg-gray-50 border border-gray-300 rounded-lg pl-8 px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">পেমেন্ট তারিখ</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled={isLoading}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  আপডেট হচ্ছে...
                </span>
              ) : (
                "আপডেট করুন"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateMonthlyPayment;
