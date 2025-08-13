import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Members from "@/components/dashboard/members/members";
import UpdateMemberForm from "@/components/dashboard/members/update-member-form";
import NewMemberForm from "@/components/dashboard/members/new-member-form";
import { memberService } from "@/services";

const MembersPage = async () => {
  try {
    const { data: members } = await memberService.getMembers();
    return (
      <div className="p-4 md:p-6">
        <header className="text-2xl font-bold mb-6">সদস্যবৃন্দ</header>

        <Tabs defaultValue="all-members" className="w-full">
          <TabsList className="">
            <TabsTrigger
              value="all-members"
              className="py-2 text-sm sm:text-base"
            >
              সকল সদস্য
            </TabsTrigger>
            <TabsTrigger
              value="update-member"
              className="py-2 text-sm sm:text-base"
            >
              সদস্য আপডেট করুন
            </TabsTrigger>
            <TabsTrigger
              value="add-member"
              className="py-2 text-sm sm:text-base"
            >
              নতুন সদস্য যুক্ত করুন
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-members" className="mt-4">
            <Members members={members} />
          </TabsContent>

          {/* Update Member Tab - Responsive Form */}
          <TabsContent value="update-member" className="mt-4">
            <UpdateMemberForm members={JSON.parse(JSON.stringify(members))} />
          </TabsContent>

          {/* Add Member Tab - Responsive Form */}
          <TabsContent value="add-member" className="mt-4">
            <NewMemberForm />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return <div>Error loading members.</div>;
  }
};

export default MembersPage;
