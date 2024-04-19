import express from "express";
import { MoviesAPI } from "./nichtUnserCode/fake_moviedatabase.js";

const app = express();

app.get("/movies", (req, res) => {
  MoviesAPI("1239248C12628D1AB117A8A1")
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).json(err));
});

const PORT = 3005;
app.listen(PORT, () => console.log("Server ready at port", PORT));
