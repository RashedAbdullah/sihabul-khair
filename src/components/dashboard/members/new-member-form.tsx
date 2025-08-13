"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Zod schema based on your mongoose model
const memberSchema = z.object({
  name: z.string().min(3, "নাম অবশ্যই ৩ অক্ষরের বেশি হতে হবে"),
  father: z.string().optional(),
  nationalId: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(6, "পাসওয়ার্ড অবশ্যই ৬ অক্ষরের বেশি হতে হবে"),
  position: z.string().min(2, "পদবী অবশ্যই ২ অক্ষরের বেশি হতে হবে"),
  entryDate: z.string().min(1, "যোগদানের তারিখ দিন"),
  shares: z.number().min(1, "শেয়ার সংখ্যা ১ এর বেশি হতে হবে"),
  avatar: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        file.length === 0 ||
        (file.length === 1 &&
          file[0]?.type.startsWith("image/") &&
          file[0]?.size <= 5000000),
      "ছবির ফরম্যাট বা সাইজ সঠিক নয়"
    ),
  role: z.enum(["USER", "MEMBER", "ADMIN"]),
});

type MemberFormValues = z.infer<typeof memberSchema>;

const NewMemberForm = () => {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      father: "",
      nationalId: "",
      mobile: "",
      email: "",
      password: "",
      position: "সদস্য",
      entryDate: new Date().toISOString().split("T")[0],
      shares: 1,
      role: "MEMBER",
    },
  });

  const onSubmit = async (data: MemberFormValues) => {
    try {
      // console.log("Form data:", data);
      // Handle form submission
      const formData = new FormData();

      formData.append("name", data.name);
      if (data.father !== undefined) {
        formData.append("father", data.father);
      }
      if (data.nationalId !== undefined) {
        formData.append("nationalId", data.nationalId);
      }
      if (data.mobile !== undefined) {
        formData.append("mobile", data.mobile);
      }
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("position", data.position);
      formData.append("entryDate", data.entryDate);
      formData.append("shares", data.shares.toString());
      formData.append("role", data.role);
      if (data.avatar && data.avatar.length > 0) {
        formData.append("avatar", data.avatar[0]);
      } else {
        formData.append("avatar", "");
      }

      const res = await fetch("/api/members", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create member");
      }

      form.reset();

      // await memberService.createMember(formData);
      // Show success message
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>নতুন সদস্য যুক্ত করুন</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>নাম *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="নাম" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Father's Name */}
              <FormField
                control={form.control}
                name="father"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পিতার নাম *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="পিতার নাম" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* National ID */}
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>জাতীয় আইডি</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="জাতীয় আইডি" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>মোবাইল</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="মোবাইল" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ইমেইল *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="ইমেইল" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পাসওয়ার্ড *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="পাসওয়ার্ড"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Position */}
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পদবী *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="পদবী" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Entry Date */}
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>যোগদানের তারিখ *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Shares */}
              <FormField
                control={form.control}
                name="shares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>শেয়ার সংখ্যা *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        placeholder="শেয়ার সংখ্যা"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ভূমিকা *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="ভূমিকা নির্বাচন করুন" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">ব্যবহারকারী</SelectItem>
                        <SelectItem value="MEMBER">সদস্য</SelectItem>
                        <SelectItem value="ADMIN">অ্যাডমিন</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Avatar */}
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>প্রোফাইল ছবি</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                        {form.watch("avatar")?.[0] && (
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={URL.createObjectURL(form.watch("avatar")[0])}
                            />
                            <AvatarFallback>ছবি</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg"
              >
                সদস্য যোগ করুন
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewMemberForm;
