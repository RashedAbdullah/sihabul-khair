import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashBoardLayout = async ({ children }) => {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return <div>{children}</div>;
};

export default DashBoardLayout;
