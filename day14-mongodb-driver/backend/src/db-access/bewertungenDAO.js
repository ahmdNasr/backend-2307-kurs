import { ObjectId } from "mongodb";
import { getDb } from "./getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("bewertungen").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) =>
    db.collection("bewertungen").findOne({ _id: idAsObjectId })
  );
}

// createOne({ name: "Kuchen ", }).then(documentMitId => res.json(documentMitId))) // { name: "Kuchen ", _id: ObjectId }
function createOne(documentInfo) {
  return getDb()
    .then((db) => db.collection("bewertungen").insertOne(documentInfo)) // { acknowledged: true, insertedId: ObjectId("...") }
    .then(
      (result) =>
        result.acknowledged ? { ...documentInfo, _id: result.insertedId } : null // kopie com dokumnt mit _id (===> gleicher wert wie in der datenbank)
    );
}

function updateOne(id, updateInfo) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb()
    .then((db) =>
      db
        .collection("bewertungen")
        .updateOne({ _id: idAsObjectId }, { $set: updateInfo })
    )
    .then((result) => {
      if (result.acknowledged && result.modifiedCount === 1)
        return findById(id); // dokument nach dem update
      else return null;
    });
}
// result von updateOne : {
//   acknowledged: true,
//   modifiedCount: 1,
//   upsertedId: null,
//   upsertedCount: 0,
//   matchedCount: 1,
// };

function deleteOne(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) =>
    db.collection("bewertungen").findOneAndDelete({ _id: idAsObjectId })
  );
}

function findByRecipe(recipeId) {
  const recipeIdAsObjectId = ObjectId.createFromHexString(recipeId);
  return getDb().then((db) =>
    db
      .collection("bewertungen")
      .find({ recipeId: recipeIdAsObjectId })
      .toArray()
  );
}

// DAO = Data Access Object (also ein Objekt mit funktionen um auf die Daten zu greifen)
export const BewertungenDAO = {
  findAll,
  findById,
  createOne,
  updateOne,
  deleteOne,
  // extras zu den basic CRUDs
  findByRecipe,
};
