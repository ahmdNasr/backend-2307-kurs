import { postOrder } from "../utils/api";
import { useShopState } from "../zustand";

const CartPage = () => {
  const { cart, clearCart } = useShopState();
  const handleOrderSubmit = async () => {
    await postOrder({products: cart})
    clearCart()
  };
  return (
    <div>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <button
        onClick={handleOrderSubmit}
        className="bg-green-700 text-white p-4 rounded-md shadow-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
