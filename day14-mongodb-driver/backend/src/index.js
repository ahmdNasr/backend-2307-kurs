import express from "express";
import morgan from "morgan";
import { RezepteDAO } from "./db-access/rezepteDAO.js";
import { BewertungenDAO } from "./db-access/bewertungenDAO.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // body parser

app.get("/", (req, res) => res.json({ hello: "world" }));

app.get("/api/v1/recipes", (req, res) => {
  RezepteDAO.findAll()
    .then((recipes) => res.json(recipes))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add find all recipes" });
    });
});

app.get("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  Promise.all([
    RezepteDAO.findById(recipeId),
    BewertungenDAO.findByRecipe(recipeId), // alle bewertungen zu einem rezept [...]
  ])
    .then(
      ([foundRecipe, ratings]) =>
        res.json(foundRecipe ? { ...foundRecipe, ratings } : {}) // { result: foundRecipe } | { error, message }
    )
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ err, message: "Could not add find recipe " + recipeId });
    });
});

app.post("/api/v1/recipes", (req, res) => {
  const newRecipe = req.body;
  RezepteDAO.createOne(newRecipe)
    .then((addedRecipe) => res.json(addedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.patch("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const updateInfo = req.body;
  RezepteDAO.updateOne(recipeId, updateInfo)
    .then((updatedRecipe) => res.json(updatedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  RezepteDAO.deleteOne(recipeId)
    .then((deletedRecipe) => res.json(deletedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not remove recipe" });
    });
});

// add bewertung to rezept
app.post("/api/v1/recipes/:recipeId/ratings", (req, res) => {
  const newRatingInfo = {
    text: req.body.text, // hat super geschmeckt das rezept, freue mich auf das nächste
    stars: req.body.stars, // 5 stars
    recipeId: ObjectId.createFromHexString(req.params.recipeId), // "663d000149af23e0230aaf39"
  };
  BewertungenDAO.createOne(newRatingInfo)
    .then((addedRating) => res.json(addedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/ratings/:ratingId", (req, res) => {
  BewertungenDAO.deleteOne(req.params.ratingId)
    .then((deletedRating) => res.json(deletedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

const PORT = 3006;
app.listen(PORT, () => console.log("Server listening at port", PORT));
