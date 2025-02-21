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
    <div className="container mx-auto mt-10">
      <PageTitle>মোট অর্থ</PageTitle>
      <div className="text-center mb-4">
        <p className="text-gray-600">(জুলাই ২০২৪ থেকে জুন ২০২৫ পর্যন্ত)</p>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <Table className="w-full border border-gray-200 bg-white rounded-lg">
          <TableCaption className="text-gray-700 font-medium text-lg">
            সদস্যবৃন্দের টাকা পরিশোধের হিসেব ও সর্বমোট এমাউন্ট
          </TableCaption>

          <TableHeader className="bg-gray-100">
            <TableRow className="text-center">
              <TableHead className="p-3">ক্র.</TableHead>
              <TableHead className="p-3">সদস্য</TableHead>
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
              ].map((month, index) => (
                <TableHead key={index} className="p-3 text-center">
                  {month}
                </TableHead>
              ))}
              <TableHead className="p-3">মোট</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice, ind) => (
              <TableRow
                key={ind}
                className="hover:bg-gray-50 transition duration-300"
              >
                <TableCell className="text-center font-medium">
                  {getEngToBnNumber(ind + 1)}
                </TableCell>
                <TableCell className="text-center">
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
                ].map((month, index) => (
                  <TableCell
                    key={index}
                    className={`text-center font-semibold ${
                      invoice[month] <= 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {formatPrice(invoice[month])}
                  </TableCell>
                ))}

                <TableCell className="text-center font-bold text-blue-600">
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
            <TableRow className="bg-gray-100 font-semibold">
              <TableCell colSpan={2} className="text-center text-lg">
                সর্বমোট
              </TableCell>
              <TableCell
                colSpan={12}
                className="text-right text-lg font-bold text-blue-600 pr-5"
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
