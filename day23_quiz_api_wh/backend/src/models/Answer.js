import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    chosen: [{ type: String, required: true }],
    isCorrect: { type: Boolean, required: true },
  },
  { collection: "answers", timestamps: true }
);

export const Answer = mongoose.model("Answer", answerSchema);
