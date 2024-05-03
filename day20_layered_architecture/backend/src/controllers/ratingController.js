import { BewertungenService } from "../service/index.js";

function postRatingToRecipeCtrl(req, res) {
  BewertungenService.addRatingToRecipe(req.body, req.params.recipeId)
    .then((addedRating) => res.json(addedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
}

function deleteRatingCtrl(req, res) {
  BewertungenService.removeRating(req.params.ratingId)
    .then((deletedRating) => res.json(deletedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
}

export const BewertungenController = {
  postRatingToRecipeCtrl,
  deleteRatingCtrl,
};
