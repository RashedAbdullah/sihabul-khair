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
              <p>{policy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyPage;
