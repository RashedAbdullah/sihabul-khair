import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigations } from "@/data/navigations";
import { organizationInfo } from "@/data/organization-info";
import ActiveLink from "./mobile-active-link";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="">
          <Menu className="text-2xl" size={35} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full container">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-medium">
            {" "}
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src={organizationInfo.logo}
                width={48}
                height={400}
                className="object-cover h-10 w-10"
                alt="Sihabul khair foundation"
              />
              <h1 className="text-2xl font-medium">{organizationInfo.name}</h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ul className="mt-20">
          {navigations.map((nav) => (
            <li key={nav.title}>
              <SheetClose asChild>
                <ActiveLink
                  href={nav.path}
                  className="flex justify-between py-4 border-b border-card-and-Heiglighter text-weak"
                  activeClassName="text-primary font-semibold"
                >
                  <>
                    {nav.title} <ArrowUpRight />
                  </>
                </ActiveLink>
              </SheetClose>
            </li>
          ))}
        </ul>
        {/* Signin */}
        <div className="mt-12">
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className="bg-brand px-4 py-3 text-base text-white rounded-full"
            >
              ড্যাশবোর্ড
            </Link>
          </SheetClose>
        </div>
        <SheetFooter>
          <h3 className="text-2xl font-medium">{organizationInfo.name}</h3>
          <p className="text-weak text-base">({organizationInfo.badge})</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
