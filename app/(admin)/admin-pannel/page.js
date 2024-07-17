import { getInvoices } from "@/actions/getInvices";
import PageTitle from "@/components/page-title";
import { getEngToBnNumber } from "@/utils/getEngToBn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { doSignOut } from "@/actions/signout";
import { redirect } from "next/navigation";

const AdminPannelPage = async () => {
  const invoices = await getInvoices();
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="container">
      <PageTitle>সদস্য-তথ্য আপডেট করুন!</PageTitle>
      <div className="text-center border-b py-3 border-green-500">
        <p>
          এডমিন নাম: <span className="text-green-500">{session.user.name}</span>
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">ক্র.</TableHead>
            <TableHead className="">সদস্য</TableHead>
            <TableHead>পদ</TableHead>
            <TableHead>তথ্য আপডেট করুন</TableHead>
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
                <Link href={`/admin-pannel/${invoice.id}`}>
                  <Button>তথ্য আপডেট করুন</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex  justify-center gap-3 items-center align-middle mt-10">
        <div className="">
          <Link href="/add-new-member">
            <Button>নতুন সদস্য যুক্ত করুন !</Button>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-3">
          <p> অথবা ‍</p>
          <form action={doSignOut}>
            <Button variant="destructive">লগআউট করুন !</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPannelPage;
