import { User } from "../models/User.js";

export async function registerUser(userInfo) {
  const user = await User.create(userInfo);
  return user;
}
