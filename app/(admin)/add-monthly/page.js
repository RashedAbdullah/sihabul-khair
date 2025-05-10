import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Pencil } from "lucide-react";
import months from "@/data/months.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { addMonthlyPayment, getMembers } from "@/actions/members";

const AddMonthly = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  const currentYear = new Date().getFullYear();

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  const currentMonth = months.find((month) => month.month === currentMonthName);

  const members = await getMembers();

  const handleMonthlyAmount = async (formData) => {
    "use server";

    const id = formData.get("id");
    const amount = Number(formData.get("amount"));
    const month = formData.get("month");
    const year = formData.get("year");
    const payment_date = formData.get("payment_date");

    try {
      const newPayment = {
        amount,
        month,
        year,
        payment_date,
      };
      await addMonthlyPayment(id, newPayment);
      console.log(newPayment, id);
    } catch (err) {
      console.error("Failed to save monthly amount:", err);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50/50 py-6 px-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <CardTitle className="text-2xl">মাসিক হিসাব যুক্ত করুন</CardTitle>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-sm py-1.5">
                এডমিন:{" "}
                <span className="font-semibold text-green-600 ml-1">
                  {session.user.name}
                </span>
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {members.map((invoice, index) => (
              <div
                key={invoice._id || index}
                className="p-4 bg-background rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-1 w-full md:w-auto">
                  <p className="text-lg font-semibold text-center leading-none">
                    {invoice.name}
                  </p>
                  <p className="text-sm text-center text-muted-foreground">
                    বিন {invoice.father}
                  </p>
                </div>

                <form
                  action={handleMonthlyAmount}
                  className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
                >
                  <input type="hidden" name="id" value={invoice._id} />

                  <div className="grid gap-1">
                    <Label htmlFor="month" className="text-xs">
                      মাস
                    </Label>
                    <Select name="month" defaultValue={currentMonth?.month}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="মাস নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.month} value={month.month}>
                            {month.month_bn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="year" className="text-xs">
                      বছর
                    </Label>
                    <Select name="year" defaultValue={currentYear}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="বছর" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2024, 2025, 2026].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="payment_date" className="text-xs">
                      পরিশোধের তারিখ
                    </Label>
                    <Input
                      id="payment_date"
                      name="payment_date"
                      type="date"
                      required
                      min={1500}
                      className="w-full"
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="amount" className="text-xs">
                      পরিমাণ
                    </Label>
                    <Input
                      name="amount"
                      type="number"
                      required
                      min={1500}
                      placeholder={
                        invoice.totalShare === 3
                          ? "4500"
                          : invoice.totalShare === 2
                          ? "3000"
                          : "1500"
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="self-end sm:self-center">
                    <Button
                      type="submit"
                      size="sm"
                      className="gap-2 mt-6 sm:mt-0"
                    >
                      <Pencil className="w-4 h-4" />
                      যুক্ত করুন
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddMonthly;
