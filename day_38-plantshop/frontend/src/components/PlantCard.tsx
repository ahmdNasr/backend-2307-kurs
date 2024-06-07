import { useShopState } from "../zustand";

interface PlantCardProps {
  plant: { _id: string, title: string; price: number};
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { title, price, _id } = plant;
  const {addToCart} = useShopState()
  
  return (
    <div className="p-2 shadow-md max-w-56 mb-4">
      <h3>{title}</h3>
      <p>{price} EUR</p>
      <button onClick={()=>{addToCart(_id)}} className="bg-green-600 text-white p-1">Add to Cart</button>
    </div>
  );
};

export default PlantCard;
