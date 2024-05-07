import { QuestionService } from "../services/index.js";

async function postAddQuestionCtrl(req, res) {
  try {
    const questionInfo = req.body;
    const result = await QuestionService.addQuestion(questionInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add question" });
  }
}

export const QuestionController = { postAddQuestionCtrl };
