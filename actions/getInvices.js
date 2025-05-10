"use server";

import { database_connection } from "@/database/database-connection";
import { invoiceModel } from "@/models/invoice-model";
import { cookies } from "next/headers";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/replace-arr-obj";

const getInvoices = async () => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const invoices = await invoiceModel.find().lean();

    return replaceMongoIdInArray(invoices);
  } catch (err) {
    console.log(err.message);
  }
};

const getSingleInvoice = async (memberId) => {
  try {
    await database_connection();

    const invoice = await invoiceModel.findById(memberId).lean();

    return replaceMongoIdInObject(invoice);
  } catch (err) {
    console.log(err.message);
  }
};

const createNewInvoice = async (memberInfo) => {
  try {
    await database_connection();

    const invoice = await invoiceModel.create(memberInfo).lean();

    return invoice;
  } catch (err) {
    console.log(err.message);
  }
};

const updateNewInvoice = async (id, updatedInfo) => {
  try {
    await database_connection();

    const invoice = await invoiceModel
      .findByIdAndUpdate(id, updatedInfo)
      .lean();

    return replaceMongoIdInObject(invoice);
  } catch (err) {
    console.log(err.message);
  }
};

const getTotalAmount = (members) => {
  const totalAmounts = members.reduce(
    (total, member) => total + member.amounts.reduce((a, b) => a + b.amount, 0),
    0
  );

  return totalAmounts;
};

const getTotalShare = (invoices) => {
  const totalShares = invoices.reduce((accumulator, current) => {
    return accumulator + current.totalShare;
  }, 0);

  return totalShares;
};

export {
  getInvoices,
  getSingleInvoice,
  createNewInvoice,
  updateNewInvoice,
  getTotalAmount,
  getTotalShare,
};
