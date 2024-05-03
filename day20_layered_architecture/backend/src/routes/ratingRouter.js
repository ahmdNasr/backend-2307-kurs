import express from "express";
import { BewertungenController } from "../controllers/ratingController.js";

// /api/v1/ratings
export const ratingRouter = express
  .Router()
  .post(
    "/toRecipe/:recipeId", // add bewertung to rezept
    BewertungenController.postRatingToRecipeCtrl
  )
  .delete("/:ratingId", BewertungenController.deleteRatingCtrl);
