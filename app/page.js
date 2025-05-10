import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/islamic-banking.jpg";
import TotalAcounting from "@/components/total-accounting";

export default function Home() {
  return (
    <main className="container px-4 py-16 mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <Image
              height={80}
              width={80}
              src="/favicon.png"
              alt="Logo"
              className="rounded-full shadow-md"
            />
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              সিহাবুল খায়ের ফাউন্ডেশন
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              (ঐক্য, সম্প্রীতি ও শান্তি প্রতিষ্ঠার প্রত্যয়ে)
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
            সিহাবুল খায়ের একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া
            সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছায় প্রণোদিত কিছু ছাত্রের
            মাধ্যমে। যার একমাত্র লক্ষ্য ও উদ্দেশ্য হালাল ও বৈধ পন্থায় মুনাফা লাভ
            অথবা সার্বিক সমঝোতায় নির্দিষ্ট কোন খাতে ব্যায়।
          </p>

          {/* Buttons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/monthly-amount" className="w-full">
              <Button className="w-full px-6 py-4 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition flex justify-center items-center gap-2">
                মাসিক অর্থ <MoveRight />
              </Button>
            </Link>
            <Link href="/members" className="w-full">
              <Button
                variant="outline"
                className="w-full px-6 py-4 text-lg font-semibold border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-300 dark:hover:bg-gray-800 flex justify-center items-center gap-2"
              >
                সদস্যবৃন্দ <MoveRight />
              </Button>
            </Link>
            <Link href="/policy" className="w-full">
              <Button
                variant="outline"
                className="w-full px-6 py-4 text-lg font-semibold border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-300 dark:hover:bg-gray-800 flex justify-center items-center gap-2"
              >
                নীতিমালা <MoveRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm lg:max-w-md rounded-xl overflow-hidden">
            <Image
              src={IslamicBanking}
              alt="Islamic Banking"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Accounting Section */}
      <div className="mt-20">
        <TotalAcounting />
      </div>
    </main>
  );
}
