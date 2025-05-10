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

export {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  addMonthlyPayment,
};
