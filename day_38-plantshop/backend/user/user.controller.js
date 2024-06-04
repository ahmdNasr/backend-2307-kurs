import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { createVerificationCode } from "../utils/createVerificationCode.js";

export const registerUser = async (req, res) => {
  try {
    const { vorname, nachname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User with this email exists! " });
      return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationCode = createVerificationCode();

    const result = await User.create({
      vorname,
      nachname,
      email,
      password: passwordHash,
      verificationCode,
    });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
