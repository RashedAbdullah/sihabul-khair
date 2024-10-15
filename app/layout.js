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
