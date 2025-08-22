import { memberService } from "@/services";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEnToBn } from "@/utils/en-to-bn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Eye, Plus, Filter, Download } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const Members = async () => {
  try {
    const { data: members } = await memberService.getMembers();
    const currentUser = await getCurrentUser();

    return (
      <div className="container my-8">
        {/* Header Section */}
        <div className="flex flex-col mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            সদস্য ব্যবস্থাপনা
          </h1>
          <p className="text-muted-foreground">
            সহযোগিতামূলক সমিতির সকল সদস্যের তালিকা
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">সদস্য তালিকা</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    মোট {getEnToBn(members.length)} জন সদস্য
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="rounded-b-lg overflow-hidden px-5">
              <Table>
                <TableHeader className="bg-gradient-to-r from-muted/10 to-muted/5">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-4 font-bold text-primary">
                      নাম
                    </TableHead>
                    <TableHead className="hidden md:table-cell py-4 font-bold text-primary">
                      পিতা
                    </TableHead>
                    <TableHead className="text-right py-4 font-bold text-primary">
                      শেয়ার
                    </TableHead>
                    {currentUser.role === "ADMIN" && (
                      <TableHead className="table-cell text-right py-4 font-bold text-primary">
                        ইমেইল
                      </TableHead>
                    )}
                    {currentUser.role === "ADMIN" && (
                      <TableHead className="table-cell text-right py-4 font-bold text-primary">
                        পাসওয়ার্ড
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {members.map((member) => (
                    <TableRow
                      key={member._id.toString()}
                      className="group hover:bg-primary/5 transition-all duration-200 border-b"
                    >
                      <TableCell className="py-4">
                        <Link
                          href={`/members/${member._id.toString()}`}
                          className="flex items-center gap-3"
                        >
                          <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                            <AvatarImage
                              src={member.avatar}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-sm font-medium bg-primary/10">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground md:hidden">
                              {member.father}
                            </p>
                          </div>
                        </Link>
                      </TableCell>

                      <TableCell className="hidden md:table-cell py-4">
                        <p className="text-muted-foreground">{member.father}</p>
                      </TableCell>

                      <TableCell className="text-right py-4">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm"
                        >
                          {getEnToBn(member.shares)} শেয়ার
                        </Badge>
                      </TableCell>

                      {currentUser.role === "ADMIN" && (
                        <TableCell className="table-cell text-right py-4">
                          <p className="text-muted-foreground text-sm">
                            {member.email}
                          </p>
                        </TableCell>
                      )}

                      {currentUser.role === "ADMIN" && (
                        <TableCell className="table-cell text-right py-4">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {member.password}
                          </Badge>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return (
      <div className="container my-16">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-destructive/10">
            <CardTitle className="text-destructive flex items-center gap-2">
              <Users className="h-5 w-5" />
              ত্রুটি
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-destructive">
              সদস্য তালিকা লোড করতে সমস্যা হচ্ছে। অনুগ্রহপূর্বক পরে চেষ্টা করুন।
            </p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              আবার চেষ্টা করুন
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Members;
