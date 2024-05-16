import express from "express";
import { UserController } from "../controllers/userController.js";
import {
  doJwtAuth,
  validateRefreshTokenInCookieSession,
} from "../middlewares/doJwtAuth.js";

export const usersRouter = express
  .Router()
  .post("/login", UserController.postLoginUserCtrl)
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/verifyEmail", UserController.postVerifyUserEmailCtrl)
  .post(
    "/refresh-token",
    validateRefreshTokenInCookieSession,
    UserController.postRefreshToken
  )
  .delete("/:userId", doJwtAuth, UserController.deleteUserCtrl);
