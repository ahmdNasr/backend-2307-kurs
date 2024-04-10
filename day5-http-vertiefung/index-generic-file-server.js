const { readFile } = require("fs");
const http = require("http");

const server = http.createServer((request, response) => {
  console.log("new request", request.method, request.url);
  // request.url example: /css/styles.css,,, /images/we.jpeg, / ==> /pages/home.html
  // /               ====> ./public/pages/home.html
  // /css/styles.css ====> ./public/css/styles.css
  // /images/we.jpeg ====> ./public/images/we.jpeg
  // /aosduihaiosd   ====> ./public/aosduihaiosd
  const filePath =
    request.url === "/" ? "./public/pages/home.html" : `./public${request.url}`; // "./public" + request.url;

  readFile(filePath)
    .then((dataBuffer) => {
      // filePath war eine valide Datei
      response.write(dataBuffer);
      response.end();
    })
    .catch(() => sendErrorFile());

  function sendErrorFile() {
    readFile("./public/pages/error.html")
      .then((errorPageBuffer) => response.end(errorPageBuffer))
      .catch((err) => {
        console.log(err);
        // TODO: status code 500
        response.end("Internal Server Error!");
      });
  }
});

const PORT = 3003;
server.listen(PORT, () => console.log("Server ready at", PORT));
