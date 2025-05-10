import { Button } from "@/components/ui/button";
import { MoveRight, HandCoins, Users, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IslamicBanking from "@/public/banking.png";
import TotalAcounting from "@/components/total-accounting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaMosque } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0d0d0d] dark:to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <div className="relative">
                <Image
                  height={100}
                  width={100}
                  src="/favicon.png"
                  alt="Logo"
                  className="rounded-full shadow-lg border-4 border-green-950"
                />
                <Badge
                  variant="outline"
                  className="absolute -bottom-2 -right-2 bg-white dark:bg-black text-black dark:text-white border-black dark:border-white"
                >
                  প্রতিষ্ঠিত ২০২৪ ইং
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
                সিহাবুল খায়ের ফাউন্ডেশন
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium italic">
                (ঐক্য, সম্প্রীতি ও শান্তি প্রতিষ্ঠার প্রত্যয়ে)
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              সিহাবুল খায়ের একটি আর্থিক সংগঠন যা গঠন করা হয়েছে জামিয়া মাদানিয়া
              সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছাপ্রণোদিত কিছু ছাত্রের
              মাধ্যমে। আমাদের একমাত্র লক্ষ্য হালাল ও বৈধ পন্থায় মুনাফা লাভ অথবা
              সার্বিক সমঝোতায় নির্দিষ্ট খাতে ব্যয়।
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/70 dark:bg-black/70 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FaMosque className="w-5 h-5 text-black dark:text-white" />
                  <span className="font-medium">ইসলামিক নীতিমালা</span>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-black/70 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <HandCoins className="w-5 h-5 text-black dark:text-white" />
                  <span className="font-medium">হালাল বিনিয়োগ</span>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Link href="/monthly-amount">
                <Button className="w-full h-14 bg-black hover:bg-gray-800 text-white shadow-lg transition-all dark:bg-white dark:hover:bg-gray-200 dark:text-black">
                  <span className="mr-2">মাসিক অর্থ</span>
                  <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/members">
                <Button
                  variant="outline"
                  className="w-full h-14 border-black text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 dark:border-white"
                >
                  <Users className="h-5 w-5 mr-2" />
                  সদস্যবৃন্দ
                </Button>
              </Link>
              <Link href="/policy">
                <Button
                  variant="outline"
                  className="w-full h-14 border-black text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 dark:border-white"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  নীতিমালা
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center relative">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 relative">
              <Image
                src={IslamicBanking}
                alt="Islamic Banking"
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-6">
                <blockquote className="text-white italic">
                  <p className="text-lg">
                    &quot;আল্লাহ ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম
                    করেছেন&quot;
                  </p>
                  <footer className="mt-2 text-gray-300">
                    - সূরা আল-বাকারা (২:২৭৫)
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
              আমাদের উদ্দেশ্য ও লক্ষ্য
            </h2>
            <Separator className="mb-8 max-w-md mx-auto bg-gray-300 dark:bg-gray-700" />

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandCoins className="text-black dark:text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-black dark:text-white">
                    হালাল বিনিয়োগ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    শরিয়াহ সম্মত পন্থায় অর্থনৈতিক কর্মকাণ্ড পরিচালনা করা
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-black dark:text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-black dark:text-white">
                    সদস্যদের কল্যাণ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    সদস্যদের মধ্যে পারস্পরিক সহযোগিতা ও আর্থিক নিরাপত্তা নিশ্চিত
                    করা
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMosque className="text-black dark:text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-black dark:text-white">
                    ইসলামিক মূল্যবোধ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    ইসলামিক শিক্ষা ও দাওয়াতের কাজে সহায়তা প্রদান
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Accounting Section */}
      <section className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          <TotalAcounting />
        </div>
      </section>

      {/* Mission Statement Footer */}
      <section className="bg-gray-200 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <FaMosque className="w-10 h-10 text-black dark:text-white mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
              আমাদের প্রত্যয়
            </h3>
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              &quot;হালাল উপার্জন ও শরিয়াহ সম্মত বিনিয়োগের মাধ্যমে আমরা গড়ে
              তুলতে চাই একটি আত্মনির্ভরশীল মুসলিম সম্প্রদায়। যেখানে থাকবে
              পারস্পরিক সহযোগিতা, আর্থিক স্বচ্ছতা ও ইসলামিক মূল্যবোধের
              চর্চা।&quot;
            </blockquote>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white dark:bg-black px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <HandCoins className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-medium">হালাল বিনিয়োগ</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-black px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Users className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-medium">সামষ্টিক কল্যাণ</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-black px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <FileText className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-medium">আর্থিক স্বচ্ছতা</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
