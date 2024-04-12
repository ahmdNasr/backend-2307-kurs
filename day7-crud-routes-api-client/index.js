import express from "express";
import { readTransactions, writeTransactions } from "./filesystem.js";

const app = express();

app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

// ressourcen werden im body versendet
// der body einer request muss geparsed werden, um auf seinen Inhalt zu greifen
// dazu verwenden wir einen Body-Parser (zB: express.json())
// express.json() ist ein body-parser-middleware von express der json inhalte parsed
//  --> req { body: undefined } ==> [ express.json() body parser middleware ] next() ==> req { body: {<Wert aus der Http-Request>} }
app.use(express.json()); // express.json() ist eine middleware (dh sie ruft .next() nach dem parsen auf)

app.get("/api/v1/transactions", (_, res) => {
  // read transactions.json file
  // parse content to js-array
  // send to client (json)
  readTransactions()
    .then((transactions) => res.status(200).json(transactions)) // .json wandelt das übergebene Objekt in eine json String um (durch JSON.stringify)
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read all transactions" })
    );
});

app.get("/api/v1/transactions/:id", (req, res) => {
  const transactionId = req.params.id; // in der route gibt es einen route-parameter .../:id
  readTransactions()
    .then((transactions) =>
      transactions.find((t) => t.id.toString() === transactionId)
    )
    .then((foundTransaction) => res.status(200).json(foundTransaction))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read transaction" })
    );
});

app.post("/api/v1/transactions", (req, res) => {
  // readTransactions()
  // -> transactions [<old transaction>]
  // -> transactions [...<old transaction>, newTransaction] // "add new element"
  // -> writeTransactions(new-array) // save to file
  // -> send to client
  const newTransaction = {
    id: Date.now(), // Bonus/Übung: Implement Auto-Increment id (letzte id + 1)
    timestamp: Date.now(),
    type: req.body.type,
    description: req.body.description,
    amount: req.body.amount,
  };
  readTransactions()
    .then((transactions) => [...transactions, newTransaction])
    .then((transactionsWithNew) => writeTransactions(transactionsWithNew))
    .then((transactionsWithNew) => res.status(200).json(transactionsWithNew))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not add new transaction" })
    );
});

app.patch("/api/v1/transactions/:id", (req, res) => {
  // readTransactions()
  // -> transactions [<old transaction>]
  // -> transactions [...<old transaction>].filter( not the one to be deleted by given id ) // "remove element"
  // -> writeTransactions(new-array) // save to file
  // -> send to client
  const transactionIdToUpdate = req.params.id;
  const updateInfo = req.body; // request body { amount?, description?, type? }
  readTransactions()
    .then((transactions) =>
      transactions.map((currentTransaction) => {
        if (currentTransaction.id.toString() === transactionIdToUpdate) {
          // update transaction
          return {
            ...currentTransaction,
            ...updateInfo,
          }; // overwrite currentTransaction (to be updated) with updateInfo
        } else {
          return currentTransaction; // leave non-target transactions unmodified
        }
      })
    )
    .then((transactions) => writeTransactions(transactions)) // transactions sind hier ALLE aber OHNE der gelöschten transaction
    .then((transactions) => res.status(200).json(transactions))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not remove transaction" })
    );
});

app.delete("/api/v1/transactions/:id", (req, res) => {
  // readTransactions()
  // -> transactions [<old transaction>]
  // -> transactions [...<old transaction>].filter( not the one to be deleted by given id ) // "remove element"
  // -> writeTransactions(new-array) // save to file
  // -> send to client
  const transactionIdToDelete = req.params.id;
  readTransactions()
    .then((transactions) =>
      transactions.filter((t) => t.id.toString() !== transactionIdToDelete)
    )
    .then((transactions) => writeTransactions(transactions)) // transactions sind hier ALLE aber OHNE der gelöschten transaction
    .then((transactions) => res.status(200).json(transactions))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not remove transaction" })
    );
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at port", PORT));

// Status-Codes (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)
// 2__ (eg 200 OK, 201 Created) ===> Success
// 3__ (304 Not Modified) ==> Redirection
// 4__ (eg 400 Bad Request, 401 Unauthorized, 404 Not Found) ===> Client Error
// 5__ (eg 500 Internal Server Error) ===> Server Error
