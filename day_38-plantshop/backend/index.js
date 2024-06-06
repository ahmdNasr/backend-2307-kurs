import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./user/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/users", userRouter);

await mongoose.connect(process.env.MONGODB_URI, { dbName: "plantshop" });
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
