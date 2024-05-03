import { addRatingToRecipe } from "./addRatingToRecipe.js";
import { addRecipe } from "./addRecipe.js";
import { editRecipe } from "./editRecipe.js";
import { removeRating } from "./removeRating.js";
import { removeRecipe } from "./removeRecipe.js";
import { showAllRecipes } from "./showAllRecipes.js";
import { showRecipeDetail } from "./showRecipeDetail.js";

// RezepteService mit den Service-Funktionen der Rezepte
export const RezepteService = {
  showAllRecipes,
  showRecipeDetail,
  addRecipe,
  editRecipe,
  removeRecipe,
};

// BewertungenService mit den Service-Funktionen der Bewertungen
export const BewertungenService = {
  addRatingToRecipe,
  removeRating,
};
