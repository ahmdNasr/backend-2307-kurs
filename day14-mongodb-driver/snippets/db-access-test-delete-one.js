import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL; // conenction url from mongodb atlas

const client = new MongoClient(url);

const recipeInfo = {
  name: "Kuchen mit Himbeer 2",
  personen: 2,
};

client
  .connect()
  .then((connectedClient) => {
    const dbName = "rezepteDb";
    const db = connectedClient.db(dbName);

    return db.collection("rezepte").deleteOne({
      _id: ObjectId.createFromHexString("662769c1a4c170e9c5c18f18"),
    });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err))
  .finally(() => client.close());
