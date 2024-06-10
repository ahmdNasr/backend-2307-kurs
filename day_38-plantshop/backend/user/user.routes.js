import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, logout } from "./user.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const userRouter = Router()
  .post("/register", registerUser)
  .post("/verify-email", () => {
    console.log("verify-email");
  })
  .post("/login", loginUser)
  .post("/refresh-token", ()=>{
  })
  .post("/logout", logout)
  .get("/current-user", checkAuth(), getCurrentUser)
  .get("/adminstuff", checkAuth({onlyAdmins: true}), (req, res) => {
    console.log("ahhhh, adminstuff");
    res.end()
  });
