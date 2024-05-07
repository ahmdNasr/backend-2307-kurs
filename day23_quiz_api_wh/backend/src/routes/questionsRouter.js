import express from "express";
import { QuestionController } from "../controllers/questionController.js";

export const questionsRouter = express
  .Router()
  .post("/", QuestionController.postAddQuestionCtrl);
