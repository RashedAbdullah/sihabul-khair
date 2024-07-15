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
import { invoices } from "@/data/invoices";
import { formatPrice } from "@/lib/foramt-amount";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const MembersPage = () => {
  return (
    <div className="container">
      <PageTitle>সদস্যবৃন্দের তালিকা</PageTitle>

      <Table>
        <TableCaption>সদস্যবৃন্দের তালিকা</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ক্র.</TableHead>
            <TableHead className="">সদস্য</TableHead>
            <TableHead>পদ</TableHead>
            <TableHead>শেয়ার</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>{invoice.memberName}</TableCell>
              <TableCell>{invoice.post}</TableCell>
              <TableCell>{getEngToBnNumber(invoice.totalShare)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersPage;
