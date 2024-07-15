import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "সিহাবুল খায়ের ফাউন্ডেশন",
  description: "একটি অর্থনৈতিক সংগঠন",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hind.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
