import { database_connection } from "@/database/database-connection";
import { invoiceModel } from "@/models/invoice-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/replace-arr-obj";

const getInvoices = async () => {
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

const getTotalAmount = (invoices) => {
  const totalAmounts = invoices.reduce((acc, curr) => {
    Object.keys(curr).forEach((month) => {
      if (
        month !== "invoice" &&
        month !== "memberName" &&
        month !== "post" &&
        month !== "totalShare"
      ) {
        acc[month] = (acc[month] || 0) + curr[month];
      }
    });
    return acc;
  }, {});

  const total =
    totalAmounts.July +
    totalAmounts.August +
    totalAmounts.September +
    totalAmounts.October +
    totalAmounts.November +
    totalAmounts.December +
    totalAmounts.January +
    totalAmounts.February +
    totalAmounts.March +
    totalAmounts.April +
    totalAmounts.May +
    totalAmounts.June;

  return total;
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
