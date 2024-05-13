import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import { TodoService, UserService } from "./services/index.js";
import { doJwtAuth } from "./middlewares/doJwtAuth.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("data/images")); // static file server
app.use(express.json()); // body parser

app.post(
  "/api/v1/users/register",
  async function postRegisterUserCtrl(req, res) {
    try {
      const userInfo = req.body;
      const result = await UserService.registerUser(userInfo);
      res.json({ result });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err, message: err.message || "Could not register" });
    }
  }
);

app.post("/api/v1/users/login", async function postLoginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(userInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not register" });
  }
});

app.post(
  "/api/v1/users/verifyEmail",
  async function postVerifyUserEmailCtrl(req, res) {
    try {
      const verifyEmailInfo = {
        userId: req.body.userId,
        sixDigitCode: req.body.sixDigitCode,
      };
      const result = await UserService.verifyUserEmail(verifyEmailInfo);
      res.json({ result });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err, message: err.message || "Could not register" });
    }
  }
);

app.get(
  "/api/v1/todos",
  doJwtAuth,
  async function getTodosForUserCtrl(req, res) {
    try {
      const authenticatedUserId = req.authenticatedUserId;
      const result = await TodoService.getTodosForUser(authenticatedUserId);
      res.json({ result });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err, message: err.message || "Could not register" });
    }
  }
);

app.delete(
  "/api/v1/todos/:todoId",
  doJwtAuth,
  async function deleteTodoByIdCtrl(req, res) {
    try {
      const todoId = req.params.todoId;
      const authenticatedUserId = req.authenticatedUserId;
      const result = await TodoService.removeTodo(todoId, authenticatedUserId); // überprüft ob authenticatedUserId der owner ist und löscht...!
      res.json({ result });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err, message: err.message || "Could not register" });
    }
  }
);

try {
  // Auf oberster Ebene wird immernoch .then und .catch benötigt :)
  await connectToDatabase();
  // Nur wenn die Datenbankverbindung erfolgreich aufgebaut wird
  // wollen wir unseren server exposen (durch app.listen)
  const PORT = 3006;
  app.listen(PORT, () => console.log("Server listening at port", PORT));
} catch (err) {
  console.log(err);
  process.exit(); // node prozess beenden
}
