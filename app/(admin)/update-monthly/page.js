import { getInvoices } from "@/actions/getInvices";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Pencil } from "lucide-react";

const AddMonthly = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  const invoices = await getInvoices();
  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl bg-white shadow-md p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-green-500 pb-4">
          <h2 className="text-2xl font-bold text-[#3A4C50] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            মাসিক হিসাব আপডেট করুন
          </h2>
          <p className="text-sm text-gray-700">
            এডমিন:{" "}
            <span className="font-semibold text-green-600">
              {session.user.name}
            </span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <Table>
            <TableHeader className="bg-[#3A4C50] text-white">
              <TableRow>
                <TableHead className="text-white">ক্র.</TableHead>
                <TableHead className="text-white">সদস্য</TableHead>
                <TableHead className="text-white">পদ</TableHead>
                <TableHead className="text-white">তথ্য আপডেট</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow
                  key={invoice.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <TableCell>{getEngToBnNumber(index + 1)}</TableCell>
                  <TableCell>{invoice.memberName}</TableCell>
                  <TableCell>{invoice.post}</TableCell>
                  <TableCell>
                    <Link href={`/add-monthly/${invoice._id}`}>
                      <Button
                        variant="outline"
                        className="text-sm gap-2 flex items-center"
                      >
                        <Pencil className="w-4 h-4" />
                        আপডেট
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default AddMonthly;
