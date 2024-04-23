import { ObjectId } from "mongodb";
import { getDb } from "./getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("rezepte").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) =>
    db.collection("rezepte").findOne({ _id: idAsObjectId })
  );
}

// createOne({ name: "Kuchen ", }).then(documentMitId => res.json(documentMitId))) // { name: "Kuchen ", _id: ObjectId }
function createOne(documentInfo) {
  return getDb()
    .then((db) => db.collection("rezepte").insertOne(documentInfo)) // { acknowledged: true, insertedId: ObjectId("...") }
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
        .collection("rezepte")
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
    db.collection("rezepte").findOneAndDelete({ _id: idAsObjectId })
  );
  // .then((removedDoc) => {
  //   if (removedDoc) return removedDoc;
  //   else throw new Error("Could not delete document");
  // });
}

export const RezepteDAO = {
  findAll,
  findById,
  createOne,
  updateOne,
  deleteOne,
};
