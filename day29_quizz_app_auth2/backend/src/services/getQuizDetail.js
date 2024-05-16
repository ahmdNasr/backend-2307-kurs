import { Question } from "../models/Question.js";
import { Quiz } from "../models/Quiz.js";

export async function getQuizDetail(quizId) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz with this id not found");
  const questionsOfQuiz = await Question.find(
    { quizId },
    { correctChoices: 0 } // hide correct questions using find projection! thx thomas!!!
  );
  return { ...quiz.toObject(), questions: questionsOfQuiz };
}
