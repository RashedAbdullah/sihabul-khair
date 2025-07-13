import { getSingleInvoice, updateNewInvoice } from "@/actions/getInvices";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BadgePlus,
  CalendarDays,
  Landmark,
  Layers,
  Phone,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";

const SingleMemberDataUpdatePage = async ({ params: { member: id } }) => {
  const singleMember = await getSingleInvoice(id);
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  const updateMemberData = async (event, id) => {
    "use server";
    try {
      // Prepare updated data
      const updatedData = {
        ...singleMember,
        name: event.get("name")?.toString().trim() || singleMember.name,
        father: event.get("father")?.toString().trim() || singleMember.father,
        contact:
          event.get("contact")?.toString().trim() || singleMember.contact,
        post: event.get("post")?.toString().trim() || singleMember.post,
        membershipDate:
          event.get("membershipDate")?.toString() ||
          singleMember.membershipDate,
        totalShare: Number(event.get("totalShare")) || singleMember.totalShare,
      };

      // Validate essential fields
      if (!updatedData.name || !updatedData.father || !updatedData.contact) {
        throw new Error("Name, father, and contact are required.");
      }

      await updateNewInvoice(id, updatedData);

      redirect("/total-amount");
    } catch (error) {
      console.error("Update failed:", error);
      throw new Error(
        "সদস্য তথ্য হালনাগাদ করা যায়নি। দয়া করে আবার চেষ্টা করুন।"
      );
    }
  };
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#3A4C50]">
          সদস্য-তথ্য আপডেট করুন!
        </h2>
        <form action={updateMemberData} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-gray-700"
            >
              <User className="w-4 h-4" />
              নাম
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="নাম . . ."
              defaultValue={singleMember.name}
              required
            />
          </div>

          {/* Father */}
          <div className="space-y-1">
            <Label
              htmlFor="father"
              className="flex items-center gap-2 text-gray-700"
            >
              <Landmark className="w-4 h-4" />
              পিতা
            </Label>
            <Input
              id="father"
              name="father"
              placeholder="পিতার নাম . . ."
              defaultValue={singleMember.father}
              required
            />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <Label
              htmlFor="contact"
              className="flex items-center gap-2 text-gray-700"
            >
              <Phone className="w-4 h-4" />
              মোবাইল
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              placeholder="মোবাইল নম্বর . . ."
              defaultValue={singleMember.contact}
              required
            />
          </div>

          {/* Membership Date */}
          <div className="space-y-1">
            <Label
              htmlFor="membershipDate"
              className="flex items-center gap-2 text-gray-700"
            >
              <CalendarDays className="w-4 h-4" />
              সদস্য হওয়ার তারিখ
            </Label>
            <Input
              id="membershipDate"
              name="membershipDate"
              type="date"
              defaultValue={singleMember.membershipDate}
              required
            />
          </div>

          {/* Post */}
          <div className="space-y-1">
            <Label
              htmlFor="post"
              className="flex items-center gap-2 text-gray-700"
            >
              <BadgePlus className="w-4 h-4" />
              পদ
            </Label>
            <Input
              id="post"
              name="post"
              defaultValue={singleMember.post}
              required
            />
          </div>

          {/* Share */}
          <div className="space-y-1">
            <Label
              htmlFor="share"
              className="flex items-center gap-2 text-gray-700"
            >
              <Layers className="w-4 h-4" />
              শেয়ার
            </Label>
            <Input
              id="share"
              name="totalShare"
              type="number"
              defaultValue={singleMember.totalShare}
              min={1}
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              className="w-full bg-[#3A4C50] hover:bg-[#2f3d40] text-white text-lg py-2 rounded-xl"
              type="submit"
            >
              তথ্য সাবমিট করুন
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SingleMemberDataUpdatePage;
