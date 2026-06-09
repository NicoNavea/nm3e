import { create } from 'zustand';

interface CartState {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // TODO: Agregar productos del carrito y Cart ID de Shopify aquí
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));
