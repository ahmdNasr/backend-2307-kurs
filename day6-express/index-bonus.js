import express from "express";
import url from "url";
import path from "path";
import { readFile } from "./filesystem.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

// logging-middleware
app.use((req, res, next) => {
  console.log("new request", req.method, req.url);
  next();
});

// static file middleware (genau wie der generic file server von gestern day5)
app.use(express.static("public")); // static file server, exposed all available files in public folder
app.use(function supportPageNameRoutesStatic(req, res, next) {
  // support-/pageName-routes-middleware
  // /about --> /pages/about.html (CHECK)
  // /home --> /pages/home.html (CHECK)
  // /hugo --> /pages/hugo.html (X -> next)
  const filePath = __dirname + "/public/pages" + req.url + ".html";

  readFile(filePath)
    .then((dataBuffer) => {
      res.write(dataBuffer);
      res.end();
    })
    .catch(() => next()); // next um andere endpoints zu matchen
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/home.html");
});
// // GET /home --> auch home.html senden (wie bei GET /)
// app.get("/home", (req, res) => {
//   res.sendFile(__dirname + "/public/pages/home.html");
// });

app.get("/hallo", (req, res) => {
  res.write("Hallo zurück!");
  res.end();
});

app.patch("/hallo", (req, res) => {
  res.send("Hallo Ganz Oben!");
});

// "fallback-handler" for endpoints that do not match
app.use((_, res) => {
  res
    .status(404)
    .send(
      "<h1>404 Not found</h1><h3>Ooops, no endpoint matched your request</h3>"
    );
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at", PORT));
