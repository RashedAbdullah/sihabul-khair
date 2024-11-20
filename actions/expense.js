import { cookies } from "next/headers";
const { database_connection } = require("@/database/database-connection");
const { expenseModel } = require("@/models/cost-model");
const { replaceMongoIdInArray } = require("@/utils/replace-arr-obj");

const getExpenses = async () => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const expenses = await expenseModel.find({}).lean();

    return replaceMongoIdInArray(expenses);
  } catch (err) {
    console.log(err.message);
  }
};

const getSIngleExpense = async (id) => {
  try {
    await database_connection();

    const singleExpense = await expenseModel.findById(id);

    return singleExpense;
  } catch (err) {
    console.log(err.message);
  }
};

const updateSingleExpense = async (id, data) => {
  try {
    await database_connection();

    const singleExpense = await expenseModel.findByIdAndUpdate(id, data);

    return singleExpense;
  } catch (err) {
    console.log(err.message);
  }
};

const createExpense = async (newExpense) => {
  try {
    await database_connection();

    const expense = await expenseModel.create(newExpense);
    return expense;
  } catch (err) {
    console.log(err.message);
  }
};

const getTotalCost = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export {
  getExpenses,
  createExpense,
  getTotalCost,
  getSIngleExpense,
  updateSingleExpense,
};
