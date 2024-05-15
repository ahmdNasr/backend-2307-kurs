import { Quiz } from "../models/Quiz.js";

export async function addQuiz(quizInfo) {
  return Quiz.create(quizInfo);
}
