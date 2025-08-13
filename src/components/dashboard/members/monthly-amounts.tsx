// "use client";

// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { format, parseISO } from "date-fns";
// import { IUser } from "../../../../@types/user";



// const MonthlyAmounts = ({ members }: { members: IUser[] }) => {
//   const [selectedMember, setSelectedMember] = useState<string>("");

//   const filteredPayments = selectedMember
//     ? members.filter((payment) => payment.mobile === selectedMember)
//     : members;
//   return (
//     <div className="space-y-4">
//       <Select
//         onValueChange={(value) => setSelectedMember(value)}
//         value={selectedMember}
//       >
//         <SelectTrigger className="w-[300px]">
//           <SelectValue placeholder="সদস্য নির্বাচন করুন" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="somthing">সকল সদস্য</SelectItem>
//           {members.map((member) => (
//             <SelectItem key={member._id.toString()} value={member._id.toString()}>
//               {member.name} ({member.position})
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <div className="border rounded-lg p-4">
//         <h3 className="font-semibold mb-4">পেমেন্ট ইতিহাস</h3>
//         {filteredPayments.length > 0 ? (
//           <div className="space-y-2">
//             {filteredPayments.map((payment) => {
//               const user = members.find((u) => u._id.toJSON() === payment.mobile);
//               return (
//                 <div
//                   key={payment._id.toString()}
//                   className="flex justify-between items-center border-b py-2"
//                 >
//                   <div className="w-1/3">
//                     <span className="font-medium">
//                       {user?.name || "Unknown"}
//                     </span>
//                   </div>
//                   <div className="w-1/3 text-center">
//                     <span>
//                       {format(parseISO(payment.month.toString()), "MMMM yyyy")}
//                     </span>
//                   </div>
//                   <div className="w-1/6 text-right">
//                     <span>{payment.amount} টাকা</span>
//                   </div>
//                   <div className="w-1/4 text-right">
//                     <span>
//                       {format(
//                         parseISO(payment.paymentDate.toString()),
//                         "dd MMM yyyy"
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p>কোন পেমেন্ট রেকর্ড পাওয়া যায়নি</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MonthlyAmounts;
