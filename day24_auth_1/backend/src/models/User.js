import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    bio: { type: String, default: "Hello I am using Todo.io!" },
    passwordHash: { type: String, required: true, trim: true }, // hash of password (not clear-text!)
    passwordSalt: { type: String, required: true, trim: true },
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
