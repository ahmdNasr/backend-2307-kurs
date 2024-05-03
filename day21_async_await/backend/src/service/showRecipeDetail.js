import { Bewertung } from "../models/Bewertung.js";
import { Rezept } from "../models/Rezept.js";

export async function showRecipeDetail(recipeId) {
  const foundRecipe = await Rezept.findById(recipeId);
  if (!foundRecipe) throw new Error("Recipe not found!");
  const ratings = await Bewertung.find({ recipeId });
  return { ...foundRecipe.toObject(), ratings };
}

// export async function showRecipeDetail(recipeId) {
//   const [foundRecipe, ratings] = await Promise.all([
//     Rezept.findById(recipeId),
//     Bewertung.find({ recipeId }), // alle bewertungen zu einem rezept [...]
//   ]);
//   if (!foundRecipe) throw new Error("Recipe not found!");
//   // merge recipe with ratings
//   return { ...foundRecipe.toObject(), ratings };
// }
