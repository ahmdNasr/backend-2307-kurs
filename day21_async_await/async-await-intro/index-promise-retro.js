function greet(name) {
  return new Promise((resolve, reject) => {
    if (!name) return reject("name must be defined");

    setTimeout(() => {
      resolve("Hallo " + name + "!");
    }, 1000);
  });
}

// function greetLowerCase(name) {
//   return greet(name).then((greeting) => greeting.toLowerCase());
// }

function greetLowerCaseAndWelcome(name) {
  return greet(name)
    .then((greeting) => greeting.toLowerCase())
    .then((greeting) => greeting + " Willkommen!");
}

greetLowerCaseAndWelcome("Beate")
  .then((greeting) => console.log(greeting))
  .catch((err) => console.log(err));
