import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Rezept } from "./models/Rezept.js";
import { Bewertung } from "./models/Bewertung.js";
import { connectToDatabase } from "./models/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("data/images")); // static file server
app.use(express.json()); // body parser

app.get("/", (req, res) => res.json({ hello: "world" }));

app.get("/api/v1/recipes", (req, res) => {
  Rezept.find({})
    .then((recipes) => res.json(recipes))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add find all recipes" });
    });
});

app.get("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  Promise.all([
    Rezept.findById(recipeId),
    Bewertung.find({ recipeId }), // alle bewertungen zu einem rezept [...]
  ])
    .then(
      ([foundRecipe, ratings]) =>
        res.json(foundRecipe ? { ...foundRecipe.toObject(), ratings } : {}) // { result: foundRecipe } | { error, message }
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
  // const rezept = new Rezept(newRecipe);
  // rezept
  //   .save()
  Rezept.create(newRecipe)
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
  Rezept.findByIdAndUpdate(recipeId, updateInfo, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/recipes/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  Rezept.findByIdAndDelete(recipeId)
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
    recipeId: req.params.recipeId, // "663d000149af23e0230aaf39"
  };
  Bewertung.create(newRatingInfo)
    .then((addedRating) => res.json(addedRating || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not add new recipe" });
    });
});

app.delete("/api/v1/ratings/:ratingId", (req, res) => {
  Bewertung.findByIdAndDelete(req.params.ratingId)
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
