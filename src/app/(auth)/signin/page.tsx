import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSigninUser } from "@/actions/signin";

const SigninPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-md">
        <Card className="shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="space-y-1">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-indigo-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-brand"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                লগইন করুন
              </CardTitle>
              <CardDescription className="text-gray-600">
                ইমেইল ও পাসওয়ার্ড লিখুন
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={handleSigninUser}>
              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    ইমেইল
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="member@gmail.com"
                    required
                    className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    পাসওয়ার্ড
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full bg-brand py-2 text-base font-medium text-white hover:brand2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  লগইন
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;
