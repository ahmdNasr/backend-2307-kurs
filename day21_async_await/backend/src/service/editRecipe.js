import { Rezept } from "../models/Rezept.js";

export async function editRecipe(recipeId, recipeUpdateInfo) {
  if (recipeUpdateInfo.name) {
    const foundRecipe = await Rezept.findOne({
      name: recipeUpdateInfo.name,
    });
    if (foundRecipe) {
      // rezept mit dem namen exisitert bereits!! (wollen wir nicht)
      // throw ist wie ein "negatives return" (zitat resul) und schickt den wert new Error("...") an das .catch()
      throw new Error("Cannot change name to an exisiting one!");
    }
  }

  return Rezept.findByIdAndUpdate(
    recipeId,
    { $set: recipeUpdateInfo },
    { new: true }
  );
}

// export async function editRecipe(recipeId, recipeUpdateInfo) {
//   const updatedRecipe = await Rezept.findByIdAndUpdate(
//     recipeId,
//     { $set: recipeUpdateInfo },
//     { new: true }
//   );
//   return updatedRecipe;
// }

// export async function editRecipe(recipeId, recipeUpdateInfo) {
//   if (
//     recipeUpdateInfo.name &&
//     (await Rezept.findOne({
//       name: recipeUpdateInfo.name,
//     }))
//   ) {
//     // rezept mit dem namen exisitert bereits!! (wollen wir nicht)
//     // throw ist wie ein "negatives return" (zitat resul) und schickt den wert new Error("...") an das .catch()
//     throw new Error("Cannot change name to an exisiting one!");
//   }

//   return Rezept.findByIdAndUpdate(
//     recipeId,
//     { $set: recipeUpdateInfo },
//     { new: true }
//   );
// }
