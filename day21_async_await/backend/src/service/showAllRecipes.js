import { Rezept } from "../models/Rezept.js";

export async function showAllRecipes() {
  const recipes = await Rezept.find({});
  return recipes;
}
