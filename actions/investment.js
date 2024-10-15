import { database_connection } from "@/database/database-connection";
import { investmentModel } from "@/models/investment-model";
import { replaceMongoIdInArray } from "@/utils/replace-arr-obj";

const getInvestments = async () => {
  try {
    await database_connection();
    const investments = await investmentModel.find({}).lean();
    return replaceMongoIdInArray(investments);
  } catch (err) {
    console.log(err.message);
  }
};

export { getInvestments };
