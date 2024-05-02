import { Rezept } from "../models/Rezept.js";

export function showAllRecipes() {
  return Rezept.find({});
}
