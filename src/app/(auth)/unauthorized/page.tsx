import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, Lock } from "lucide-react";
import { organizationInfo } from "@/data/organization-info";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header with icon */}
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
            <ShieldAlert className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-rose-500" />
            প্রবেশ নিষেধ
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            দুঃখিত, ড্যাশবোর্ড শুধুমাত্র এডমিনগণের জন্য সংরক্ষিত। আপনি এখানে
            প্রবেশ করতে পারবেন না।
          </p>

          <div className="mb-8">
            <p className="text-gray-500 text-sm">
              আপনি যদি এডমিন হয়ে থাকেন এবং যদি মনে করেন এটি একটি ভুল, তাহলে
              কর্তৃপক্ষ অথবা ডেভেলপারের সাথে যোগাযোগ করুন।
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand2 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            © {new Date().toLocaleDateString("bn-BD", { year: "numeric" })}{" "}
            {organizationInfo.name}। সর্বস্বত্ত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
