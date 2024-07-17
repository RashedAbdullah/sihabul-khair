"use server";

import { signIn } from "@/auth";

export const doCredentialSignin = async (formData) => {
   try {
     const response = await signIn("credentials", {
       email: formData.get("email"),
       password: formData.get("password"),
       redirect: false,
     });
     return response;
   } catch (err) {
     throw err;
   }
};
