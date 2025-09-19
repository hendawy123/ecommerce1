"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import getLogedUser from "@/cartActions/getUserCart.Action";
import { cartType } from "@/type/cartType";

interface CartContextType {
  cart: cartType | null;
  setCart: React.Dispatch<React.SetStateAction<cartType | null>>;
  refreshCart: () => Promise<void>;
}

// ✅ Context
export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<cartType | null>(null);

  async function getUserCart() {
    try {
      const res = await getLogedUser();
      setCart(res);
      console.log("Cart from API:", res);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  async function refreshCart() {
    await getUserCart();
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ✅ Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
