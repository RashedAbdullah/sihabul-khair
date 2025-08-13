import { memberService } from "@/services";
import Link from "next/link";
import React from "react";
import { IUser } from "../../../@types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEnToBn } from "@/utils/en-to-bn";

const Members = async () => {
  try {
    const { data: members } = await memberService.getMembers();

    return (
      <div className="container my-16">
        <div className="lg:grid grid-cols-12">
          <div className="col-span-4" />
          <div className="col-span-8">
            <ul>
              <li>
                <div
                  className={`p-6 grid grid-cols-12 border-b border-card-and-Heiglighter`}
                >
                  <div className="col-span-1 font-semibold">ক্র.</div>
                  <div className="col-span-5 font-semibold">নাম</div>
                  <div className="col-span-5 font-semibold">পিতা</div>
                  <div className="col-span-1 font-semibold">শেয়ার</div>
                </div>
              </li>
              {(members as IUser[]).map((member, index) => (
                <li key={member._id.toString()}>
                  <Link
                    href={`/members/${member._id.toString()}`}
                    className={`p-6 grid grid-cols-12 items-center border-b border-card-and-Heiglighter hover:bg-card-and-Heiglighter transition-colors duration-300`}
                  >
                    <div className="col-span-1">
                      <Avatar>
                        <AvatarImage
                          src={member.avatar}
                          className="object-cover"
                        />
                        <AvatarFallback>{getEnToBn(index + 1)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="col-span-5">{member.name}</div>
                    <div className="col-span-5">{member.father}</div>
                    <div className="col-span-1">{getEnToBn(member.shares)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return <div>Error loading members.</div>;
  }
};

export default Members;
