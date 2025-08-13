"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-semibold",
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200 hover:text-primary text-weak",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}
