import Link from "next/link";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import AdminDialog from "./admin-dialog";
import Image from "next/image";
import { FaMosque } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 py-3 transition-colors duration-300">
      <div className="container flex justify-between items-center">
        {/* Logo with improved styling */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Image
              height={42}
              width={42}
              src="/favicon.png"
              alt="Logo"
              className="rounded-full shadow-md border-2 border-black dark:border-white group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 text-black dark:text-white text-xs px-1.5 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
              <FaMosque className="w-3 h-3" />
            </div>
          </div>
          <span className="hidden sm:inline-block text-xl font-bold text-black dark:text-white">
            সিহাবুল খায়ের
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {[
            { name: "নীতিমালা", path: "/policy" },
            { name: "সদস্যবৃন্দ", path: "/members" },
            { name: "মাসিক অর্থ", path: "/monthly-amount" },
            { name: "ব্যায় বিবরণ", path: "/expenses" },
            { name: "ইনভেস্টমেন্টস", path: "/investment" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="relative px-1 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 dark:bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Admin Button with better styling */}
        <div className="hidden md:inline-block">
          <AdminDialog>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-900/20 dark:border-amber-600 shadow-sm"
            >
              এডমিন
            </Button>
          </AdminDialog>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
