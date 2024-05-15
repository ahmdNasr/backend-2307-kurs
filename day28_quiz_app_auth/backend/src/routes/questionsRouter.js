import express from "express";
import { QuestionController } from "../controllers/questionController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const questionsRouter = express
  .Router()
  .post("/", doJwtAuth, QuestionController.postAddQuestionCtrl);
