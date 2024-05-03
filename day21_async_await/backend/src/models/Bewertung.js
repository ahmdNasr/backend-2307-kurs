import mongoose from "mongoose";

const bewertungenSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    recipeId: { type: mongoose.Types.ObjectId, ref: "Rezept", required: true },
  },
  { collection: "bewertungen", timestamps: true }
);

export const Bewertung = mongoose.model("Bewertung", bewertungenSchema);
