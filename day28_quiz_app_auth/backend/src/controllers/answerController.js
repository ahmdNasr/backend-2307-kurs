import { AnswerService } from "../services/index.js";

async function postAddAnswerCtrl(req, res) {
  try {
    const answerInfo = req.body;
    const result = await AnswerService.addAnswer(answerInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add answer" });
  }
}

export const AnswerController = { postAddAnswerCtrl };
