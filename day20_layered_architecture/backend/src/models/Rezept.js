import mongoose from "mongoose";

const rezepteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    anleitung: { type: String, required: true, trim: true },
    bildUrl: { type: String, default: "placeholder.jpg" },
    portionen: { type: Number, default: 2 },
    zutaten: [
      {
        menge: { type: Number, min: 0 },
        einheit: {
          type: String,
          required: false,
          enum: ["g", "ml", "EL", "TL"],
        },
        // was ist die trim operation ?
        // " hallo welt!    " --trim--> "hallo welt!"
        // "     " --trim--> ""
        zutat: { type: String, trim: true },
      },
    ],
  },
  { collection: "rezepte", timestamps: true }
);

export const Rezept = mongoose.model("Rezept", rezepteSchema);

// // Wie verwenden wir ein model ?
// // kommt in eine andere Datei:
// const couscous = new Rezept({
//   name: "Couscous auf rosenkohl",
//   anleitung: "ofen rein, nach 15min genießen",
//   zutaten: [
//     { menge: 300, einheit: "g", zutat: "Couscous" },
//     { menge: 150, einheit: "g", zutat: "Karotten" },
//   ],
// });

// couscous.save().then((result) => {
//   console.log("wurde gespeichert");
//   console.log(result);
// });

// // oder
// Rezept.create({
//   name: "Couscous auf rosenkohl",
//   anleitung: "ofen rein, nach 15min genießen",
//   zutaten: [
//     { menge: 300, einheit: "g", zutat: "Couscous" },
//     { menge: 150, einheit: "g", zutat: "Karotten" },
//   ],
// }).then((result) => {
//   console.log("wurde gespeichert");
//   console.log(result);
// });
