import User from "../models/User.js";

export const createUser = async ({ email, username, password }) => {
  if (!email || !username || !password) {
    throw new Error("Please provide the all details");
  }

  const user = await User.create({
    email,
    username,
    password,
  });

  return user;
};
