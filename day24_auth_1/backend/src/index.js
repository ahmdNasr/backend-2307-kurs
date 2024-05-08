import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import { TodoService, UserService } from "./services/index.js";
import { doBasicAuth } from "./middlewares/doBasicAuth.js";

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

app.get(
  "/api/v1/todos",
  doBasicAuth, // prüft die auth informationen in req.headers.authorization UND setzt den authorized user in die req (für den controller.)
  async function getTodosForUserCtrl(req, res) {
    try {
      const authenticatedUserId = req.authenticatedUser._id;
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
  doBasicAuth,
  async function deleteTodoByIdCtrl(req, res) {
    try {
      const todoId = req.params.todoId;
      const authenticatedUserId = req.authenticatedUser._id;
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
