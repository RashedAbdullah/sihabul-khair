import { database_connection } from "@/database/database-connection";
import { memberModel } from "@/models/member-model";
import { cookies } from "next/headers";

const getMembers = async () => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const members = await memberModel.find({});

    return members;
  } catch (err) {
    console.log(err.message);
  }
};

const getMember = async (id) => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const member = await memberModel.findById(id);

    return member;
  } catch (err) {
    console.log(err.message);
  }
};

const createMember = async (member) => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const members = await memberModel.create(member);

    return members;
  } catch (err) {
    console.log(err.message);
  }
};

const updateMember = async (id, member) => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const members = await memberModel.findByIdAndUpdate(id, member);

    return members;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteMember = async (id) => {
  const cookie = cookies().get("theme");
  try {
    await database_connection();

    const members = await memberModel.findByIdAndDelete(id);

    return members;
  } catch (err) {
    console.log(err.message);
  }
};

const addMonthlyPayment = async (id, newPayment) => {
  try {
    await database_connection();

    // Check if payment for the same month and year already exists
    const member = await memberModel.findOne({
      _id: id,
      amounts: {
        $elemMatch: {
          month: newPayment.month,
          year: newPayment.year,
        },
      },
    });

    if (member) {
      throw new Error("এই মাসের টাকা অলরেডি জমা আছে।");
    }

    const updatedMember = await memberModel.findByIdAndUpdate(
      id,
      {
        $push: {
          amounts: newPayment,
        },
      },
      { new: true }
    );

    return updatedMember;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const upsertMonthlyPayment = async (id, payment) => {
  try {
    await database_connection();

    // First try to update an existing payment for the same month/year
    const result = await memberModel.updateOne(
      {
        _id: id,
        "amounts.month": payment.month,
        "amounts.year": payment.year,
      },
      {
        $set: {
          "amounts.$.amount": payment.amount,
          "amounts.$.payment_date": payment.payment_date,
        },
      }
    );

    // If no existing payment was found for that month/year, push a new one
    if (result.matchedCount === 0) {
      await memberModel.findByIdAndUpdate(id, {
        $push: {
          amounts: payment,
        },
      });
    }

    // Return the updated member
    return await memberModel.findById(id);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  addMonthlyPayment,
  upsertMonthlyPayment,
};
