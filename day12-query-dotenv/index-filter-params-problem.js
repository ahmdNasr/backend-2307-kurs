import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { MoviesAPI } from "./nichtUnserCode/fake_moviedatabase.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));

app.get("/movies", (req, res) => {
  MoviesAPI(process.env.API_KEY)
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).json(err));
});
app.get("/movies/genre/:genreSearch", (req, res) => {
  const genreSearch = req.params.genreSearch;

  MoviesAPI(process.env.API_KEY)
    .then((movies) =>
      movies.filter((movie) =>
        movie.genre
          .map((genre) => genre.toLowerCase())
          .includes(genreSearch.toLowerCase())
      )
    )
    .then((moviesFiltered) => res.json(moviesFiltered))
    .catch((err) => res.status(500).json(err));
});

app.get("/movies/year/:yearSearch", (req, res) => {
  const yearSearch = req.params.yearSearch;

  MoviesAPI(process.env.API_KEY)
    .then((movies) => movies.filter((movie) => movie.year === yearSearch))
    .then((moviesFiltered) => res.json(moviesFiltered))
    .catch((err) => res.status(500).json(err));
});

app.get("/movies/rating/:minRating", (req, res) => {
  const minRating = Number(req.params.minRating);

  MoviesAPI(process.env.API_KEY)
    .then((movies) => movies.filter((movie) => Number(movie.rate) >= minRating))
    .then((moviesFiltered) => res.json(moviesFiltered))
    .catch((err) => res.status(500).json(err));
});

app.get("/movies/director/:directorSearch", (req, res) => {
  const directorSearch = req.params.directorSearch.toLowerCase();

  MoviesAPI(process.env.API_KEY)
    .then((movies) =>
      movies.filter((movie) =>
        movie.director.toLowerCase().includes(directorSearch)
      )
    )
    .then((moviesFiltered) => res.json(moviesFiltered))
    .catch((err) => res.status(500).json(err));
});

app.get("/movies/gr/:genreSearch/:minRating/", (req, res) => {
  const genreSearch = req.params.genreSearch.toLowerCase();
  const minRating = Number(req.params.minRating);

  MoviesAPI(process.env.API_KEY)
    .then((movies) =>
      movies.filter((movie) =>
        movie.genre.map((g) => g.toLowerCase()).includes(genreSearch)
      )
    )
    .then((movies) => movies.filter((movie) => Number(movie.rate) >= minRating))
    .then((filteredMovies) => res.json(filteredMovies))
    .catch((err) => console.log(err));
});

app.get("/movies/grd/:genreSearch/:minRating/:directorSearch", (req, res) => {
  const genreSearch = req.params.genreSearch.toLowerCase();
  const minRating = Number(req.params.minRating);
  const directorSearch = req.params.directorSearch.toLowerCase();

  MoviesAPI(process.env.API_KEY)
    .then((movies) =>
      movies.filter((movie) =>
        movie.genre.map((g) => g.toLowerCase()).includes(genreSearch)
      )
    )
    .then((movies) => movies.filter((movie) => Number(movie.rate) >= minRating))
    .then((movies) =>
      movies.filter((movie) =>
        movie.director.toLowerCase().includes(directorSearch)
      )
    )
    .then((filteredMovies) => res.json(filteredMovies))
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 3005; // entwender aus der .env den port nehmen, oder falls nichrt vorhanden, nimm 3005
app.listen(PORT, () => console.log("Server ready at port", PORT));

// wieviel endpunkte müssen wir bei n paramtern implementiern ?
// 6: (1) + (6) + (6 * 5) + (6 * 5 * 4) + (6 * 5 * 4 * 3) + (6 * 5 * 4 * 3 * 2) + (6 * 5 * 4 * 3 * 2 * 1) = 1957
// 7: (1) + (7) + (7 * 6) + (7 * 6 * 5) + (7 * 6 * 5 * 4) + (7 * 6 * 5 * 4 * 3) + (7 * 6 * 5 * 4 * 3 * 2) + (7 * 6 * 5 * 4 * 3 * 2 * 1) = 13700
// 8: (1) + (8) + (8 * 7) + (8 * 7 * 6) + (8 * 7 * 6 * 5) + (8 * 7 * 6 * 5 * 4) + (8 * 7 * 6 * 5 * 4 * 3) + (8 * 7 * 6 * 5 * 4 * 3 * 2) + (8 * 7 * 6 * 5 * 4 * 3 * 2 * 1) = 109k
// 9: (1) + (9) + (9 * 8) + (9 * 8 * 7) + (9 * 8 * 7 * 6) + (9 * 8 * 7 * 6 * 5) + (9 * 8 * 7 * 6 * 5 * 4) + (9 * 8 * 7 * 6 * 5 * 4 * 3) + (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2) + (9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1) = 986410
// zu viele!
