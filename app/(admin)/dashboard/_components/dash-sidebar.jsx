import PageTitle from "@/components/page-title";
import Link from "next/link";
import React from "react";
import {
  FaChartLine,
  FaEdit,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserPlus,
} from "react-icons/fa";

const DashSidebar = () => {
  return (
    <aside className="w-full lg:w-1/4 bg-gradient-to-b from-gray-100 to-gray-200 p-6 lg:p-8 shadow-lg rounded-lg">
      <nav className="space-y-8">
        <PageTitle>এডমিন প্যানেল</PageTitle>
        <ul className="space-y-6">
          <li>
            <Link
              href="/add-new-member"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaUserPlus className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                নতুন সদস্য যোগ করুন
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/update-member"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaUserEdit className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                সদস্য আপডেট করুন
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/new-cost"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaMoneyBillWave className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                নতুন খরচ যোগ করুন
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/update-cost"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaMoneyCheckAlt className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                খরচ আপডেট করুন
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/new-invest"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaChartLine className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                নতুন ইনভেস্ট যোগ করুন
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/update-investment"
              className="group flex items-center space-x-3 p-3 bg-gray-700 rounded-md shadow hover:bg-slate-900 transition-all duration-300"
            >
              <FaEdit className="text-xl text-slate-400 group-hover:text-slate-300" />
              <span className="text-lg text-gray-100 group-hover:text-slate-300">
                ইনভেস্ট আপডেট করুন
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashSidebar;
