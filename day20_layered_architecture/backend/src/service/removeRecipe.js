import { Rezept } from "../models/Rezept.js";

export function removeRecipe(recipeId) {
  return Rezept.findByIdAndDelete(recipeId).then((removedRecipe) => {
    if (!removedRecipe) throw new Error("Recipe with this id doesn't exist!");
    else return removedRecipe;
  });
}
