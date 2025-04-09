import PageTitle from "@/components/page-title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import { getInvoices, getTotalAmount } from "@/actions/getInvices";

const TotalAmountPage = async () => {
  const invoices = await getInvoices();

  return (
    <div className="container mx-auto px-4 py-10">
      <PageTitle>মোট অর্থ</PageTitle>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1 mb-5">
        (জুলাই ২০২৪ থেকে জুন ২০২৫ পর্যন্ত)
      </p>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <Table className="min-w-full text-sm text-center text-gray-800 dark:text-gray-200">
          <TableHeader className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
            <TableRow>
              <TableHead className="py-3">ক্র.</TableHead>
              <TableHead className="py-3">সদস্য</TableHead>
              {[
                "জুলাই",
                "আগস্ট",
                "সেপ্টেম্বর",
                "অক্টোবর",
                "নভেম্বর",
                "ডিসেম্বর",
                "জানুয়ারি",
                "ফেব্রুয়ারি",
                "মার্চ",
                "এপ্রিল",
                "মে",
                "জুন",
              ].map((month, i) => (
                <TableHead key={i} className="py-3 text-nowrap">
                  {month}
                </TableHead>
              ))}
              <TableHead
                className="py-3 sticky right-0 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 border-l"
                style={{
                  position: "sticky",
                  right: 0,
                  zIndex: 1,
                  boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                মোট
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice, ind) => (
              <TableRow
                key={ind}
                className={`transition duration-300 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                  ind % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <TableCell className="py-2 font-bold text-blue-700 dark:text-blue-400">
                  {getEngToBnNumber(ind + 1)}
                </TableCell>
                <TableCell className="py-2 font-medium">
                  {invoice.memberName}
                </TableCell>
                {[
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ].map((month, i) => (
                  <TableCell
                    key={i}
                    className={`py-2 font-semibold ${
                      invoice[month] <= 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {formatPrice(invoice[month])}
                  </TableCell>
                ))}
                <TableCell
                  className="py-2 font-bold text-blue-700 dark:text-blue-400 sticky right-0 bg-white dark:bg-gray-900 border-r"
                  style={{
                    position: "sticky",
                    right: 0,
                    zIndex: 1,
                    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {formatPrice(
                    invoice.July +
                      invoice.August +
                      invoice.September +
                      invoice.October +
                      invoice.November +
                      invoice.December +
                      invoice.January +
                      invoice.February +
                      invoice.March +
                      invoice.April +
                      invoice.May +
                      invoice.June
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="bg-gradient-to-r from-sky-100 to-sky-200 dark:from-gray-700 dark:to-gray-800">
              <TableCell colSpan={2} className="py-4 text-lg font-semibold">
                সর্বমোট
              </TableCell>
              <TableCell
                colSpan={12}
                className="text-right pr-6 text-lg font-bold text-blue-800 dark:text-blue-300"
              >
                {formatPrice(getTotalAmount(invoices))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default TotalAmountPage;
