const http = require("http");
const { readFile } = require("./filesystem.js");

const server = http.createServer((request, response) => {
  console.log("new request:", request.method, request.url);

  // readFile aufruf und senden + error handling in eine funktion auslagern
  const sendFile = (filePath) => {
    readFile(filePath)
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  };

  // Routing fängt hier an: Die url/route in der request matchen mit der richtigen Aufgabe
  if (
    request.method === "GET" &&
    (request.url === "/" || request.url === "/home")
  ) {
    sendFile("./public/pages/home.html");
  } else if (request.method === "GET" && request.url === "/about") {
    sendFile("./public/pages/about.html");
  } else if (request.method === "GET" && request.url === "/diestyles") {
    sendFile("./public/css/styles.css");
  } else if (request.method === "GET" && request.url === "/images/we.jpeg") {
    sendFile("./public/images/we.jpeg");
  } else if (request.method === "GET" && request.url === "/endpunkt-route") {
    // besser skalierbar, weil nur einfache funktion zum aufrufen
    sendFile("./public/images/file-route.jpeg");
  } else {
    sendFile("./public/pages/error.html");
  }
}); // server hat einen requestListener (auch Request-Handler genannt)

const PORT = 3003; // 1-65k (65535)  localhost:5500, react localhost:3000, vite localhost:5178
server.listen(PORT, () => console.log("server ready at port", PORT));
