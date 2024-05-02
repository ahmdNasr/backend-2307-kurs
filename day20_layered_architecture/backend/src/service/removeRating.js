import { Bewertung } from "../models/Bewertung.js";

export function removeRating(ratingId) {
  return Bewertung.findByIdAndDelete(ratingId).then((removedRating) => {
    if (!removedRating) {
      throw new Error("Rating with this id not found");
    } else {
      return removedRating;
    }
  });
}
