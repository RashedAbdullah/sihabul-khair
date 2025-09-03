"use client";

import React from "react";
import HeroSection from "@/components/common/hero-section";
import CommonHeader from "@/components/common/common-header";
import mosque from "@/assets/mosque.jpg";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEnToBn } from "@/utils/en-to-bn";
import { organizationInfo } from "@/data/organization-info";

const MonthlyPaymentsForMember = ({
  membersWithYearly,
  monthNames,
  monthPaidCount,
  yearlyPaid,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection
        badge="লাস্ট ৩ মাসের হিসাব"
        title="মাসিক পেমেন্ট"
        description={organizationInfo.description}
        image={mosque}
      />

      <div className="container py-8">
        <CommonHeader
          title="লাস্ট ৩ মাস"
          description="সকল সদস্য ও যাঁদের মাধ্যমে আমাদের পথচলা, তাঁদের মাসিক ও বাৎসরিক অবদান নিচে দেখানো হলো।"
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="মোট সদস্য"
            value={membersWithYearly.length}
            icon={<UsersIcon className="w-6 h-6" />}
          />

          {monthNames.map((month) => (
            <StatCard
              key={month}
              title={`${month} পেমেন্ট`}
              value={monthPaidCount[month]}
              icon={<CalendarCheckIcon className="w-6 h-6" />}
              variant="success"
            />
          ))}

          <StatCard
            title="বাৎসরিক পেমেন্ট"
            value={yearlyPaid}
            icon={<BanknoteIcon className="w-6 h-6" />}
            variant="primary"
          />
        </div>

        {/* Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              শেষ ৩ মাসের পেমেন্ট স্ট্যাটাস
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="w-[50px]">ক্রম</TableHead>
                    <TableHead>নাম</TableHead>
                    {monthNames.map((month) => (
                      <TableHead key={month} className="text-center">
                        {month}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">বাৎসরিক</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {membersWithYearly.map((member, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            className="object-cover"
                            src={member.avatar}
                          />
                          <AvatarFallback>
                            {getEnToBn(index + 1)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          href={`/members/${member.id}`}
                          className="hover:text-primary hover:underline"
                        >
                          {member.name}
                        </Link>
                      </TableCell>

                      {monthNames.map((month) => (
                        <TableCell key={month} className="text-center">
                          <PaymentBadge paid={!!member.paid[month]} />
                        </TableCell>
                      ))}

                      <TableCell className="text-center">
                        <YearlyBadge paid={member.paidYearly} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PaymentBadge = ({ paid }: { paid: boolean }) => {
  return paid ? (
    <Badge variant="secondary" className="px-3 py-1 bg-green-600 text-white">
      <CheckIcon className="w-3 h-3 mr-1" />
      পরিশোধিত
    </Badge>
  ) : (
    <Badge variant="destructive" className="px-3 py-1">
      <ClockIcon className="w-3 h-3 mr-1" />
      বাকি
    </Badge>
  );
};

const YearlyBadge = ({ paid }: { paid: boolean }) => {
  return paid ? (
    <Badge variant="secondary" className="px-3 py-1 bg-green-500 text-white">
      <CheckCircleIcon className="w-3 h-3 mr-1" />
      পরিশোধিত
    </Badge>
  ) : (
    <Badge variant="destructive" className="px-3 py-1">
      <AlertCircleIcon className="w-3 h-3 mr-1" />
      বাকি
    </Badge>
  );
};

// Stat Card component
const StatCard = ({
  title,
  value,
  icon,
  variant = "default",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "primary";
}) => {
  const variantClasses = {
    default: "bg-white border border-gray-200 text-gray-800",
    success: "bg-green-50 border border-green-100 text-green-800",
    primary: "bg-blue-50 border border-blue-100 text-blue-800",
  };

  return (
    <Card className={variantClasses[variant]}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-white">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{getEnToBn(value)}</div>
      </CardContent>
    </Card>
  );
};

// Icons (you can replace with actual icons from your icon library)
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CalendarCheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <path d="M9 16l2 2 4-4"></path>
  </svg>
);

const BanknoteIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M6 12h.01M18 12h.01"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="M22 4L12 14.01l-3-3"></path>
  </svg>
);

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export default MonthlyPaymentsForMember;
