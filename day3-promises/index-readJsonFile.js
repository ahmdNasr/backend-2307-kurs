const fs = require("fs");

// higher order function
// fs.readFile(filePath, callback) // callback = (err, buffer) => {}

// params - path: Welche date ???
// return wert: jsObj
function readJsonFile(filePath, callbackFunction) {
  console.log(callbackFunction); // zeigt, dass callbackFunction eine Funktion ist
  fs.readFile(filePath, (err, dataBuffer) => {
    if (err) return console.log(err);
    // Schritte:
    // <Buffer 5b 31 2c 20 32 2c 20 33 ...>
    // toString() ==> JSON String "[1, 2, 3, { "hello": "world" }]"
    // parse ==> JS Objekt/Array [...]
    const jsonString = String(dataBuffer);
    const jsObj = JSON.parse(jsonString);

    // wert übergeben an callbackFunction
    callbackFunction(jsObj); // callback-Funktion aufrufen und die "return werte" übergeben

    // Hinweis:
    // return jsObj; // funktioniert nicht, weil nicht der scope von readJsonFile returned, sondern der scope vom callback an fs.readFile
  });
}

// Parameter --> Platzhalter "Variable mit unbekanntem Wert" (wird von einer Funktion erwartet)
// Argument --> konkreter Wert eines Parameters (wird bei einem Funktions-Aufruf übergeben)

readJsonFile("./data.json", function callbackFunction(jsObj) {
  console.log(jsObj);
});

// json => parse => jsObj
// jsObj => stringify => json
// Buffer (Array aus Zahlen) => Encoding Format => string
// string => Encoding Format => Buffer

//
// Immernoch eine Callback-Hell:
// readJsonFile("./data.json", function callbackFunction(jsObj) {
//   readJsonFile("./data.json", function callbackFunction(jsObj) {
//     readJsonFile("./data.json", function callbackFunction(jsObj) {
//       readJsonFile("./data.json", function callbackFunction(jsObj) {
//         console.log(jsObj);
//       });
//     });
//   });
// });
