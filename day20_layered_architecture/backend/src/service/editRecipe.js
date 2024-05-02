import { Rezept } from "../models/Rezept.js";

export function editRecipe(recipeId, recipeUpdateInfo) {
  return Rezept.findByIdAndUpdate(
    recipeId,
    { $set: recipeUpdateInfo },
    { new: true }
  );
}

// export function editRecipe(recipeId, recipeUpdateInfo) {
//   const updateRecipe = () =>
//     Rezept.findByIdAndUpdate(
//       recipeId,
//       { $set: recipeUpdateInfo },
//       { new: true }
//     );
//   if (recipeUpdateInfo.name) {
//     return Rezept.findOne({ name: recipeUpdateInfo.name }).then(
//       (foundRecipe) => {
//         if (foundRecipe) {
//           // rezept mit dem namen exisitert bereits!! (wollen wir nicht)
//           // throw ist wie ein "negatives return" (zitat resul) und schickt den wert new Error("...") an das .catch()
//           throw new Error("Cannot change name to an exisiting one!");
//         }

//         return updateRecipe();
//       }
//     );
//   } else {
//     return updateRecipe();
//   }
// }
