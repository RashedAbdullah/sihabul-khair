import { database_connection } from "@/database/database-connection";
import { investmentModel } from "@/models/investment-model";
import { replaceMongoIdInArray } from "@/utils/replace-arr-obj";
import { cookies } from "next/headers";

const getInvestments = async () => {
    const cookie = cookies().get("theme");
  try {
    await database_connection();
    const investments = await investmentModel.find({}).lean();
    return replaceMongoIdInArray(investments);
  } catch (err) {
    console.log(err.message);
  }
};

const createNewInvest = async (newInvest) => {
  try {
    await database_connection();
    const newInvestmentData = await investmentModel.create(newInvest);
    return newInvestmentData;
  } catch (err) {
    console.log(err.message);
  }
};

const getTotalInvestment = (investments) => {
  return investments.reduce((acc, investment) => acc + investment.amount, 0);
};
const getTotalPaidAmount = (investments) => {
  return investments.reduce((acc, investment) => acc + investment.paidAmount, 0);
};
const getTotalProfitAmount = (investments) => {
  return investments.reduce(
    (acc, investment) => acc + investment.profitAmount,
    0
  );
};

const getTotalDeuAmount = (investments) => {
  return investments.reduce(
    (acc, investment) => (acc += investment.amount - investment.paidAmount),
    0
  );
};

export {
  getInvestments,
  createNewInvest,
  getTotalInvestment,
  getTotalPaidAmount,
  getTotalProfitAmount,
  getTotalDeuAmount,
};
