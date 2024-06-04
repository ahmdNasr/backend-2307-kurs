import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./user/user.routes.js";

const app = express();

app.use(express.json())

app.use('/users', userRouter)

await mongoose.connect(process.env.MONGODB_URI, {dbName: 'plantshop'})
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))



