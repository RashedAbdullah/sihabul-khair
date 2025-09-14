import { paymentService } from "@/services";
import { yearlyPaymentService } from "@/services/api/yearly-payment-api";
import MonthlyPaymentsForMember from "./_components/montlyPaymentsForMember";

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

// Function to format date as "YYYY-MM"
const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};

// Get current date
const currentDate = new Date();

// Calculate dates for API call
const endDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  1
); // 1st day of next month
const startDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 2,
  1
); // 1st day of 2 months ago

// Format dates for API
const endDateParam = formatDateForAPI(endDate);
const startDateParam = formatDateForAPI(startDate);

// Create array of last 3 months (current + previous 2)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const MonthlyAmountPage = async () => {
  const monthNames = [
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), -1, 1)
    ),
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 2)
    ),
    getBengaliMonthName(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 3)
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
    <MonthlyPaymentsForMember
      monthPaidCount={monthPaidCount}
      yearlyPaid={yearlyPaid}
      monthNames={monthNames}
      membersWithYearly={membersWithYearly}
    />
  );
};

export default MonthlyAmountPage;
