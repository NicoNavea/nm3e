"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.getState().hydrateCart();
  }, []);

  return <>{children}</>;
}
