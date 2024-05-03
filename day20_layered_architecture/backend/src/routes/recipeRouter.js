import express from "express";
import { RezepteController } from "../controllers/rezepteController.js";

// Router ist wie eine mini-app
// const meinRouter = express.Router()
// meinRouter.get("/", (req, res) => {})
// meinRouter.post("/", (req, res) => {}).post("/", (req, res) => {}) // chainen der endpunkte geht auch

// /api/v1/recipes
export const recipeRouter = express
  .Router()
  // .get("/", body("name").isString(), ...middleware, RezepteController.getAllRecipesCtrl)
  .get("/", RezepteController.getAllRecipesCtrl)
  .get("/:recipeId", RezepteController.getOneRecipeCtrl)
  .post("/", RezepteController.postCreateRecipeCtrl)
  .patch("/:recipeId", RezepteController.patchUpdateRecipeCtrl)
  .delete("/:recipeId", RezepteController.deleteRecipeCtrl);
