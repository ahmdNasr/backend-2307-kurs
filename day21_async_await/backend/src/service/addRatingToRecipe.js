import { Rezept } from "../models/Rezept.js";
import { Bewertung } from "../models/Bewertung.js";

export async function addRatingToRecipe(ratingInfo, recipeId) {
  const foundRecipe = await Rezept.findById(recipeId);
  if (!foundRecipe) throw new Error("Recipe with this id doesn't exist");
  return Bewertung.create({ ...ratingInfo, recipeId });
}
