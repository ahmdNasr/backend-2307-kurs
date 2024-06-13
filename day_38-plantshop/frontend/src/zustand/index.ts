import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  firstname: string;
  isAdmin: boolean;
  isVerified: boolean;
  imageUrl: string;
}

interface CartEntry {
  productId: string;
  amount: number;
}

interface ShopState {
  user: User | null;
  cart: CartEntry[];
  setUser: (newUser: User) => void;
  addToCart: (productId: string) => void;
  clearCart: () => void;
}

export const useShopState = create<ShopState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      setUser: (newUser) => set({ user: newUser }),
      addToCart: (productId) => {
        // TODO: Logik so umschreiben dass wir keine Parameter mutieren
        set(({ cart }) => {
          const existingItem = cart.find((item)=>(item.productId === productId))
          if (existingItem) {
            existingItem.amount++
          } else {
            cart.push({productId, amount: 1})
          }
          return {cart}
          // return { cart: [...cart, { productId, amount: 1 }] };
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: "shopState" }
  )
);
