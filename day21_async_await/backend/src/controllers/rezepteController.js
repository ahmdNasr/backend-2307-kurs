import { RezepteService } from "../service/index.js";

async function getAllRecipesCtrl(req, res) {
  try {
    const recipes = await RezepteService.showAllRecipes();
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add find all recipes" });
  }
}

async function getOneRecipeCtrl(req, res) {
  try {
    const recipeId = req.params.recipeId;
    const foundRecipeWithDetails = await RezepteService.showRecipeDetail(
      recipeId
    );
    res.json(foundRecipeWithDetails);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: "Could not add find recipe " + recipeId });
  }
}

async function postCreateRecipeCtrl(req, res) {
  try {
    const newRecipe = req.body;
    const addedRecipe = await RezepteService.addRecipe(newRecipe);
    res.json(addedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add new recipe" });
  }
}

async function patchUpdateRecipeCtrl(req, res) {
  try {
    const recipeId = req.params.recipeId;
    const updateInfo = req.body;
    // Rezept.findOneAndUpdate({ _id: recipeId }, updateInfo, { new: true })
    const updatedRecipe = await RezepteService.editRecipe(recipeId, updateInfo);
    res.json(updatedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add new recipe" });
  }
}

// kann auch in der arrow-function schreibweise sein
const deleteRecipeCtrl = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const deletedRecipe = await RezepteService.removeRecipe(recipeId);
    res.json(deletedRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not remove recipe" });
  }
};

export const RezepteController = {
  getAllRecipesCtrl,
  getOneRecipeCtrl,
  postCreateRecipeCtrl,
  patchUpdateRecipeCtrl,
  deleteRecipeCtrl,
};
