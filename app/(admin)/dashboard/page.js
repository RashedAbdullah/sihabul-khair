import React from "react";
import DashSidebar from "./_components/dash-sidebar";

const DashboardPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <DashSidebar />
    </div>
  );
};

export default DashboardPage;
