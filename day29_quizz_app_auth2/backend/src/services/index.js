import { addAnswer } from "./addAnswer.js";
import { addQuestion } from "./addQuestion.js";
import { addQuiz } from "./addQuiz.js";
import { deleteUser } from "./deleteUser.js";
import { getQuizDetail } from "./getQuizDetail.js";
import { getQuizStatsForUser } from "./getQuizStatsForUser.js";
import { loadQuizzes } from "./loadQuizzes.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { registerUser } from "./registerUser.js";
import { verifyUserEmail } from "./verifyUserEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUserEmail,
  refreshToken,
  deleteUser,
};

export const QuizService = {
  addQuiz,
  getQuizDetail,
  loadQuizzes,
  getQuizStatsForUser,
};

export const QuestionService = {
  addQuestion,
};

export const AnswerService = {
  addAnswer,
};
