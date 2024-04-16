import express from "express";
import multer from "multer";
import fs from "fs";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.get("/", (req, res) => res.send("it works ;)"));

// START neue syntax:
const upload = multer(); // setup von der multer upload middlware
// upload.single("rezeptFoto") ===> middleware
// END neue syntax

app.post("/api/files/upload", upload.single("rezeptFoto"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  //   console.log(req.file.buffer.length);

  const fileName = Date.now() + "_" + req.file.originalname;
  const filePath = __dirname + "/uploads/" + fileName;
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) return res.status(500).json({ message: "Could not upload file" });
    // success
    res.json({ fileName });
  });
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at port", PORT));
