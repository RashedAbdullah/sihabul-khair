"use client";

import Link from "next/link";
import {
  UserPlus,
  UserCog,
  FilePlus,
  FilePen,
  Coins,
  LineChart,
  Wallet,
} from "lucide-react";

const navLinks = [
  {
    title: "মাসিক হিসাব",
    links: [
      { href: "/add-monthly", label: "মাসিক হিসাব যুক্ত করুন", icon: FilePlus },
      {
        href: "/update-monthly",
        label: "মাসিক হিসাব আপডেট করুন",
        icon: FilePen,
      },
    ],
  },
  {
    title: "সদস্য তথ্য",
    links: [
      { href: "/add-new-member", label: "নতুন সদস্য যোগ করুন", icon: UserPlus },
      { href: "/update-member", label: "সদস্য আপডেট করুন", icon: UserCog },
    ],
  },
  {
    title: "খরচ",
    links: [
      { href: "/new-cost", label: "নতুন খরচ যোগ করুন", icon: Wallet },
      { href: "/update-cost", label: "খরচ আপডেট করুন", icon: FilePen },
    ],
  },
  {
    title: "ইনভেস্টমেন্ট",
    links: [
      { href: "/new-invest", label: "নতুন ইনভেস্ট যোগ করুন", icon: Coins },
      {
        href: "/update-investment",
        label: "ইনভেস্ট আপডেট করুন",
        icon: LineChart,
      },
    ],
  },
];

const DashSidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={
          "w-full lg:w-1/4 p-4 lg:p-6 transition-all duration-300 bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg lg:block"
        }
      >
        <nav className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-[#3A4C50] mb-4">
            এডমিন প্যানেল
          </h2>

          {navLinks.map((group, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-[#3A4C50] mb-2">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map(({ href, label, icon: Icon }, idx) => (
                  <li key={idx}>
                    <Link
                      href={href}
                      className="group flex items-center gap-3 p-3 bg-[#3A4C50] text-white rounded-lg hover:bg-slate-800 transition duration-300"
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                      <span className="text-base group-hover:text-white">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DashSidebar;
