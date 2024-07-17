"use server";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const doSignOut = async () => {
  await signOut();
  redirect("/");
};
