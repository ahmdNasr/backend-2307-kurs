import express from "express";
import { AnswerController } from "../controllers/answerController.js";

export const answersRouter = express
  .Router()
  .post("/", AnswerController.postAddAnswerCtrl);
