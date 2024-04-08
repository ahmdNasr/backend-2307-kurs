const fs = require("fs");

function readJsonFile(filePath, callbackFunction) {
  fs.readFile(filePath, (err, dataBuffer) => {
    if (err) return console.log(err);

    const jsonString = String(dataBuffer);
    const jsObj = JSON.parse(jsonString);
    callbackFunction(jsObj);
  });
}

function writeJsonFile(filePath, jsObj, callbackFunction) {
  const jsonString = JSON.stringify(jsObj);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) return console.log(err);
    callbackFunction(); // "ich bin fertig"
  });
}

readJsonFile("./data.json", function callbackFunction(result) {
  if (!Array.isArray(result))
    return console.log("file has no js array, will abort");

  const numbersArray = result.filter((element) => typeof element === "number");

  writeJsonFile("./data.json", numbersArray, () => {
    readJsonFile("./data.json", function callbackFunction(result) {
      if (!Array.isArray(result))
        return console.log("file has no js array, will abort");

      const numbersArray = result.filter(
        (element) => typeof element === "number"
      );

      writeJsonFile("./data.json", numbersArray, () => {
        readJsonFile("./data.json", function callbackFunction(result) {
          if (!Array.isArray(result))
            return console.log("file has no js array, will abort");

          const numbersArray = result.filter(
            (element) => typeof element === "number"
          );

          writeJsonFile("./data.json", numbersArray, () => {
            console.log("done.");
          });
        });
      });
    });
  });
});
