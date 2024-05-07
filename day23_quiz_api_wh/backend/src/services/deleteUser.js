import { Answer } from "../models/Answer.js";
import { User } from "../models/User.js";

export async function deleteUser(userId) {
  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) throw new Error("User with id " + userId + " not found");
  await Answer.deleteMany({ userId }); // delete all answers of a user
  return deleteUser;
}
