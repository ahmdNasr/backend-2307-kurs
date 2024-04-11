import express from "express"; // const express = require("express");

const app = express(); // const server = http.createServer((request, response) => { /* Request handling happens here */})

app.get("/", (request, response) => {
  console.log("new request", request.method, request.url);
  response.write("it works :)");
  response.end();
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at", PORT));
