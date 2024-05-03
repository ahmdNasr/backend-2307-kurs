import { BewertungenService } from "../service/index.js";

async function postRatingToRecipeCtrl(req, res) {
  try {
    const ratingInfo = req.body;
    const recipeId = req.params.recipeId;
    const addedRating = await BewertungenService.addRatingToRecipe(
      ratingInfo,
      recipeId
    );
    res.json(addedRating);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add new recipe" });
  }
}

async function deleteRatingCtrl(req, res) {
  try {
    const deletedRating = await BewertungenService.removeRating(
      req.params.ratingId
    );
    res.json(deletedRating);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add new recipe" });
  }
}

export const BewertungenController = {
  postRatingToRecipeCtrl,
  deleteRatingCtrl,
};
