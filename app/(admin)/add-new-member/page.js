import { getInvoices } from "@/actions/getInvices";
import { handleNewMember } from "@/actions/handleNewMember";
import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

const AddNewMember = async () => {
  const invoices = await getInvoices();
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="container">
      <PageTitle>নতুন সদস্য যুক্ত করুন</PageTitle>
      <form
        action={handleNewMember}
        className="flex flex-col justify-center items-center gap-5"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="member_no">সদস্য নং: </Label>
          <Input
            id="member_no"
            type="number"
            name="invoice"
            placeholder="সদস্য নং . . ."
            defaultValue={invoices.length + 1}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">নাম: </Label>
          <Input
            id="name"
            name="memberName"
            type="text"
            placeholder="নাম . . ."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="post">পদ: </Label>
          <Input id="post" name="post" type="text" defaultValue={"সদস্য"} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="share">শেয়ার: </Label>
          <Input id="share" name="totalShare" type="number" defaultValue={0} />
        </div>

        <div className="py-3 px-10 border-b-2">আর্থিক হিসাব</div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="July">জুলাই: </Label>
          <Input id="July" name="July" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="August">আগস্ট: </Label>
          <Input id="August" name="August" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="September">সেপ্টেম্বর: </Label>
          <Input
            id="September"
            name="September"
            type="number"
            defaultValue={0}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="October">অক্টোবর: </Label>
          <Input id="October" name="October" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="November">নভেম্বর: </Label>
          <Input id="November" name="November" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="December">ডিসেম্বর: </Label>
          <Input id="December" name="December" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="January">জানুয়ারি: </Label>
          <Input id="January" name="January" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="February">ফেব্রুয়ারি: </Label>
          <Input id="February" name="February" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="March">মার্চ: </Label>
          <Input id="March" name="March" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="April">এপ্রিল: </Label>
          <Input id="April" name="April" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="May">মে: </Label>
          <Input id="May" name="May" type="number" defaultValue={0} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="June">জুন: </Label>
          <Input id="June" name="June" type="number" defaultValue={0} />
        </div>
        <div>
          <Button>নতুন সদস্য ‍যুক্ত করুন !</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMember;
