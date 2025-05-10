import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Scale,
  Users,
  HandCoins,
  FileText,
  TrendingUp,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { FaMosque } from "react-icons/fa";

const MobileMenu = () => {
  const menuItems = [
    { name: "নীতিমালা", path: "/policy", icon: <Scale className="w-5 h-5" /> },
    {
      name: "সদস্যবৃন্দ",
      path: "/members",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "মাসিক অর্থ",
      path: "/monthly-amount",
      icon: <HandCoins className="w-5 h-5" />,
    },
    {
      name: "ব্যায় বিবরণ",
      path: "/expenses",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "ইনভেস্টমেন্টস",
      path: "/investment",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden rounded-full w-10 h-10 border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[300px]">
        <SheetHeader className="text-left mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                <FaMosque className="text-white dark:text-black w-5 h-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 text-black dark:text-white text-xs p-1 rounded-full border border-gray-200 dark:border-gray-700">
                <Home className="w-3 h-3" />
              </div>
            </div>
            <div>
              <SheetTitle className="text-lg font-bold">
                সিহাবুল খায়ের
              </SheetTitle>
              <SheetDescription className="text-xs">
                ঐক্য, সম্প্রীতি ও শান্তি
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav className="flex flex-col h-[calc(100%-100px)]">
          <ul className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-800 dark:text-gray-200 font-medium"
                >
                  <SheetTrigger asChild>
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </span>
                  </SheetTrigger>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link href="/dashboard">
              <Button className="w-full gap-2" variant="outline">
                <Lock className="w-4 h-4" />
                এডমিন প্যানেল
              </Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
