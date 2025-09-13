"use client";

import React, { useMemo, useState } from "react";

/**
 * Al Halaqah — Sale & Profit Calculator (Next.js App Router — Client Component)
 *
 * How to use: drop this file under `app/(some-folder)/page.tsx` or import the component
 * into a page inside the App Router. This is a self-contained client component using Tailwind.
 *
 * Features implemented:
 * - Amount input (numeric)
 * - Member / Non-member toggle
 * - Payment type: Installment or One-time
 * - Installment count (disabled for one-time)
 * - Enforces max installments by investment band
 * - Automatically decides profit % using the policy rules (deterministic mapping)
 * - Shows detailed breakdown: profit amount, total selling price, per-installment amount
 * - Shows warnings when installment > allowed maximum
 * - Displays numbers in Bengali digits (also shows normal western digits on hover)
 */

function toBanglaDigits(n: number | string) {
  const map: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
    ".": ".",
    ",": ",",
  };
  return String(n).split("").map((c) => map[c] ?? c).join("");
}

type PaymentType = "installment" | "one-time";

function getPolicyRate(amount: number, isMember: boolean, paymentType: PaymentType) {
  // Deterministic profit rates based on the Rate Chart agreed earlier.
  // We'll use single values (no ranges) so the calculator always gives a single answer.
  // Mapping (BDT):
  // < 50,000
  //   member: installment 6%, one-time 7%
  //   non-member: installment 9%, one-time 10%
  // 50,000 - 100,000
  //   member: installment 7%, one-time 8%
  //   non-member: installment 11%, one-time 12%
  // > 100,000
  //   member: installment 9%, one-time 10%
  //   non-member: installment 14%, one-time 15%

  const band = amount < 50000 ? "low" : amount <= 100000 ? "mid" : "high";

  if (band === "low") {
    if (isMember) return paymentType === "one-time" ? 7 : 6;
    return paymentType === "one-time" ? 10 : 9;
  }
  if (band === "mid") {
    if (isMember) return paymentType === "one-time" ? 8 : 7;
    return paymentType === "one-time" ? 12 : 11;
  }
  // high
  if (isMember) return paymentType === "one-time" ? 10 : 9;
  return paymentType === "one-time" ? 15 : 14;
}

function maxInstallmentsForAmount(amount: number) {
  if (amount < 50000) return 6;
  if (amount <= 100000) return 12;
  return 18;
}

