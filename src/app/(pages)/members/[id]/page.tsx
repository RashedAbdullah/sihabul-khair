import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  memberService,
  paymentService,
  yearlyPaymentService,
} from "@/services";
import { formatDateToBangla } from "@/utils/format-date";
import { formatPrice } from "@/utils/formate-price";
import { IPayment } from "../../../../../@types/payment";
import { getEnToBn } from "@/utils/en-to-bn";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const MemberDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const { data: member } = await memberService.getMemberById(id);
  const { data: user } = await paymentService.getPaymentsByMemberId(id, "", "");
  const { data: yearlyPayments } =
    await yearlyPaymentService.getYealyPaymentsByMemberId(id);

  const paymentHistory = user?.payments;
  const totalPayments = paymentHistory.reduce(
    (sum: number, payment: IPayment) => sum + (payment.payment || 0),
    0
  );

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        {/* Member Profile Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={member.avatar}
                  className="object-cover"
                  height={100}
                  width={100}
                />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="lg:text-3xl text-xl font-bold text-gray-800">
                  {member.name}
                </CardTitle>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="text-sm">
                    {member.position}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 pt-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                ব্যক্তিগত তথ্য
              </h3>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">পিতা:</span> {member.father}
                </p>
                <p>
                  <span className="font-medium">NID:</span> {member.nationalId}
                </p>
                <p>
                  <span className="font-medium">যোগাযোগ:</span> {member.mobile}
                </p>
                <p>
                  <span className="font-medium">ইমেইল:</span> {member.email}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                সমিতি সম্পর্কিত তথ্য
              </h3>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">যোগদানের তারিখ:</span>{" "}
                  {formatDateToBangla(member.entryDate)}
                </p>
                <p>
                  <span className="font-medium">শেয়ার সংখ্যা:</span>{" "}
                  {getEnToBn(member.shares)}
                </p>
                <p>
                  <span className="font-medium">এককালীন জমা:</span>{" "}
                  {formatPrice(yearlyPayments[0]?.amount || 0)}
                </p>
                <p>
                  <span className="font-medium">মোট জমা:</span>{" "}
                  {formatPrice(
                    (yearlyPayments[0]?.amount ?? 0) + totalPayments
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              মাসিক পেমেন্ট হিস্টোরি
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">মাস</TableHead>
                    <TableHead>পরিমাণ (৳)</TableHead>
                    <TableHead className="text-right">পরিশোধের তারিখ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment: IPayment, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {formatDateToBangla(payment.month, true)}
                      </TableCell>
                      <TableCell>{formatPrice(payment?.payment)}</TableCell>
                      <TableCell className="text-right">
                        {formatDateToBangla(payment.paymentDate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-weak text-center">
                কোনো পেমেন্ট পাওয়া যায় নি।
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
