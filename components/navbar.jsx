import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b shadow backdrop-blur-lg bg-white/30 py-3">
      <ul className="container flex justify-between items-center">
        <li>
          <Link href="/" className="text-2xl font-semibold">
            সিহাবুল খায়ের ফাউন্ডেশন
          </Link>
        </li>
        <li>
          <Link href="/policy">নীতিমালা</Link>
        </li>
        <li>
          <Link href="/members">সদস্যবৃন্দ</Link>
        </li>
        <li>
          <Link href="/total-amount">মোট অর্থ</Link>
        </li>
        <li>
          <Button>এডমিন প্যানেল</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
