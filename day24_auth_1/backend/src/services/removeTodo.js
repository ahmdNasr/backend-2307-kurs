import { Todo } from "../models/Todo.js";

export async function removeTodo(todoId, authenticatedUserId) {
  const todo = await Todo.findOneAndDelete({
    _id: todoId,
    ownerId: authenticatedUserId, // Authroization check!
  });
  if (!todo) throw new Error("Could not find your todo");

  return todo;
}

// export async function removeTodo(todoId, authenticatedUserId) {
//   const todo = await Todo.findById(todoId);
//   if (!todo) throw new Error("Could not find todo");

//   const correctOwner =
//     todo.ownerId.toString() !== authenticatedUserId.toString();
//   if (!correctOwner)
//     throw new Error("Only the owner is allowed to remove a todo");

//   await Todo.deleteOne({ _id: todo._id });

//   return todo;
// }
