import express from "express";
import { UserController } from "../controllers/userController.js";

export const usersRouter = express
  .Router()
  .post("/", UserController.postRegisterUserCtrl)
  .delete("/:userId", UserController.deleteUserCtrl);
