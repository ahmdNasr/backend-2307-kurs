import { Router } from "express";
import { registerUser } from "./user.controller.js";

export const userRouter = Router()
  .post("/register", registerUser)
  .post("/login", () => {
    console.log("login");
  })
  .post("/verify-email", () => {
    console.log("verify-email");
  })
  .post("/refresh-token", ()=>{})
  .post("/logout", () => {
    console.log("logout");
  })
  .get("/current-user", () => {
    console.log("get-user");
  });
