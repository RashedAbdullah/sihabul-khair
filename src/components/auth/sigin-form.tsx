"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { IconReload } from "@tabler/icons-react";

// Define validation schema with Zod
const formSchema = z.object({
  email: z.string().email("ইমেইল সঠিক নয়"),
  password: z.string().min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষর হতে হবে"),
});

type FormValues = z.infer<typeof formSchema>;

const SigninForm = ({
  onSubmitSignin,
}: {
  onSubmitSignin: (email: string, password: string) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSigninUser = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await onSubmitSignin(values.email, values.password);
      toast("লগইন সফল হয়েছে");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "লগইন ব্যর্থ হয়েছে";
      toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSigninUser)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">ইমেইল</FormLabel>
              <FormControl>
                <Input
                  placeholder="member@gmail.com"
                  {...field}
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">পাসওয়ার্ড</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full bg-brand py-2 text-base font-medium text-white hover:brand2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <IconReload className="mr-2 h-4 w-4 animate-spin" />
              প্রক্রিয়াধীন...
            </>
          ) : (
            "লগইন"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
