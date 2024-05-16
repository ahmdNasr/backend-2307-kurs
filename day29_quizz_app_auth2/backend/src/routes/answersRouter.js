import express from "express";
import { AnswerController } from "../controllers/answerController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const answersRouter = express
  .Router()
  .post("/", doJwtAuth, AnswerController.postAddAnswerCtrl);
