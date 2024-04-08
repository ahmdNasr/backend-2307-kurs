const fs = require("fs");

function readJsonFile(filePath) {
  return new Promise((resolve, reject) => {
    // async code ...
    fs.readFile(filePath, (err, dataBuffer) => {
      if (err) return reject(err); // Promise konnte nicht erfüllt werden: "Promise could not be fulfilled"
      const jsonString = String(dataBuffer);
      const jsObj = JSON.parse(jsonString);
      resolve(jsObj); // jsObj taucht im .then((jsObj) => ... ) wieder auf
    });
  });
}

function writeJsonFile(filePath, jsObj) {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(jsObj);
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) return reject(err);
      resolve(); // "ich bin fertig", muss nicht zwingend etwas übergeben
    });
  });
}

// SO BITTE NICHT:
// readJsonFile("./data.json").then((result) => {
//   if (!Array.isArray(result))
//     return console.log("file has no js array, will abort");

//   const numbersArray = result.filter((element) => typeof element === "number");

//   writeJsonFile("./data.json", numbersArray).then(() => {
//     console.log("done.");
//   });
// });

function filterNumbers(result) {
  if (!Array.isArray(result)) throw "file has no js array, will abort";
  const numbersArray = result.filter((element) => typeof element === "number");
  return numbersArray;
}

readJsonFile("./data.json")
  .then((result) => filterNumbers(result))
  .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
  .catch((error) => console.log("fehler:", error));

// readJsonFile("./data.json")
//   .then((result) => filterNumbers(result))
//   .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
//   .then(() => readJsonFile("./data.json"))
//   .then((result) => filterNumbers(result))
//   .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
//   .then(() => readJsonFile("./data.json"))
//   .then((result) => filterNumbers(result))
//   .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
//   .then(() => readJsonFile("./data.json"))
//   .then((result) => filterNumbers(result))
//   .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
//   .then(() => readJsonFile("./data.json"))
//   .then((result) => filterNumbers(result))
//   .then((numbersArray) => writeJsonFile("./data.json", numbersArray))
//   .then(() => console.log("done."))
//   .catch((err) => console.log("fehler:", err));
