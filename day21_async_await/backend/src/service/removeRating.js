import { Bewertung } from "../models/Bewertung.js";

export async function removeRating(ratingId) {
  const removedRating = await Bewertung.findByIdAndDelete(ratingId);
  if (!removedRating) throw new Error("Rating with this id not found");
  return removedRating;
}
