import { getSIngleExpense, updateSingleExpense } from "@/actions/expense";
import { auth } from "@/auth";
import PageTitle from "@/components/page-title";
import UpdateCostForm from "@/components/update-cost-form";
import { redirect } from "next/navigation";

const UpdateCostPage = async ({ params: { slug } }) => {
  const singleCost = await getSIngleExpense(slug);
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const handleUpdateCost = async (data) => {
    "use server";
    await updateSingleExpense(slug, data);
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <PageTitle>খরচ আপডেট করুন</PageTitle>
      <UpdateCostForm singleCost={singleCost} updateCost={handleUpdateCost} />
    </div>
  );
};

export default UpdateCostPage;
