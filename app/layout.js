import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL("https://sihabul-khair.vercel.app"),
  title: "সিহাবুল খায়ের ফাউন্ডেশন",
  description:
    "সিহাবুল খায়ের একটি আর্থিক সংগঠন। যা গঠন করা হয়েছে, জামিয়া মাদানিয়া সিলোনিয়া ২০২০-২১ মেশকাত ব্যাচের স্বেচ্ছায় প্রণোদিত কিছু ছাত্রের মাধ্যমে। যার একমাত্র লক্ষ্য ও উদ্দেশ্য হালাল ও বৈধ পন্থায় মুনাফা লাভ অথবা সার্বিক সমঝোতায় নির্দিষ্ট কোন খাতে ব্যায়।",
  keywords:
    "সিহাবুল খায়ের, আর্থিক সংগঠন, দাতব্য প্রতিষ্ঠান, হালাল বিনিয়োগ, মাদরাসা ছাত্র, বাংলাদেশ",
  authors: [
    {
      name: "সিহাবুল খায়ের ফাউন্ডেশন",
      url: "https://sihabul-khair.vercel.app",
    },
  ],
  creator: "সিহাবুল খায়ের ফাউন্ডেশন",
  publisher: "সিহাবুল খায়ের ফাউন্ডেশন",

  openGraph: {
    title: "সিহাবুল খায়ের ফাউন্ডেশন",
    description: "সিহাবুল খায়ের ফাউন্ডেশন একটি স্বেচ্ছাসেবী অর্থনৈতিক সংগঠন।",
    url: "https://sihabul-khair.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://sihabul-khair.vercel.app/_next/image?url=%2Ffavicon.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "সিহাবুল খায়ের ফাউন্ডেশন লোগো",
      },
    ],
    siteName: "সিহাবুল খায়ের ফাউন্ডেশন",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "সিহাবুল খায়ের ফাউন্ডেশন",
    description: "সিহাবুল খায়ের ফাউন্ডেশন একটি অর্থনৈতিক সংগঠন।",
    images: [
      "https://sihabul-khair.vercel.app/_next/image?url=%2Ffavicon.png&w=256&q=75",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://sihabul-khair.vercel.app/",
    languages: {
      bn: "https://sihabul-khair.vercel.app/",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={tiroBangla.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
