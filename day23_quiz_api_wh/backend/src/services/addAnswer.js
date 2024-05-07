import { Answer } from "../models/Answer.js";
import { Question } from "../models/Question.js";
import { User } from "../models/User.js";

// answerInfo = { questionId, userId, chosen: [] }
export async function addAnswer(answerInfo) {
  const previousAnswer = await Answer.findOne({
    userId: answerInfo.userId,
    questionId: answerInfo.questionId,
  });
  if (previousAnswer) throw new Error("User can answer a question only once");

  const question = await Question.findById(answerInfo.questionId);
  if (!question) throw new Error("Question doesn't exist");

  const user = await User.findById(answerInfo.userId);
  if (!user) throw new Error("User doesn't exist");

  const correctAnswer =
    answerInfo.chosen.length === question.correctChoices.length &&
    answerInfo.chosen.every((choice) =>
      question.correctChoices.includes(choice)
    );

  const answer = await Answer.create({
    ...answerInfo,
    isCorrect: correctAnswer,
  });
  return answer;
}
