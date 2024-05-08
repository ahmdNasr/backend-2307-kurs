import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    isDone: { type: Boolean, default: false },
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "todos", timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);

// Todo.create({
//   description: "basic auth fertig coden",
//   isDone: false,
//   ownerId: "663b492cec912cbaddf21615",
// });

// Todo.create({
//   description: "pause machen",
//   isDone: false,
//   ownerId: "663b492cec912cbaddf21615",
// });

// Todo.create({
//   description: "haus bauen",
//   isDone: false,
//   ownerId: "663b492cec912cbaddf21615",
// });
