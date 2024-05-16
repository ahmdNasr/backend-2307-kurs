import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { connectToDatabase } from "./models/index.js";

import { usersRouter } from "./routes/usersRouter.js";
import { quizzesRouter } from "./routes/quizzesRouter.js";
import { questionsRouter } from "./routes/questionsRouter.js";
import { answersRouter } from "./routes/answersRouter.js";

dotenv.config();

const PORT = process.env.PORT || 10001;
const app = express();

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

// re-configure cors middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
/////////// add parser for cookies
app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret, // frei wählbar
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));
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
