import { getSingleInvoice, updateNewInvoice } from "@/actions/getInvices";

import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

const SingleMemberDataUpdatePage = async ({ params: { member: id } }) => {
  const singleInvoice = await getSingleInvoice(id);
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  const updateMemberData = async (event) => {
    "use server";

    const invoices = {
      invoice: Number(event.get("invoice")),
      memberName: event.get("memberName"),
      post: event.get("post"),
      totalShare: Number(event.get("totalShare")),
      July: Number(event.get("July")),
      August: Number(event.get("August")),
      September: Number(event.get("September")),
      October: Number(event.get("October")),
      November: Number(event.get("November")),
      December: Number(event.get("December")),
      January: Number(event.get("January")),
      February: Number(event.get("February")),
      March: Number(event.get("March")),
      April: Number(event.get("April")),
      May: Number(event.get("May")),
      June: Number(event.get("June")),
    };

    updateNewInvoice(id, invoices);
    redirect("/total-amount");
  };
  return (
    <div className="container">
      <PageTitle>সদস্য-তথ্য সম্পাদনা করুন!</PageTitle>
      <form
        action={updateMemberData}
        className="flex flex-col justify-center items-center gap-5"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">সদস্য নং: </Label>
          <Input
            id="name"
            name="invoice"
            type="number"
            defaultValue={singleInvoice.invoice}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">নাম: </Label>
          <Input
            id="name"
            name="memberName"
            type="text"
            defaultValue={singleInvoice.memberName}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="post">পদ: </Label>
          <Input
            id="post"
            name="post"
            type="text"
            defaultValue={singleInvoice.post}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="share">শেয়ার: </Label>
          <Input
            id="share"
            name="totalShare"
            type="number"
            defaultValue={singleInvoice.totalShare}
          />
        </div>

        <div className="py-3 px-10 border-b-2">আর্থিক হিসাব</div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="July">জুলাই: </Label>
          <Input
            id="July"
            name="July"
            type="number"
            defaultValue={singleInvoice.July}
            className={`${singleInvoice.July <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="August">আগস্ট: </Label>
          <Input
            id="August"
            name="August"
            type="number"
            defaultValue={singleInvoice.August}
            className={`${singleInvoice.August <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="September">সেপ্টেম্বর: </Label>
          <Input
            id="September"
            name="September"
            type="number"
            defaultValue={singleInvoice.September}
            className={`${singleInvoice.September <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="October">অক্টোবর: </Label>
          <Input
            id="October"
            name="October"
            type="number"
            defaultValue={singleInvoice.October}
            className={`${singleInvoice.October <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="November">নভেম্বর: </Label>
          <Input
            id="November"
            name="November"
            type="number"
            defaultValue={singleInvoice.November}
            className={`${singleInvoice.November <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="December">ডিসেম্বর: </Label>
          <Input
            id="December"
            name="December"
            type="number"
            defaultValue={singleInvoice.December}
            className={`${singleInvoice.December <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="January">জানুয়ারি: </Label>
          <Input
            id="January"
            name="January"
            type="number"
            defaultValue={singleInvoice.January}
            className={`${singleInvoice.January <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="February">ফেব্রুয়ারি: </Label>
          <Input
            id="February"
            name="February"
            type="number"
            defaultValue={singleInvoice.February}
            className={`${singleInvoice.February <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="March">মার্চ: </Label>
          <Input
            id="March"
            name="March"
            type="number"
            defaultValue={singleInvoice.March}
            className={`${singleInvoice.March <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="April">এপ্রিল: </Label>
          <Input
            id="April"
            name="April"
            type="number"
            defaultValue={singleInvoice.April}
            className={`${singleInvoice.April <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="May">মে: </Label>
          <Input
            id="May"
            name="May"
            type="number"
            defaultValue={singleInvoice.May}
            className={`${singleInvoice.May <= 0 && "border-red-500"}`}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="June">জুন: </Label>
          <Input
            id="June"
            name="June"
            type="number"
            defaultValue={singleInvoice.June}
            className={`${singleInvoice.June <= 0 && "border-red-500"}`}
          />
        </div>
        <div>
          <Button>তথ্য সাবমিট করুন !</Button>
        </div>
      </form>
    </div>
  );
};

export default SingleMemberDataUpdatePage;
