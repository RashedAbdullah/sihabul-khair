import HeroSection from "@/components/common/hero-section";
import React from "react";
import mosque from "@/assets/mosque.jpg";
import CommonHeader from "@/components/common/common-header";
import { expensesService } from "@/services";
import { IExpense } from "../../../../@types/expense";
import { formatPrice } from "@/utils/formate-price";
import { getEnToBn } from "@/utils/en-to-bn";

const ExpensesPage = async () => {
  try {
    const { data: expenses } = await expensesService.getExpenses();

    return (
      <div>
        <HeroSection
          title="সংগঠনের খরচ"
          badge="সংগঠনের সকল প্রকার ব্যয়-বরাদ্দের হিসাব"
          description=""
          image={mosque}
        />
        <CommonHeader title="যাবতীয় খরচ" description="" />
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
                    <div className="col-span-5 font-semibold">বিবরণ</div>
                    <div className="col-span-5 font-semibold">তারিখ</div>
                    <div className="col-span-1 font-semibold">পরিমাণ</div>
                  </div>
                </li>
                {expenses.map((exprense: IExpense, index: number) => (
                  <li key={index}>
                    <div
                      className={`p-6 grid grid-cols-12 border-b border-card-and-Heiglighter hover:bg-card-and-Heiglighter transition-colors duration-300`}
                    >
                      <div className="col-span-1">{getEnToBn(index + 1)}</div>
                      <div className="col-span-5">{exprense.cost}</div>
                      <div className="col-span-5">
                        {new Date(exprense.date).toLocaleDateString("bn", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="col-span-1">
                        {formatPrice(exprense.amount)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    return <div>Error loading expenses.</div>;
  }
};

export default ExpensesPage;
