import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { onServerHandleSignin } from "@/actions/signin";
import SigninForm from "@/components/auth/sigin-form";

const SigninPage = () => {
  const onSubmitSignin = async (email: string, password: string) => {
    "use server";
    try {
      await onServerHandleSignin(email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-md">
        <Card className="shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="space-y-1">
            <div className="text-center">
              <div className="mx-auto flex justify-center items-center mb-4 h-12 w-12 rounded-full bg-indigo-100 p-2">
                <UserCircle />
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
            <SigninForm onSubmitSignin={onSubmitSignin} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;
