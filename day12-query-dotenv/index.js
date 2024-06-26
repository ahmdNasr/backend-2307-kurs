import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { MoviesAPI } from "./nichtUnserCode/fake_moviedatabase.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));

app.get("/movies", (req, res) => {
  const titleSearch = req.query?.titleSearch?.toLowerCase(); // '.'-operator zugriff und '?.'-operator zugriff oder undefined für die gesamte expression
  const year = Number(req.query.year); // movie.year === year
  const directorSearch = req.query.directorSearch?.toLowerCase();
  const genre = req.query.genre?.toLowerCase();
  const minRating = Number(req.query.minRating) || 0; // minRating 0 wenn kein gültiger Wert, damit wir JEDE movie nehmen im filter

  MoviesAPI(process.env.API_KEY)
    .then((movies) =>
      movies
        .filter((movie) =>
          titleSearch ? movie.title.toLowerCase().includes(titleSearch) : true
        )
        .filter((movie) => (year ? Number(movie.year) === year : true)) // "2001" === "2001" -> true \\\\\ 2001 === 2001 -> true
        .filter((movie) =>
          directorSearch
            ? movie.director.toLowerCase().includes(directorSearch)
            : true
        )
        .filter((movie) =>
          genre ? movie.genre.map((g) => g.toLowerCase()).includes(genre) : true
        )
        .filter((movie) => (minRating ? Number(movie.rate) >= minRating : true))
    )
    .then((moviesFiltered) => res.json(moviesFiltered))
    .catch((err) => res.status(500).json(err));
});

const PORT = process.env.PORT || 3005; // entwender aus der .env den port nehmen, oder falls nichrt vorhanden, nimm 3005
app.listen(PORT, () => console.log("Server ready at port", PORT));
