import { Quiz } from "../models/Quiz.js";

export async function loadQuizzes() {
  return Quiz.find();
}
