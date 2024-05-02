import { Bewertung } from "../models/Bewertung.js";
import { Rezept } from "../models/Rezept.js";

export function showRecipeDetail(recipeId) {
  return Promise.all([
    Rezept.findById(recipeId),
    Bewertung.find({ recipeId }), // alle bewertungen zu einem rezept [...]
  ]).then(([foundRecipe, ratings]) => {
    // merge recipe with ratings
    if (foundRecipe) return { ...foundRecipe.toObject(), ratings };
    else return null;
  });
}
