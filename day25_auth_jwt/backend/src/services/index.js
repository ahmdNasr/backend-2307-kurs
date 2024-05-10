import { getTodosForUser } from "./getTodosForUser.js";
import { loginUser } from "./loginUser.js";
import { registerUser } from "./registerUser.js";

export const UserService = {
  registerUser,
  loginUser,
};

export const TodoService = {
  getTodosForUser,
};
