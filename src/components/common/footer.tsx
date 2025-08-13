import { navigations } from "@/data/navigations";
import { organizationInfo } from "@/data/organization-info";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const devloper = {
  name: "রাশেদ আব্দুল্লাহ",
  socials: [
    {
      title: "Website",
      path: "/policy",
    },
    {
      title: "facebook",
      path: "/members",
    },
    {
      title: "LinkedIn",
      path: "/payments",
    },
    {
      title: "Github",
      path: "/expenses",
    },
  ],
};

const payments = [
  "/payments/amazon-pay.svg",
  "/payments/google-pay.svg",
  "/payments/paypal.svg",
  "/payments/mastercard.svg",
];

const socials = [
  {
    url: "",
    icon: "/facebook.svg",
  },
  {
    url: "",
    icon: "/gmail.svg",
  },
  {
    url: "",
    icon: "/whatsapp.svg",
  },
];

const Footer = () => {
  return (
    <div className="container pt-5 lg:pt-16">
      <div className="lg:grid grid-cols-12">
        {/* introduction */}
        <div className="col-span-4">
          <div>
            <h2 className="text-base lg:text-3xl font-medium">
              {organizationInfo.name}
            </h2>
            <p className="text-justify text-weak mt-2 lg:text-base text-xs">
              {organizationInfo.description}
            </p>
          </div>
          <div className="mt-2">
            <Link href="/member-form" className="text-base underline">
              আমাদের সাথে ‍যুক্ত হোন
            </Link>
          </div>
        </div>
        <div className="col-span-5 mt-12 lg:mt-0" />
        {/* navigations */}
        <div className="flex justify-between col-span-3">
          <div>
            <h2 className="text-lg font-medium">নেভিগেশন লিংক</h2>
            <ul className="text-weak text-base pt-4">
              {navigations.map((nav) => (
                <li key={nav.title}>
                  <Link href={nav.path}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">ডেভেলপার</h2>
            <ul className="text-weak text-base pt-4">
              {devloper.socials.map((social) => (
                <li key={social.title}>
                  <a href={social.path}>{social.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-between mt-8 lg:mt-22">
        {/*  */}
        <div className="flex items-center gap-4">
          {payments.map((payment) => (
            <Image key={payment} width={36} height={24} src={payment} alt="" />
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          {socials.map((social) => (
            <a key={social.icon} href={social.url}>
              <Image
                src={social.icon}
                width={20}
                height={20}
                alt={social.icon}
              />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-3 py-3 border-t border-card-and-Heiglighter">
        <div className="flex lg:flex-row flex-col justify-between items-center text-xs gap-1 lg:text-base text-weak">
          <p>
            © {new Date().toLocaleDateString("bn-BD", { year: "numeric" })}{" "}
            {organizationInfo.name} | সর্বস্বত্ব সংরক্ষিত
          </p>
          <p>সংস্করণ ১.১.০ | সর্বশেষ আপডেট: আগস্ট, ২০২৫ ইং</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
