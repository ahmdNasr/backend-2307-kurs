import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";
import { hash } from "../utils/hash.js";
import { userToView } from "./helpers.js";

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid login");

  const passwordHash = hash(`${password}${user.passwordSalt}`);
  const correctPassword = passwordHash === user.passwordHash;
  if (!correctPassword) throw new Error("Invalid login");

  const accessToken = createToken(user, "access"); // header.payload.signature
  //   const refreshToken = createToken(user, "refresh"); // header.payload.signature

  return {
    user: userToView(user),
    tokens: { accessToken },
  };
}
