export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { organizationInfo } from "@/data/organization-info";
import { Toaster } from "sonner";

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: organizationInfo.name,
  description: organizationInfo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tiroBangla.className}  antialiased text-primary-text bg-primary-bg selection:bg-brand2 selection:text-white`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
