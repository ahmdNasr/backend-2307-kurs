import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { createVerificationCode } from "../utils/createVerificationCode.js";
import { emailTransport } from "../utils/emailTransport.js";
import { createToken } from "../utils/createToken.js";
import { userToView } from "./user.helpers.js";
import { uploadImage } from "../utils/uploadImage.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body)
    const image = req.file
    console.log({file: req.file})

    const uploadResult = image ? await uploadImage(image.buffer) : undefined
    console.dir({uploadResult})

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User with this email exists! " });
      return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const verificationCode = createVerificationCode();

    const result = await User.create({
      firstname,
      lastname,
      email,
      password: passwordHash,
      verificationCode,
      imageUrl: uploadResult.secure_url
    });

    emailTransport.sendMail({
      from: '"Plantshop Plant Happyness Team" <team@plantshop.supercode.de>', // sender address
      to: email, // list of receivers
      subject: "Welcome to Plantshop 🌿", // Subject line
      text: `Your verification code is: ${verificationCode}`, // plain text body
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist. Please register" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password incorrect. Please try again" });
    }

    const token = createToken(user);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    });
    res.json({ user: userToView(user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const _id = req.authenticatedUser._id;
    const user = await User.findById(_id);
    res.json({ user: userToView(user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (_req, res)=>{
  res.clearCookie("token")
  res.json({message: "Logout successful!"})
}