import { Rezept } from "../models/Rezept.js";

export async function removeRecipe(recipeId) {
  const removedRecipe = await Rezept.findByIdAndDelete(recipeId);
  if (!removedRecipe) throw new Error("Recipe with this id doesn't exist!");
  return removedRecipe;
}
