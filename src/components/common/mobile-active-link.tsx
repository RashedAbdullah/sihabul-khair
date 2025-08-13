"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ActiveLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  ({ href, className, activeClassName, ...props }, ref) => {
    const pathname = usePathname();
    const isActive =
      pathname === href ||
      (typeof href === "string" && pathname.startsWith(href as string));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

ActiveLink.displayName = "ActiveLink";
export default ActiveLink;
