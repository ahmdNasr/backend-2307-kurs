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

// function greetLowerCaseAndWelcome(name) {
//   return greet(name)
//     .then((greeting) => greeting.toLowerCase())
//     .then((greetingLowerCase) => greetingLowerCase + " Willkommen!");
// }

async function greetLowerCaseAndWelcome(name) {
  //   try {
  const greeting = await greet(name);
  const greetingLowerCase = greeting.toLowerCase();
  return { greeting, greetWelcome: greetingLowerCase + " Willkommen!" };
  //   } catch (err) {
  //     console.log("name war nicht definiert, unbekannte person erkannt");
  //     return "hallo unbekannter!";
  //   }
}
// const greetLowerCaseAndWelcome = async () => {}

async function run() {
  try {
    const result = await greetLowerCaseAndWelcome();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

run();
