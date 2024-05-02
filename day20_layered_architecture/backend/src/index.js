import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import { BewertungenService, RezepteService } from "./service/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("data/images")); // static file server
app.use(express.json()); // body parser

app.get("/", (req, res) => res.json({ hello: "world" }));

app.get("/api/v1/recipes", (req, res) => {
  RezepteService.showAllRecipes()
    .then((recipes) => res.json(recipes))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add find all recipes" });
    });
});

app.get("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  RezepteService.showRecipeDetail(recipeId)
    .then((foundRecipeWithDetails) => res.json(foundRecipeWithDetails || {}))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "Could not add find recipe " + recipeId });
    });
});

app.post("/api/v1/recipes", (req, res) => {
  const newRecipe = req.body;
  RezepteService.addRecipe(newRecipe)
    .then((addedRecipe) => res.json(addedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.patch("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const updateInfo = req.body;
  // Rezept.findOneAndUpdate({ _id: recipeId }, updateInfo, { new: true })
  RezepteService.editRecipe(recipeId, updateInfo)
    .then((updatedRecipe) => res.json(updatedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  RezepteService.removeRecipe(recipeId)
    .then((deletedRecipe) => res.json(deletedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not remove recipe" });
    });
});

// add bewertung to rezept
app.post("/api/v1/recipes/:recipeId/ratings", (req, res) => {
  BewertungenService.addRatingToRecipe(req.params.recipeId, req.body)
    .then((addedRating) => res.json(addedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/ratings/:ratingId", (req, res) => {
  BewertungenService.removeRating(req.params.ratingId)
    .then((deletedRating) => res.json(deletedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

connectToDatabase()
  .then(() => {
    // Nur wenn die Datenbankverbindung erfolgreich aufgebaut wird
    // wollen wir unseren server exposen (durch app.listen)
    const PORT = 3006;
    app.listen(PORT, () => console.log("Server listening at port", PORT));
  })
  .catch((err) => {
    console.log(err);
    process.exit(); // node prozess beenden
  });
