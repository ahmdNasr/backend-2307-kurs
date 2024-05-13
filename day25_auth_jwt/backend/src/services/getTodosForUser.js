import { Todo } from "../models/Todo.js";
import { User } from "../models/User.js";

export async function getTodosForUser(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User doesn't exist anymore");

  const userTodos = await Todo.find({ ownerId: authenticatedUserId });
  return userTodos;
}

// getTodosForUser("678378934893893983")
// { ownerId: ObjectId("678378934893893983") }
