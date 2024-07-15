import Link from "next/link";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b shadow backdrop-blur-lg bg-white/30 py-3">
      <div className="container flex justify-between">
        <h2 className="">
          <Link href="/" className="text-2xl font-semibold">
            সিহাবুল খায়ের ফাউন্ডেশন
          </Link>
        </h2>
        <ul className="hidden lg:flex justify-center items-center align-middle gap-10">
          <li>
            <Link href="/policy">নীতিমালা</Link>
          </li>
          <li>
            <Link href="/members">সদস্যবৃন্দ</Link>
          </li>
          <li>
            <Link href="/total-amount">মোট অর্থ</Link>
          </li>
        </ul>
        <Link href="/admin-pannel" className="hidden lg:block">
          <Button>এডমিন প্যানেল</Button>
        </Link>

        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
