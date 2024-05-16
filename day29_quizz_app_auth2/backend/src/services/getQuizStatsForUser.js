import { Answer } from "../models/Answer.js";
import { Question } from "../models/Question.js";
import { Quiz } from "../models/Quiz.js";
import { User } from "../models/User.js";

export async function getQuizStatsForUser(quizId, userId) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const questionsOfQuiz = await Question.find({ quizId });
  const questionIds = questionsOfQuiz.map((question) => question._id);

  const answers = await Answer.find({
    questionId: { $in: questionIds },
    userId,
  });

  const correctAnswers = answers.filter((answer) => answer.isCorrect); // answer.isCorrect === true

  return {
    quiz,
    numberOfQuestions: questionsOfQuiz.length,
    numberOfAnsweredQuestions: answers.length,
    numberCorrectAnswers: correctAnswers.length,
  };
}