export default function SaleCalculatorPage() {
  const [amount, setAmount] = useState<number | "">(50000);
  const [isMember, setIsMember] = useState<boolean>(true);
  const [paymentType, setPaymentType] = useState<PaymentType>("installment");
  const [installments, setInstallments] = useState<number>(6);

  const numericAmount = typeof amount === "number" ? amount : 0;

  const rate = useMemo(() => getPolicyRate(numericAmount, isMember, paymentType), [numericAmount, isMember, paymentType]);
  const maxInstallments = useMemo(() => maxInstallmentsForAmount(numericAmount), [numericAmount]);

  // if user selected installments larger than allowed, keep a local capped value but show warning
  const effectiveInstallments = Math.min(installments, maxInstallments);

  const profitAmount = useMemo(() => (numericAmount * rate) / 100, [numericAmount, rate]);
  const sellingPrice = useMemo(() => numericAmount + profitAmount, [numericAmount, profitAmount]);
  const perInstallment = useMemo(() => (effectiveInstallments > 0 ? sellingPrice / effectiveInstallments : sellingPrice), [sellingPrice, effectiveInstallments]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">সমিতি বিক্রয় ক্যালকুলেটর</h1>
      <p className="text-sm text-slate-600 mb-6">Amount লিখুন, সদস্য/অ-সদস্য ও পেমেন্ট টাইপ সিলেক্ট করুন — নিচে বিস্তারিত দেখাবে।</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">মাল/ইনভেস্টের পরিমাণ (টাকা)</label>
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9.]/g, "");
              setAmount(v === "" ? "" : Number(v));
              // adjust installments to not exceed max after amount change
              const newMax = maxInstallmentsForAmount(v === "" ? 0 : Number(v));
              if (installments > newMax) setInstallments(newMax);
            }}
            className="w-full border rounded p-2"
            placeholder="50000"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">সদস্য কি?</label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMember(true)}
              className={`px-3 py-2 rounded ${isMember ? "bg-slate-800 text-white" : "border"}`}>
              সদস্য
            </button>
            <button
              onClick={() => setIsMember(false)}
              className={`px-3 py-2 rounded ${!isMember ? "bg-slate-800 text-white" : "border"}`}>
              অ-সদস্য
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">পেমেন্ট টাইপ</label>
          <div className="flex gap-2">
            <button
              onClick={() => setPaymentType("installment")}
              className={`px-3 py-2 rounded ${paymentType === "installment" ? "bg-slate-800 text-white" : "border"}`}>
              কিস্তি
            </button>
            <button
              onClick={() => setPaymentType("one-time")}
              className={`px-3 py-2 rounded ${paymentType === "one-time" ? "bg-slate-800 text-white" : "border"}`}>
              এককালীন
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">কিস্তির সংখ্যা</label>
          <input
            value={installments}
            onChange={(e) => setInstallments(Math.max(1, Math.floor(Number(e.target.value) || 0)))}
            type="number"
            min={1}
            max={24}
            disabled={paymentType === "one-time"}
            className="w-full border rounded p-2"
          />
          <p className="text-xs text-slate-500">এই পরিমাণের জন্য সর্বোচ্চ কিস্তি: {maxInstallments} মাস</p>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded bg-white shadow-sm">
        <h2 className="font-medium mb-2">ফীব্যাক / রেজাল্ট</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-slate-500">নির্ধারিত লাভের হার</div>
            <div className="text-lg font-semibold">{rate}%</div>
          </div>

          <div>
            <div className="text-xs text-slate-500">লাভের পরিমাণ</div>
            <div className="text-lg font-semibold" title={`${profitAmount.toFixed(2)}`}>
              {toBanglaDigits(profitAmount.toFixed(2))} টাকা
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500">মোট বিক্রয়মূল্য</div>
            <div className="text-lg font-semibold" title={`${sellingPrice.toFixed(2)}`}>
              {toBanglaDigits(sellingPrice.toFixed(2))} টাকা
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500">প্রতি কিস্তি (প্রযোজ্য হলে)</div>
            <div className="text-lg font-semibold" title={`${perInstallment.toFixed(2)}`}>
              {toBanglaDigits(perInstallment.toFixed(2))} টাকা
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          <p>নোট:</p>
          <ul className="list-disc ml-5">
            <li>কিস্তির ক্ষেত্রে যদি আপনার দেওয়া কিস্তি সংখ্যা ({installments}) সর্বোচ্চ সীমা ({maxInstallments}) ছাড়িয়ে যায় — তাহলে স্বয়ংক্রিয়ভাবে কিস্তি সর্বোচ্চ সীমায় সামঞ্জস্য করা হয়েছে ({effectiveInstallments})।</li>
            <li>এককালীন পরিশোধ করলে কিস্তি ক্ষেত্র প্রযোজ্য নয় এবং লাভের হার একটু বেশি ধরা হয়।</li>
          </ul>
        </div>

        {paymentType === "installment" && installments > maxInstallments ? (
          <div className="mt-3 p-3 bg-yellow-50 border rounded text-yellow-800">আপনি যা সিলেক্ট করেছেন({installments}) — সেটি সর্বোচ্চ অনুমোদিত কিস্তি ({maxInstallments}) ছাড়িয়ে যায়। দেখানো কিস্তি সংখ্যাটি সর্বোচ্চ সীমা অনুযায়ী ক্যালকুলেট করা হয়েছে।</div>
        ) : null}

      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => {
            // quick copy summary to clipboard
            const summary = `Amount: ${numericAmount}\nMember: ${isMember ? "Yes" : "No"}\nPayment: ${paymentType}\nRate: ${rate}%\nProfit: ${profitAmount.toFixed(2)}\nTotal: ${sellingPrice.toFixed(2)}\nPer-installment: ${perInstallment.toFixed(2)} (installments: ${effectiveInstallments})`;
            navigator.clipboard.writeText(summary);
            alert("সংক্ষিপ্ত বিবরণ কপি করা হলো ক্লিপবোর্ডে — প্রয়োজন হলে পেস্ট করে রাখুন।");
          }}
          className="px-4 py-2 bg-slate-800 text-white rounded">
          কপি সামারি
        </button>

        <button
          onClick={() => {
            // reset
            setAmount(50000);
            setIsMember(true);
            setPaymentType("installment");
            setInstallments(6);
          }}
          className="px-4 py-2 border rounded">
          রিসেট
        </button>
      </div>

      <p className="mt-6 text-sm text-green-700">উৎসাহ: এটা একটি সরল, স্বয়ংক্রিয় ক্যালকুলেটর — আপনি চাইলে আমি এটাকে এক্সেল/গুগল শিট টেমপ্লেট বা আলাদা ওয়েব পেজ অ্যাপে রূপান্তর করে দেব।</p>
    </div>
  );
}
