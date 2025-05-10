import Link from "next/link";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import AdminDialog from "./admin-dialog";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b shadow backdrop-blur-lg bg-white/30 py-3">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          <Image
            height={40}
            width={40}
            src="/favicon.png"
            alt="Logo"
            className="rounded-full shadow-md"
          />
        </Link>
        <ul className="hidden lg:flex justify-center items-center align-middle gap-10">
          <li>
            <Link href="/policy">নীতিমালা</Link>
          </li>
          <li>
            <Link href="/members">সদস্যবৃন্দ</Link>
          </li>
          <li>
            <Link href="/monthly-amount">মাসিক অর্থ</Link>
          </li>
          <li>
            <Link href="/expenses">ব্যায় বিবরণ</Link>
          </li>
          <li>
            <Link href="/investment">ইনভেস্টমেন্টস</Link>
          </li>
        </ul>
        <div className="hidden md:inline-block">
          <AdminDialog />
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
