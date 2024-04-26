import { useState } from "react";
import Star from "../../components/Star";
import { backendUrl } from "../../api/api";

const AddBewertungForm = ({ rezeptId, onRatingAdded }) => {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");

  const addRating = (e) => {
    e.preventDefault();

    fetch(`${backendUrl}/api/v1/recipes/${rezeptId}/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars, text }),
    })
      .then((res) => res.json())
      .then((data) => {
        onRatingAdded(data); // data ist hier die hinzugefügte bewertung
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form>
      <Star disabled={stars < 1} onClick={() => setStars(1)} />
      <Star disabled={stars < 2} onClick={() => setStars(2)} />
      <Star disabled={stars < 3} onClick={() => setStars(3)} />
      <Star disabled={stars < 4} onClick={() => setStars(4)} />
      <Star disabled={stars < 5} onClick={() => setStars(5)} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ fontSize: "larger" }}
      />

      <button onClick={addRating}>Add Rating</button>
    </form>
  );
};

export default AddBewertungForm;
