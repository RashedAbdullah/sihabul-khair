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
import { paymentService } from "@/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { yearlyPaymentService } from "@/services/api/yearly-payment-api";
import { getEnToBn } from "@/utils/en-to-bn";
import { organizationInfo } from "@/data/organization-info";

// Define member type based on API response
type ApiMember = {
  user: {
    _id: string;
    name: string;
    avatar: string;
    shares: number;
  };
  payments: Array<{
    month: string;
    status:
      | "Doesn't pay"
      | { _id: string; payment: number; paymentDate: string };
  }>;
};

type ProcessedMember = {
  id: string;
  name: string;
  avatar: string;
  paid: Partial<Record<MonthName, boolean>>;
  paidYearly: boolean; // Assuming yearly payment is separate
};

// Function to get Bengali month names
const getBengaliMonthName = (date: Date): string => {
  const months = [
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return months[date.getMonth()];
};

// Get current date in UTC
const currentDate = new Date();
const currentUTCDate = new Date(
  Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate()
  )
);

// Calculate dates for API call using UTC
const endDate = new Date(
  Date.UTC(currentUTCDate.getUTCFullYear(), currentUTCDate.getUTCMonth() + 1, 1)
); // 1st day of next month in UTC

const startDate = new Date(
  Date.UTC(currentUTCDate.getUTCFullYear(), currentUTCDate.getUTCMonth() - 2, 1)
); // 1st day of 2 months ago in UTC

// Format dates for API (YYYY-MM format)
const formatDateForAPI = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};

const endDateParam = formatDateForAPI(endDate);
const startDateParam = formatDateForAPI(startDate);

type MonthName = (typeof monthNames)[number];

const MonthlyAmountPage = async () => {
  const monthNames = [
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    ),
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    ),
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
    ),
  ] as const;

  type MonthName = (typeof monthNames)[number];

  const { data: apiResponse } = await paymentService.getPaymentsForFewMonths(
    startDateParam,
    endDateParam,
    ""
  );

  // Process the API data to match our component's expected format
  const members: ProcessedMember[] = apiResponse.map((member: ApiMember) => {
    const paidMonths: Partial<Record<MonthName, boolean>> = {};

    member.payments.forEach((payment, index) => {
      const monthName = monthNames[index];
      paidMonths[monthName] = payment.status !== "Doesn't pay";
    });

    return {
      id: member.user._id,
      name: member.user.name,
      avatar: member.user.avatar,
      paid: paidMonths,
    };
  });

  // For each member, fetch yearly payment and set paidYearly
  const membersWithYearly = await Promise.all(
    members.map(async (member) => {
      const { data: yearlyPayment } =
        await yearlyPaymentService.getYealyPaymentById(member.id);
      return {
        ...member,
        paidYearly: !!yearlyPayment,
      };
    })
  );

  const yearlyPaid = membersWithYearly.filter((m) => m.paidYearly).length;

  const monthPaidCount = monthNames.reduce<Record<MonthName, number>>(
    (acc, month) => {
      acc[month] = members.filter((m) => m.paid[month]).length;
      return acc;
    },
    {
      মে: 0,
      জুন: 0,
      জুলাই: 0,
    }
  );

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

// (Keep all the component and icon definitions the same as in your original code)
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
export default MonthlyAmountPage;
