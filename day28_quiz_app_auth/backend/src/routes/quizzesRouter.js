import express from "express";
import { QuizController } from "../controllers/quizController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const quizzesRouter = express
  .Router()
  .get("/", doJwtAuth, QuizController.getLoadQuizzes)
  .get("/:quizId", doJwtAuth, QuizController.getQuizDetailCtrl)
  .get(
    "/:quizId/stats/:userId",
    doJwtAuth,
    QuizController.getQuizStatsForUserCtrl
  )
  .post("/", doJwtAuth, QuizController.postAddQuizCtrl);
