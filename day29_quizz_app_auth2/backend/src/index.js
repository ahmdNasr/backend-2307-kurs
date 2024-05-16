import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";

import { usersRouter } from "./routes/usersRouter.js";
import { quizzesRouter } from "./routes/quizzesRouter.js";
import { questionsRouter } from "./routes/questionsRouter.js";
import { answersRouter } from "./routes/answersRouter.js";

const PORT = process.env.PORT || 10001;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // json body parser

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/quizzes", quizzesRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/answers", answersRouter);

try {
  await connectToDatabase();
  app.listen(PORT, () => console.log("Server ready at port", PORT));
} catch (err) {
  console.error(err);
  process.exit(1); // 1 exit status
}
