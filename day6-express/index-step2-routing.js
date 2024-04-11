import express from "express"; // const express = require("express");

// Thema: Routing bei Express -> Packet Von Oben nach Unten
// Beispiel: Request-Packet: [[header: { method: "GET", url: "/hallo" }, body: <empty>]]

const app = express(); // const server = http.createServer((request, response) => { /* Request handling happens here */})

app.patch("/hallo", (req, res) => {
  console.log("new request", req.method, req.url);
  res.send("Hallo Ganz Oben!");
});

app.get("/", (req, res) => {
  console.log("new request", req.method, req.url);
  res.send("it works :)");
});

app.get("/hallo", (req, res) => {
  console.log("new request", req.method, req.url);
  res.send("Hallo zurück!");
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at", PORT));
