import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { userRouter } from "./user/user.routes.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/users", userRouter);


const PORT = process.env.PORT || 9000;
await mongoose.connect(process.env.MONGODB_URI, { dbName: "plantshop" });


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
