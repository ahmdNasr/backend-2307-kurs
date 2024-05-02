import { Rezept } from "../models/Rezept.js";
import { Bewertung } from "../models/Bewertung.js";

export function addRatingToRecipe(ratingInfo, recipeId) {
  return Rezept.findById(recipeId).then((foundRecipe) => {
    if (!foundRecipe) {
      throw new Error("Recipe with this id doesn't exist");
    } else {
      return Bewertung.create({ ...ratingInfo, recipeId });
    }
  });
}
