import { addAnswer } from "./addAnswer.js";
import { addQuestion } from "./addQuestion.js";
import { addQuiz } from "./addQuiz.js";
import { deleteUser } from "./deleteUser.js";
import { getQuizDetail } from "./getQuizDetail.js";
import { getQuizStatsForUser } from "./getQuizStatsForUser.js";
import { registerUser } from "./registerUser.js";

export const UserService = {
  registerUser,
  deleteUser,
};

export const QuizService = {
  addQuiz,
  getQuizDetail,
  getQuizStatsForUser,
};

export const QuestionService = {
  addQuestion,
};

export const AnswerService = {
  addAnswer,
};
