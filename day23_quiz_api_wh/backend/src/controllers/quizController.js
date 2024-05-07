import { QuizService } from "../services/index.js";

async function postAddQuizCtrl(req, res) {
  try {
    const quizInfo = req.body;
    const result = await QuizService.addQuiz(quizInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not add user" });
  }
}
async function getQuizDetailCtrl(req, res) {
  try {
    const quizId = req.params.quizId;
    const result = await QuizService.getQuizDetail(quizId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not add user" });
  }
}

async function getQuizStatsForUserCtrl(req, res) {
  try {
    const quizId = req.params.quizId;
    const userId = req.params.userId;
    const result = await QuizService.getQuizStatsForUser(quizId, userId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not add user" });
  }
}

export const QuizController = {
  postAddQuizCtrl,
  getQuizDetailCtrl,
  getQuizStatsForUserCtrl,
};
