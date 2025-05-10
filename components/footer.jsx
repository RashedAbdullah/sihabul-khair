import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import Link from "next/link";
import Image from "next/image";
import { Earth } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Foundation Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image
                src="/favicon.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full border-2 border-black dark:border-white"
              />
              <h3 className="text-lg font-bold text-black dark:text-white">
                সিহাবুল খায়ের ফাউন্ডেশন
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              সিহাবুল খায়ের একটি আর্থিক সংগঠন যা গঠন করা হয়েছে জামিয়া মাদানিয়া
              সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছাপ্রণোদিত কিছু ছাত্রের
              মাধ্যমে। আমাদের একমাত্র লক্ষ্য হালাল ও বৈধ পন্থায় মুনাফা লাভ অথবা
              সার্বিক সমঝোতায় নির্দিষ্ট খাতে ব্যয়।
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-black dark:text-white font-semibold mb-4 text-lg">
              নেভিগেশন লিংক
            </h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  নীতিমালা
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  সদস্যবৃন্দ
                </Link>
              </li>
              <li>
                <Link
                  href="/monthly-amount"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  মাসিক অর্থ
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-black dark:text-white font-semibold mb-4 text-lg">
              ডেভেলপার
            </h4>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                রাশেদ আব্দুল্লাহ
              </span>
              <div className="flex gap-3">
                <a
                  href="https://rashedabdullah.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <Earth className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/Rashed4Abdullah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/RashedAbdullah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/rashed4abdullah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {getEngToBnNumber(new Date().getFullYear())} সিহাবুল খায়ের
            ফাউন্ডেশন | সর্বস্বত্ব সংরক্ষিত
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            সংস্করণ ২.১.০ | সর্বশেষ আপডেট: মে, ২০২৫ ইং
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
