import { Router } from "express";
import { postOrder } from "./order.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const orderRouter = Router()
  .post("/", checkAuth(), postOrder )