import { useState } from "react";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";

const AddRezeptePage = () => {
  const [name, setName] = useState("");
  const [anleitung, setAnleitung] = useState("");
  const [portionen, setPortionen] = useState(2);
  const [zutaten, setZutaten] = useState([]);

  // zutaten input states, wird verwendet um mehrere zutaten in das zutaten-state-array hinzuzufügen
  const [zutatMenge, setZutatMenge] = useState();
  const [zutatEinheit, setZutatEinheit] = useState("");
  const [zutatName, setZutatName] = useState("");

  console.log(zutatEinheit);

  const addCurrentZutat = (e) => {
    e.preventDefault();

    if (!zutatName) return;

    const neueZutat = {
      menge: zutatMenge,
      einheit: zutatEinheit,
      zutat: zutatName,
    };
    setZutaten([...zutaten, neueZutat]);
    // reset zutat inputs
    setZutatMenge("0");
    setZutatEinheit("");
    setZutatName("");
  };

  const addRezept = (e) => {
    e.preventDefault();

    fetch(`${backendUrl}/api/v1/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, anleitung, portionen, zutaten }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>RezepteHase Add</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <input
          style={{ fontSize: "larger" }}
          type="text"
          placeholder="Rezept Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={{ fontSize: "larger" }}
          type="text"
          placeholder="Anleitung"
          value={anleitung}
          onChange={(e) => setAnleitung(e.target.value)}
        />
        <input
          style={{ fontSize: "larger" }}
          type="number"
          placeholder="Portionen"
          value={portionen}
          onChange={(e) => setPortionen(e.target.value)}
          min={1}
        />
        <ul style={{ display: zutaten.length > 0 ? "block" : "none" }}>
          {zutaten.map((zutat) => (
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              <b>
                {zutat.menge}
                {zutat.einheit}
              </b>{" "}
              {zutat.zutat}
            </li>
          ))}
        </ul>
        <div
          style={{
            display: "flex",
            gap: 4,
            flexDirection: "row",
          }}
        >
          <input
            style={{ fontSize: "larger" }}
            type="number"
            placeholder="Menge"
            value={zutatMenge}
            onChange={(e) => setZutatMenge(e.target.value)}
            min={0}
          />
          <select
            style={{
              fontSize: "larger",
            }}
            onChange={(e) => setZutatEinheit(e.target.value)}
            value={zutatEinheit}
          >
            <option value="">-</option>
            <option value="g">Gram</option>
            <option value="ml">Milliliter</option>
            <option value="EL">EL</option>
            <option value="TL">TL</option>
          </select>
          <input
            style={{ fontSize: "larger" }}
            type="text"
            placeholder="Zutat"
            value={zutatName}
            onChange={(e) => setZutatName(e.target.value)}
          />
          <button onClick={addCurrentZutat}>+</button>
        </div>

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "larger",
            fontWeight: "bold",
          }}
          onClick={addRezept}
        >
          Add Rezept
        </button>
      </form>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </>
  );
};

/*
[
  {
    "name": "Couscous auf Rosenkohl",
    "anleitung": "einfach mixen und genießen",
    "portionen": 2,
    "zutaten": [
      {
        "menge": 300,
        "einheit": "g",
        "zutat": "Rosenkohl"
      },
      {
        "menge": 200,
        "einheit": "g",
        "zutat": "Couscous"
      },
      {
        "menge": 60,
        "einheit": "g",
        "zutat": "Walnüsse"
      },
      {
        "menge": 4,
        "einheit": "EL",
        "zutat": "Olivenöl"
      },
      {
        "menge": 250,
        "einheit": "ml",
        "zutat": "Wasser"
      }
    ]
  }
]
*/

export default AddRezeptePage;
