import { getInvoices } from "@/actions/getInvices";
import PageTitle from "@/components/page-title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const MembersPage = async () => {
  const invoices = await getInvoices();

  return (
    <div className="container mx-auto px-4 py-10">
      <PageTitle>সদস্যবৃন্দের তালিকা</PageTitle>

      <div className="overflow-x-auto mt-8 border border-gray-200 dark:border-gray-700">
        <Table className="min-w-full text-sm text-center text-gray-800 dark:text-gray-200">
          <TableHeader className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
            <TableRow>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                ক্র.
              </TableHead>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                সদস্য
              </TableHead>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                পদ
              </TableHead>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                শেয়ার
              </TableHead>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                মোট জমা
              </TableHead>
              <TableHead className="text-center py-3 text-gray-700 dark:text-gray-300">
                মেম্বারশীপ ডেট
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice, ind) => (
              <TableRow
                key={ind}
                className={`transition duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-gray-700 ${
                  ind % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <TableCell className="py-3 font-bold text-blue-700 dark:text-blue-400">
                  {getEngToBnNumber(ind + 1)}
                </TableCell>
                <TableCell className="py-3 font-medium">
                  {invoice.memberName}
                </TableCell>
                <TableCell className="py-3">{invoice.post}</TableCell>
                <TableCell className="py-3 font-semibold text-indigo-600 dark:text-indigo-400">
                  {getEngToBnNumber(invoice.totalShare)}
                </TableCell>
                <TableCell className="py-3 font-semibold text-green-600 dark:text-green-400">
                  {getEngToBnNumber(
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
                <TableCell className="py-3">
                  {invoice.membershipDate} ইং
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersPage;
