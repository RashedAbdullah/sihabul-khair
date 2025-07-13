import { handleNewMember } from "@/actions/handleNewMember";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  CalendarDays,
  BadgePlus,
  Landmark,
  Layers,
} from "lucide-react";

const AddNewMember = async () => {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#3A4C50]">
          নতুন সদস্য যুক্ত করুন
        </h2>

        <form action={handleNewMember} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-gray-700"
            >
              <User className="w-4 h-4" />
              নাম
            </Label>
            <Input id="name" name="name" placeholder="নাম . . ." required />
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
            <Input id="post" name="post" defaultValue="সদস্য" required />
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
              defaultValue={1}
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
              সদস্য ‍যুক্ত করুন
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewMember;
