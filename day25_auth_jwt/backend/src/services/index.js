import { getTodosForUser } from "./getTodosForUser.js";
import { loginUser } from "./loginUser.js";
import { registerUser } from "./registerUser.js";
import { verifyUserEmail } from "./verifyUserEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  verifyUserEmail,
};

export const TodoService = {
  getTodosForUser,
};
