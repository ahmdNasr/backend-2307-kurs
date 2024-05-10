import { Todo } from "../models/Todo.js";

export async function getTodosForUser(authenticatedUserId) {
  const userTodos = await Todo.find({ ownerId: authenticatedUserId });
  return userTodos;
}
