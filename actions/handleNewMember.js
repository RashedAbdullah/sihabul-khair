"use server";

import { redirect } from "next/navigation";
import { createNewInvoice } from "./getInvices";

export const handleNewMember = async (event) => {
  try {
    // Extract and validate data
    const name = event.get("name")?.toString().trim();
    const father = event.get("father")?.toString().trim();
    const contact = event.get("contact")?.toString().trim();
    const post = event.get("post")?.toString().trim();
    const totalShare = Number(event.get("totalShare"));
    const membershipDate = event.get("membershipDate")?.toString();

    if (
      !name ||
      !father ||
      !contact ||
      !post ||
      isNaN(totalShare) ||
      !membershipDate
    ) {
      throw new Error("সমস্ত তথ্য সঠিকভাবে পূরণ করুন।");
    }

    const member = {
      name,
      father,
      contact,
      post,
      totalShare,
      membershipDate,
    };

    await createNewInvoice(member);

    redirect("/members");
  } catch (error) {
    console.error("❌ সদস্য যোগ করতে সমস্যা হয়েছে:", error);
    // Optional: display error to user or throw for server
    throw new Error("সদস্য যোগ করা সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।");
  }
};
