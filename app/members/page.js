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
            <TableHead>মোট জমা</TableHead>
            <TableHead>মেম্বারশীপ ডেট</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, ind) => (
            <TableRow key={ind}>
              <TableCell>{getEngToBnNumber(ind + 1)}</TableCell>
              <TableCell>{invoice.memberName}</TableCell>
              <TableCell>{invoice.post}</TableCell>
              <TableCell>{getEngToBnNumber(invoice.totalShare)}</TableCell>
              <TableCell>
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
              <TableCell>{invoice.membershipDate} ইং</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersPage;
