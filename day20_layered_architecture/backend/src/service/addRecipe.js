import { Rezept } from "../models/Rezept.js";

export function addRecipe(recipeInfo) {
  return Rezept.findOne({ name: recipeInfo.name }).then((foundRecipe) => {
    if (foundRecipe) {
      // rezept mit dem namen exisitert bereits!! (wollen wir nicht)
      // throw ist wie ein "negatives return" (zitat resul) und schickt den wert new Error("...") an das .catch()
      throw new Error("Recipe with this name already exists");
    } else {
      return Rezept.create(recipeInfo);
    }
  });
}

// function f() {
//   return "wert"
// }

// const result = f()

/////////////

/*
function f(input) {
  if (!input) {
    throw "error :O";
  }

  return "wert";
}

function f() {
  return "wert";
}

try {
  const result = f(); // throw ? ======> catch
  console.log(result); // wert
} catch (err) {
  console.log(err); // error :O
}
*/
