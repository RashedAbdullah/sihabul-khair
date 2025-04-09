import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
});
export const metadata = {
  title: "সিহাবুল খায়ের ফাউন্ডেশন",
  description: "একটি অর্থনৈতিক সংগঠন",
  keywords: "সিহাবুল খায়ের, অর্থনৈতিক সংগঠন, দাতব্য প্রতিষ্ঠান, বাংলাদেশ",
  author: "সিহাবুল খায়ের ফাউন্ডেশন",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  openGraph: {
    title: "সিহাবুল খায়ের ফাউন্ডেশন",
    description: "একটি অর্থনৈতিক সংগঠন",
    url: "https://sihabul-khair.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://sihabul-khair.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সিহাবুল খায়ের ফাউন্ডেশন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "সিহাবুল খায়ের ফাউন্ডেশন",
    description: "একটি অর্থনৈতিক সংগঠন",
    image: "https://yourwebsite.com/twitter-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={tiroBangla.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
