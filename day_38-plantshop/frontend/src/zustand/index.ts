import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  firstname: string;
  isAdmin: boolean;
  isVerified: boolean;
}

interface ShopState {
  user: User | null;
  // cart: any[]
  setUser: (newUser: User) => void;
}

export const useShopState = create<ShopState>()(
  persist((set) => ({
    user: null,
    // cart: [],
    setUser: (newUser) => set({ user: newUser }),
  }), {name: "shopState"})
);
