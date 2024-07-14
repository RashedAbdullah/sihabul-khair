import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/islamic-banking.jpg";

export default function Home() {
  return (
    <main className="container grid grid-cols-2">
      <div className="flex flex-col justify-center align-middle items-center gap-10 lg:mt-32 text-lg">
        <div className="flex flex-col justify-center items-center align-middle">
          <h2 className="lg:text-4xl text-3xl">সিহাবুল খায়ের ফাউন্ডেশন</h2>
          <p>(ঐক্য, সম্প্রীতি ও শাতি প্রতিষ্ঠার প্রত্যয়ে)</p>
        </div>
        <div>
          <p>
            সিহাবুল খায়ের একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া
            সিলোনিয়া ২০২০-২১ মেশকাত জামাতের ছাত্রবৃন্দের মাধ্যমে। সিহাবুল খায়ের
            একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া সিলোনিয়া
            ২০২০-২১ মেশকাত জামাতের ছাত্রবৃন্দের মাধ্যমে। সিহাবুল খায়ের একটি
            আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া সিলোনিয়া ২০২০-২১
            মেশকাত জামাতের ছাত্রবৃন্দের মাধ্যমে। সিহাবুল খায়ের একটি আর্থিক
            সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া সিলোনিয়া ২০২০-২১ মেশকাত
            জামাতের ছাত্রবৃন্দের মাধ্যমে।
          </p>
        </div>
        <div className="flex gap-4">
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
    </main>
  );
}
