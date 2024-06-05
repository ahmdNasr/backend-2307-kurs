import { Router } from "express";
import { registerUser, loginUser } from "./user.controller.js";

export const userRouter = Router()
  .post("/register", registerUser)
  .post("/verify-email", () => {
    console.log("verify-email");
  })
  .post("/login", loginUser)
  .post("/refresh-token", ()=>{})
  .post("/logout", () => {
    console.log("logout");
  })
  .get("/current-user", () => {
    console.log("get-user");
  });
