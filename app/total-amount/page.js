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
    <div className="container">
      <PageTitle>মোট অর্থ</PageTitle>
      <div className="text-center">
        <p>(জুলাই ২০২৪ থেকে জুন ২০২৫ পর্যন্ত)</p>
      </div>
      <Table>
        <TableCaption>
          সদস্যবৃন্দের টাকা পরিশোধের হিসেব ও সর্বমোট এমাউন্ট
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ক্র.</TableHead>
            <TableHead className="">সদস্য</TableHead>
            <TableHead>জুলাই</TableHead>
            <TableHead>আগস্ট</TableHead>
            <TableHead>সেপ্টেম্বর</TableHead>
            <TableHead>অক্টোবর</TableHead>
            <TableHead>নভেম্বর</TableHead>
            <TableHead>ডিসেম্বর</TableHead>
            <TableHead>জানুয়ারি</TableHead>
            <TableHead>ফেব্রুয়ারি</TableHead>
            <TableHead>মার্চ</TableHead>
            <TableHead>এপ্রিল</TableHead>
            <TableHead>মে</TableHead>
            <TableHead>জুন</TableHead>
            <TableHead className="w-24">মোট</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, ind) => (
            <TableRow key={ind}>
              <TableCell className="font-Tiro_Bangla">
                {getEngToBnNumber(ind + 1)}
              </TableCell>
              <TableCell>{invoice.memberName}</TableCell>
              <TableCell
                className={`${
                  invoice.July <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.July)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.August <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.August)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.September <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.September)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.October <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.October)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.November <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.November)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.December <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.December)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.January <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.January)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.February <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.February)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.March <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.March)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.April <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.April)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.May <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.May)}
              </TableCell>
              <TableCell
                className={`${
                  invoice.June <= 0 && "text-red-500"
                } font-Tiro_Bangla`}
              >
                {formatPrice(invoice.June)}
              </TableCell>
              <TableCell className="font-Tiro_Bangla">
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
          <TableRow>
            <TableCell colSpan={2}>সর্বমোট</TableCell>
            <TableCell colSpan={14} className="text-right font-Tiro_Bangla">
              {formatPrice(getTotalAmount(invoices))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TotalAmountPage;
