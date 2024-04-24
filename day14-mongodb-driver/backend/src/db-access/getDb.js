import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL; // conenction url from mongodb atlas

const client = new MongoClient(url);

// singleton (nach dem singleton pattern (unterthema design patterns))
let dbRef = null; // die datenbank zu der wir uns verbinden werden (über client)

export function getDb() {
  return new Promise((resolve, reject) => {
    if (dbRef) {
      return resolve(dbRef);
    }
    // noch nicht verbunden...
    client
      .connect()
      .then((connectedClient) => {
        const dbName = "rezepteDb";
        const db = connectedClient.db(dbName);
        dbRef = db; // datenbank referenz zwischenspeichern, damit wir beim nächsten aufruf von getDb direkt in das if gelangen!!!
        resolve(db);
      })
      .catch((err) => reject(err));
  });
}
