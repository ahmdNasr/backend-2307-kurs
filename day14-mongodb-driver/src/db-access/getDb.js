import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL; // conenction url from mongodb atlas

const client = new MongoClient(url);

export function getDb() {
  return client.connect().then((connectedClient) => {
    const dbName = "rezepteDb";
    const db = connectedClient.db(dbName);
    return db;
  });
}
