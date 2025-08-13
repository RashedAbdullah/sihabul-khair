import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "../../../../@types/user";

const Members = async ({ members }: { members: IUser[] }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>সকল সদস্যের তালিকা</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-b-lg">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  নাম
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  মোবাইল
                </TableHead>
                <TableHead className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  পদবী
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  শেয়ার
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {members.map((member, index: number) => (
                <TableRow
                  key={member._id.toString()}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-blue-100">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {index + 1}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {member.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <a href={`tel:${member.mobile}`}>{member.mobile}</a>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell px-6 py-4 text-gray-600">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {member.position}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {member.shares}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Members;
