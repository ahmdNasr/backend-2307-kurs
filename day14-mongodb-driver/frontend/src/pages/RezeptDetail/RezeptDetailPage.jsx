import { useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { useParams } from "react-router-dom";
import Star from "../../components/Star";
import AddBewertungForm from "./AddBewertungForm";

const RezeptDetailPage = () => {
  const [rezept, setRezept] = useState(null);
  const [portionenCount, setPortionenCount] = useState(0);

  const { rezeptId } = useParams();

  console.log(rezept);

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/recipes/${rezeptId}`)
      .then((res) => res.json())
      .then((data) => {
        setRezept(data);
        setPortionenCount(data.portionen);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteRating(ratingId) {
    fetch(`${backendUrl}/api/v1/ratings/${ratingId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((deletedRating) => {
        setRezept({
          ...rezept,
          ratings: rezept.ratings.filter(
            (rating) => rating._id !== deletedRating._id
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!rezept) return <p>Loading...</p>;
  else
    return (
      <>
        <main>
          <h1>{rezept.name}</h1>
          <img
            src={`${backendUrl}/${rezept.bildUrl}`}
            alt="Rezept Cover"
            width={800}
          />
          <p>{rezept.anleitung}</p>

          <div>
            <button onClick={() => setPortionenCount(portionenCount - 1)}>
              -
            </button>
            <span style={{ fontWeight: "bold", margin: 4 }}>
              {portionenCount}
            </span>
            <button onClick={() => setPortionenCount(portionenCount + 1)}>
              +
            </button>
          </div>
          <ul style={{ width: 200 }}>
            {rezept.zutaten.map((zutat) => (
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 4,
                }}
              >
                <b>
                  {isNaN(zutat.menge)
                    ? ""
                    : (
                        (zutat.menge / rezept.portionen) *
                        portionenCount
                      ).toFixed(0)}
                  {zutat.einheit}
                </b>
                {zutat.zutat}
              </li>
            ))}
          </ul>

          <AddBewertungForm
            rezeptId={rezept._id}
            onRatingAdded={(addedRating) =>
              setRezept({
                ...rezept,
                ratings: [...rezept.ratings, addedRating],
              })
            }
          />

          <ul style={{}}>
            {rezept.ratings.map((rating) => (
              <li
                style={{
                  backgroundColor: "lightskyblue",
                  padding: 8,
                  margin: 4,
                  borderRadius: 6,
                  listStyleType: "none",
                }}
              >
                <span>
                  {Array.from(Array(rating.stars)).map(() => (
                    <Star />
                  ))}
                </span>
                <p>{rating.text}</p>
                <button onClick={() => deleteRating(rating._id)}>❌</button>
              </li>
            ))}
          </ul>
        </main>
      </>
    );
};

export default RezeptDetailPage;
