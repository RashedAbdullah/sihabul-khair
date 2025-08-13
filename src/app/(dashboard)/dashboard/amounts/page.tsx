import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateMonthlyAMount from "@/components/dashboard/members/update-monthly-amount";
import CreateMonthlyAmount from "@/components/dashboard/members/create-monthly-amount";
import { memberService } from "@/services";

const MonthlyPage = async () => {
  try {
    const { data: members } = await memberService.getMembers();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">
              মাসিক টাকা ব্যবস্থাপনা
            </h2>
            <p className="text-gray-600">
              সদস্যদের মাসিক টাকা সংক্রান্ত কার্যক্রম পরিচালনা করুন
            </p>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <Tabs defaultValue="tab-1">
              <TabsList className="grid grid-cols-2 w-full bg-gray-50 p-1">
                <TabsTrigger
                  value="tab-1"
                  className="py-3 px-4 rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 data-[state=active]:font-medium"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>মাসিক টাকা যুক্ত করুন</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="py-3 px-4 rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 data-[state=active]:font-medium"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span>মাসিক টাকা আপডেট করুন</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <div className="p-6">
                <TabsContent value="tab-1" className="mt-0">
                  <div className="bg-blue-50/30 p-5 rounded-lg border border-blue-100">
                    {members.length > 0 && (
                      <CreateMonthlyAmount
                        members={JSON.parse(JSON.stringify(members))}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tab-2" className="mt-0">
                  <div className="bg-indigo-50/30 p-5 rounded-lg border border-indigo-100">
                    <UpdateMonthlyAMount
                      members={JSON.parse(JSON.stringify(members))}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch amounts:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Error loading amounts.
      </div>
    );
  }
};

export default MonthlyPage;
