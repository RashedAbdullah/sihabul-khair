"use server";

import { redirect } from "next/navigation";
import { createNewInvoice } from "./getInvices";

export const handleNewMember = async (event) => {
  const invoices = {
    invoice: Number(event.get("invoice")),
    memberName: event.get("memberName"),
    post: event.get("post"),
    totalShare: Number(event.get("totalShare")),
    July: Number(event.get("July")),
    August: Number(event.get("August")),
    September: Number(event.get("September")),
    October: Number(event.get("October")),
    November: Number(event.get("November")),
    December: Number(event.get("December")),
    January: Number(event.get("January")),
    February: Number(event.get("February")),
    March: Number(event.get("March")),
    April: Number(event.get("April")),
    May: Number(event.get("May")),
    June: Number(event.get("June")),
  };
  createNewInvoice(invoices);
  redirect("/members");
};
