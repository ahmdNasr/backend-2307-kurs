import express from "express"; // const express = require("express");

// Thema: Routing bei Express -> Packet Von Oben nach Unten
// Beispiel: Request-Packet: [[header: { method: "GET", url: "/hallo" }, body: <empty>]]

const app = express(); // const server = http.createServer((request, response) => { /* Request handling happens here */})

// middleware = request handler, der aber nach einer Verarbeitung weiter-gibt (next)
app.use((req, res, next) => {
  console.log("new request", req.method, req.url);
  // res.write("Zwischenverarbeitung\n");
  next();
});

// Request-Packet: [[header: { method: "GET", url: "/hallo" }, body: <empty>]]
app.patch("/hallo", (req, res) => {
  res.send("Hallo Ganz Oben!");
});

app.get("/", (req, res) => {
  res.send("it works :)");
});

app.get("/hallo", (req, res) => {
  res.write("Hallo zurück!");
  res.end();
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at", PORT));
