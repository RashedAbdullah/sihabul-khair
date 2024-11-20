"use client";

import { doCredentialSignin } from "@/actions/signin";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SigninPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialSignin(formData);
      if (response.error) {
        console.log(response.error);
        setError(response.error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <PageTitle>সাইন-ইন</PageTitle>
      <div className="text-center text-sm text-red-500">
        <p>( শুধুমাত্র এডমিনের জন্য )</p>
      </div>
      {error && (
        <div className="text-center text-sm text-red-500">
          <p>{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center mt-10"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">ইমেইল: </Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="ইমেইল . . ."
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">পাসওয়ার্ড: </Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="পাসওয়ার্ড . . ."
          />
        </div>
        <div>
          <Button>সাইন-ইন করুন</Button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
