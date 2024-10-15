import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/islamic-banking.jpg";
import TotalAcounting from "@/components/total-accounting";

export default function Home() {
  return (
    <main>
      <div className="container lg:grid grid-cols-2 flex flex-col-reverse">
        <div className="flex flex-col justify-center align-middle items-center gap-10 lg:mt-32 text-lg">
          <div className="flex flex-col justify-center items-center align-middle">
            <h2 className="lg:text-4xl text-3xl">সিহাবুল খায়ের ফাউন্ডেশন</h2>
            <p>(ঐক্য, সম্প্রীতি ও শান্তি প্রতিষ্ঠার প্রত্যয়ে)</p>
          </div>
          <div>
            <p>
              সিহাবুল খায়ের একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া
              সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছায় প্রণোদিত কিছু ছাত্রের
              মাধ্যমে। যার একমাত্র লক্ষ্য ও উদ্দেশ্য হালাল ও বৈধ পন্থায় মুনাফা
              লাভ অথবা সার্বিক সমঝোতায় নির্দিষ্ট কোন খাতে ব্যায়।
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Link href="/total-amount" className="col-span-4 md:col-span-1">
              <Button className="flex gap-3 w-full">
                মোট অর্থ <MoveRight />
              </Button>
            </Link>
            <Link href="/members" className="md:col-span-1 col-span-2">
              <Button variant="outline" className="flex gap-3 w-full">
                সদস্যবৃন্দ <MoveRight />
              </Button>
            </Link>
            <Link href="/policy" className="md:col-span-1 col-span-2">
              <Button variant="outline" className="flex gap-3 w-full">
                নীতিমালা <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center align-middle items-center">
          <div>
            <Image src={IslamicBanking} alt="" />
          </div>
        </div>
      </div>
      <TotalAcounting />
    </main>
  );
}
