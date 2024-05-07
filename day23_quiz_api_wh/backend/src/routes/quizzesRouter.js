import express from "express";
import { QuizController } from "../controllers/quizController.js";

export const quizzesRouter = express
  .Router()
  .get("/:quizId", QuizController.getQuizDetailCtrl)
  .get("/:quizId/stats/:userId", QuizController.getQuizStatsForUserCtrl)
  .post("/", QuizController.postAddQuizCtrl);
