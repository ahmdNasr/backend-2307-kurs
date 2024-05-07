import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export function connectToDatabase() {
  const dbUrl = process.env.MONGO_URL;
  return mongoose.connect(dbUrl, { dbName: "quizzio" });
}
