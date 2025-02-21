import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/islamic-banking.jpg";
import TotalAcounting from "@/components/total-accounting";

export default function Home() {
  return (
    <main className="container">
      <div className="container lg:grid grid-cols-2 flex flex-col-reverse items-center gap-16 py-16">
        {/* Text Section */}
        <div className="flex flex-col justify-center text-center lg:text-left gap-8 lg:mt-16">
          <div>
            <h2 className="lg:text-5xl text-4xl font-bold text-gray-900 dark:text-white">
              সিহাবুল খায়ের ফাউন্ডেশন
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              (ঐক্য, সম্প্রীতি ও শান্তি প্রতিষ্ঠার প্রত্যয়ে)
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            সিহাবুল খায়ের একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া
            সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছায় প্রণোদিত কিছু ছাত্রের
            মাধ্যমে। যার একমাত্র লক্ষ্য ও উদ্দেশ্য হালাল ও বৈধ পন্থায় মুনাফা লাভ
            অথবা সার্বিক সমঝোতায় নির্দিষ্ট কোন খাতে ব্যায়।
          </p>
          {/* Buttons Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/total-amount">
              <Button className="flex items-center gap-3 px-6 py-3 text-lg font-semibold w-full bg-blue-600 text-white hover:bg-blue-700 transition">
                মোট অর্থ <MoveRight />
              </Button>
            </Link>
            <Link href="/members">
              <Button
                variant="outline"
                className="flex items-center gap-3 px-6 py-3 text-lg font-semibold w-full border-gray-500 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-300 dark:hover:bg-gray-800"
              >
                সদস্যবৃন্দ <MoveRight />
              </Button>
            </Link>
            <Link href="/policy">
              <Button
                variant="outline"
                className="flex items-center gap-3 px-6 py-3 text-lg font-semibold w-full border-gray-500 text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-300 dark:hover:bg-gray-800"
              >
                নীতিমালা <MoveRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <Image src={IslamicBanking} alt="Islamic Banking" />
          </div>
        </div>
      </div>
      <TotalAcounting />
    </main>
  );
}
