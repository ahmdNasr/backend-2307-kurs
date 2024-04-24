import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL; // conenction url from mongodb atlas

const client = new MongoClient(url);

const recipeInfo = {
  name: "Kuchen mit Himbeer",
  personen: 2,
};

client
  .connect()
  .then((connectedClient) => {
    const dbName = "rezepteDb";
    const db = connectedClient.db(dbName);

    return db.collection("rezepte").insertOne(recipeInfo);
  })
  .then((result) => {
    if (result.acknowledged) {
      console.log({ ...recipeInfo, _id: result.insertedId });
    } else {
      console.log("fehler beim inserten, acknowledged ist hier false");
    }
  })
  .catch((err) => console.log(err))
  .finally(() => client.close());
