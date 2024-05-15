import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctChoices: [{ type: String, required: true }],
    quizId: { type: mongoose.Types.ObjectId, ref: "Quiz", required: true },
  },
  { collection: "questions", timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
