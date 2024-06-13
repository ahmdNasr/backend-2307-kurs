import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { userRouter } from "./user/user.routes.js";
import { orderRouter } from "./order/order.routes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/orders", orderRouter);

const PORT = process.env.PORT || 9000;
await mongoose.connect(process.env.MONGODB_URI, { dbName: "plantshop" });

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
