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
            <TableHead>মেম্বারশীপ ডেট</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, ind) => (
            <TableRow key={ind}>
              <TableCell className="font-Tiro_Bangla">
                {getEngToBnNumber(ind + 1)}
              </TableCell>
              <TableCell>{invoice.memberName}</TableCell>
              <TableCell>{invoice.post}</TableCell>
              <TableCell className="font-Tiro_Bangla">
                {getEngToBnNumber(invoice.totalShare)}
              </TableCell>
              <TableCell>{invoice.membershipDate} ইং</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersPage;
