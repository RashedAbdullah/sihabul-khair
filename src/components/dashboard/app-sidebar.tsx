"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { AdminProfile } from "./nav-user";
import { dashboardNavigations } from "@/data/dashboard-navigations";
import Link from "next/link";
import { organizationInfo } from "@/data/organization-info";
import Image from "next/image";

export function DashboardSidebar({
  currentUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentUser?: {
    name: string;
    email: string;
    avatar: string;
  } | null;
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <Image
                  height={25}
                  width={25}
                  src={organizationInfo.logo}
                  alt={organizationInfo.name}
                />
                <span className="text-base font-semibold">
                  {organizationInfo.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dashboardNavigations} />
      </SidebarContent>
      <SidebarFooter>
        <AdminProfile
          user={{
            name: currentUser?.name ?? "",
            email: currentUser?.email ?? "",
            avatar: currentUser?.avatar ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
