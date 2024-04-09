const http = require("http");
const { readFile } = require("./filesystem.js");

const server = http.createServer((request, response) => {
  console.log("new request:", request.method, request.url);

  // Routing fängt hier an: Die url/route in der request matchen mit der richtigen Aufgabe
  if (
    request.method === "GET" &&
    (request.url === "/" || request.url === "/home")
  ) {
    readFile("./public/pages/home.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  } else if (request.method === "GET" && request.url === "/about") {
    readFile("./public/pages/about.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  } else if (request.method === "GET" && request.url === "/diestyles") {
    readFile("./public/css/styles.css")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  } else if (request.method === "GET" && request.url === "/images/we.jpeg") {
    readFile("./public/images/we.jpeg")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  } else {
    readFile("./public/pages/error.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error!");
      });
  }
}); // server hat einen requestListener (auch Request-Handler genannt)

const PORT = 3003; // 1-65k (65535)  localhost:5500, react localhost:3000, vite localhost:5178
server.listen(PORT, () => console.log("server ready at port", PORT));
