import { RezepteService } from "../service/index.js";

function getAllRecipesCtrl(req, res) {
  RezepteService.showAllRecipes()
    .then((recipes) => res.json(recipes))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add find all recipes" });
    });
}

function getOneRecipeCtrl(req, res) {
  const recipeId = req.params.recipeId;
  RezepteService.showRecipeDetail(recipeId)
    .then((foundRecipeWithDetails) => res.json(foundRecipeWithDetails || {}))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "Could not add find recipe " + recipeId });
    });
}

function postCreateRecipeCtrl(req, res) {
  const newRecipe = req.body;
  RezepteService.addRecipe(newRecipe)
    .then((addedRecipe) => res.json(addedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
}

function patchUpdateRecipeCtrl(req, res) {
  const recipeId = req.params.recipeId;
  const updateInfo = req.body;
  // Rezept.findOneAndUpdate({ _id: recipeId }, updateInfo, { new: true })
  RezepteService.editRecipe(recipeId, updateInfo)
    .then((updatedRecipe) => res.json(updatedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
}

// kann auch in der arrow-function schreibweise sein
const deleteRecipeCtrl = (req, res) => {
  const recipeId = req.params.recipeId;
  RezepteService.removeRecipe(recipeId)
    .then((deletedRecipe) => res.json(deletedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not remove recipe" });
    });
};

export const RezepteController = {
  getAllRecipesCtrl,
  getOneRecipeCtrl,
  postCreateRecipeCtrl,
  patchUpdateRecipeCtrl,
  deleteRecipeCtrl,
};
