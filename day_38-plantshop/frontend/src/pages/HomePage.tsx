import { useEffect, useState } from "react";
import { getPlants } from "../utils/sanity";
import PlantCard from "../components/PlantCard";
import { useShopState } from "../zustand";

const HomePage = () => {
  const { cart, clearCart } = useShopState();
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    const fetchPlants = async () => {
      const plants = await getPlants();
      setPlants(plants);
    };
    fetchPlants();
  }, []);

  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <br />
      <br />

      <div>
        {plants.map((plant) => (
          <PlantCard plant={plant} />
        ))}
      </div>
      <br />
      <button className="p-2 text-white bg-red-500" onClick={clearCart}>Clear Cart</button>
      <br />
      <br />
      <br />
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
