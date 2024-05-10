import { User } from "../models/User.js";
import { generateRandomSalt, hash } from "../utils/hash.js";
import { userToView } from "./helpers.js";

// userInfo = { firstname, lastname, email, password }
export async function registerUser({ firstname, lastname, email, password }) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail)
    throw new Error("User with this email already has an account");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`); // Klartext password mit salt hashen

  const user = await User.create({
    firstname,
    lastname,
    email,
    passwordHash, // hash(password + passwordSalt)
    passwordSalt, // salt
  });

  // await sendVerificationEmail(user);

  return userToView(user);
}
