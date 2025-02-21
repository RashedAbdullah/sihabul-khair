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
    <div className="container mx-auto px-4 py-6">
      <PageTitle>সদস্যবৃন্দের তালিকা</PageTitle>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mt-6">
        <Table className="w-full border-collapse">
          <TableCaption className="text-lg font-semibold py-3">
            সদস্যবৃন্দের তালিকা
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-center">ক্র.</TableHead>
              <TableHead className="text-center">সদস্য</TableHead>
              <TableHead className="text-center">পদ</TableHead>
              <TableHead className="text-center">শেয়ার</TableHead>
              <TableHead className="text-center">মোট জমা</TableHead>
              <TableHead className="text-center">মেম্বারশীপ ডেট</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, ind) => (
              <TableRow
                key={ind}
                className={ind % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : ""}
              >
                <TableCell className="text-center font-medium">
                  {getEngToBnNumber(ind + 1)}
                </TableCell>
                <TableCell className="text-center">
                  {invoice.memberName}
                </TableCell>
                <TableCell className="text-center">{invoice.post}</TableCell>
                <TableCell className="text-center font-semibold">
                  {getEngToBnNumber(invoice.totalShare)}
                </TableCell>
                <TableCell className="text-center font-semibold text-green-600 dark:text-green-400">
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
                <TableCell className="text-center">
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
