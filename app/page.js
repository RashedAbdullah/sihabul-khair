import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/islamic-banking.jpg";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import {
  getInvoices,
  getTotalAmount,
  getTotalShare,
} from "@/actions/getInvices";

export default async function Home() {
  const invoices = await getInvoices();
  const totalAmounts = getTotalAmount(invoices);

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
          <div className="flex lg:gap-4 gap-2">
            <Link href="/total-amount">
              <Button className="flex gap-3">
                মোট অর্থ <MoveRight />
              </Button>
            </Link>
            <Link href="/members">
              <Button variant="outline" className="flex gap-3">
                সদস্যবৃন্দ <MoveRight />
              </Button>
            </Link>
            <Link href="/policy">
              <Button variant="outline" className="flex gap-3">
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
      <div className="flex lg:flex-row flex-col justify-between container mt-10">
        <div className="p-4">
          <h3 className="text-4xl font-Tiro_Bangla">
            {getEngToBnNumber(invoices.length)}
          </h3>
          <h3>মোট সদস্য-সংখ্যা</h3>
        </div>
        <div className="lg:border-r-2 border-b-2"></div>
        <div className="p-4">
          <h3 className="text-4xl font-Tiro_Bangla">
            {getEngToBnNumber(getTotalShare(invoices))}
          </h3>
          <h3>শেয়ার সংখ্যা</h3>
        </div>
        <div className="lg:border-r-2 border-b-2"></div>
        <div className="p-4">
          <h3 className="text-4xl font-Tiro_Bangla">
            {formatPrice(getTotalAmount(invoices))}
          </h3>
          <h3>টোটাল এমাউন্ট</h3>
        </div>
      </div>
    </main>
  );
}
