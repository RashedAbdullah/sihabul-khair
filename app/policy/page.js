import PageTitle from "@/components/page-title";
import { policies } from "@/data/policy";
import { getEngToBnNumber } from "@/utils/getEngToBn";

const PolicyPage = () => {
  return (
    <div className="container text-lg">
      <PageTitle>নীতিমালা</PageTitle>
      <div>
        {policies.map((policy, ind) => (
          <div key={ind} className="grid grid-cols-12">
            <div className="col-span-1 font-Tiro_Bangla">
              {getEngToBnNumber(ind + 1)}
            </div>
            <div className="col-span-11">
              <p
                className={`${
                  policy.includes(
                    "যথা সময়ে (প্রতি মাসের ১৫ তারিখের ভেতর) নির্ধারিত টাকা দিতে না পারলে দায়িত্বশীলদেরকে অবগত করবে।"
                  ) && "font-semibold font-Tiro_Bangla text-red-700"
                } ${
                  policy.includes(
                    "পরপর দুই মাস নির্ধারিত টাকা না দিলে সে সমিতির আইন লঙ্ঘনকারী হিসেবে বিবেচিত হবে।"
                  ) && "font-semibold font-Tiro_Bangla text-red-700"
                }`}
              >
                {policy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyPage;
