const fs = require("fs");
const http = require("http");

const { readFile } = require("./filesystem.js");

// Wir laden die Error-Page synchron
// das heißt bis sie nicht geladen ist, startet der Server auch nicht!
// das heißt auch, wenn das Laden scheitern sollte, starter der Server gar nicht (bis die Ursache gefixed ist - zb Rechtevergabe)
// es hat einen kleinen Vorteil: dadurch, dass wir die error page einmalig laden, ersparen wir uns das erneute laden bei jeder Abfrage...
// + es sorgt für weniger code (siehe Kontrast in index-generic-file-server.js)
const errorPage = fs.readFileSync("./public/pages/error.html");

const server = http.createServer((request, response) => {
  console.log("new request", request.method, request.url);
  // request.url example: /css/styles.css,,, /images/we.jpeg, / ==> /pages/home.html

  //                                 v---- ab hier muss der endpunkt korrekt definiert sein (Ausnahme / und /home )
  // /                 ====> ./public/pages/home.html
  // /home             ====> ./public/pages/home.html
  // /pages/about.html ====> ./public/pages/about.html
  // /css/styles.css   ====> ./public/css/styles.css
  // /images/we.jpeg   ====> ./public/images/we.jpeg
  // /aosduihaiosd     ====> ./public/aosduihaiosd

  // optional: NUR GET Abfragen erlauben
  if (request.method !== "GET") {
    response.end(errorPage);
    return; // request-handler funktion mit einem return beenden (response.end() senden nur, es beendet die funktion nicht!)
  }

  const filePath =
    request.url === "/" || request.url === "/home"
      ? "./public/pages/home.html"
      : `./public${request.url}`; // "./public" + request.url;

  readFile(filePath)
    .then((dataBuffer) => {
      // filePath war eine valide Datei
      response.write(dataBuffer);
      response.end();
    })
    .catch((err) => {
      console.log(err);
      // TODO: status code 404 Not found
      response.end(errorPage);
    });
});

const PORT = 3003;
server.listen(PORT, () => console.log("Server ready at", PORT));
