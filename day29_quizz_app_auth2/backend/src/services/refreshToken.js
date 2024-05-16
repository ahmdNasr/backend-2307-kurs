import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";

// refreshToken -> refreshToken() -> newAccessToken
export async function refreshToken(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  if (!user.isEmailVerified) throw new Error("User is not verified");
  //   if (user.isBlocked) throw new Error("User blocked");

  const newAccessToken = createToken(user, "access");
  return { newAccessToken };
}
