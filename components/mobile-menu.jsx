import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">
            সিহাবুল খায়ের ফাউন্ডেশন
          </SheetTitle>
          <SheetDescription className="text-center">
            (ঐক্য, সম্প্রীতি ও শাতি প্রতিষ্ঠার প্রত্যয়ে)
          </SheetDescription>
        </SheetHeader>
        <div className="">
          <ul className="">
            <li>
              <Link
                href="/policy"
                className="p-2 hover:bg-slate-200 transition-all duration-300 w-full block"
              >
                নীতিমালা
              </Link>
            </li>
            <li>
              <Link
                href="/members"
                className="p-2 hover:bg-slate-200 transition-all duration-300 w-full block"
              >
                সদস্যবৃন্দ
              </Link>
            </li>
            <li>
              <Link
                href="/total-amount"
                className="p-2 hover:bg-slate-200 transition-all duration-300 w-full block"
              >
                মোট অর্থ
              </Link>
            </li>
          </ul>
          <Link href="/admin-pannel" className="text-end block">
            <Button>এডমিন প্যানেল</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
