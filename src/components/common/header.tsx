import Image from "next/image";
import React from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { navigations } from "@/data/navigations";
import { organizationInfo } from "@/data/organization-info";
import ActiveLink from "./active-link";

const Header = () => {
  return (
    <header className="bg-card-and-Heiglighter">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={organizationInfo.logo}
              width={48}
              height={400}
              className="object-cover h-10 w-10"
              alt="Sihabul khair foundation"
            />
            <h1 className="text-2xl font-medium">{organizationInfo.name}</h1>
          </Link>

          {/* Navigations */}
          <ul className="hidden lg:flex justify-center items-center gap-4">
            {navigations.map((nav) => (
              <li key={nav.title} className="text-base">
                <ActiveLink href={nav.path}>{nav.title}</ActiveLink>
              </li>
            ))}
          </ul>

          {/* Signin */}
          <div className="hidden lg:inline">
            <Link
              href="/dashboard"
              className="bg-brand px-6 py-3 text-base text-white rounded-full"
            >
             ড্যাশবোর্ড
            </Link>
          </div>
          <div className="inline lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
