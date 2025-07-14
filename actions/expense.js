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

    // Check if an expense with the same amount and cost already exists
    const existingExpense = await expenseModel.findOne({
      amount: newExpense.amount,
      cost: newExpense.cost,
      date: newExpense.date,
    });

    if (existingExpense) {
      throw new Error(
        "Expense with the same amount, cost and date already exists."
      );
    }

    const expense = await expenseModel.create(newExpense);
    return expense;
  } catch (err) {
    console.log(err.message);
    throw err;
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
