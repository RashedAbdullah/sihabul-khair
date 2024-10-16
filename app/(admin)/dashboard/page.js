import React from "react";
import Link from "next/link";
import {
  FaUserPlus,
  FaUserEdit,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaChartLine,
  FaEdit,
} from "react-icons/fa";
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
