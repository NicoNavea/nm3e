import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/lib/shopify/types';
import {
  createCart,
  addToCart,
  updateCartLine,
  removeCartLine,
  fetchCart,
  updateCheckoutDetails,
  type CheckoutDetails,
} from '@/lib/shopify/cart';

interface CartState {
  cartId: string | null;
  cartUrl: string | null;
  items: CartItem[];
  totalQuantity: number;
  total: string;
  currencyCode: string;
  isOpen: boolean;
  isLoading: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  hydrateCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  saveCheckoutDetails: (details: CheckoutDetails) => Promise<void>;
}

function applyCartUpdate(
  set: (partial: Partial<CartState>) => void,
  result: Awaited<ReturnType<typeof fetchCart>>
) {
  if (!result) return;
  set({
    cartId: result.cartId,
    cartUrl: result.cartUrl,
    items: result.items,
    totalQuantity: result.totalQuantity,
    total: result.total,
    currencyCode: result.currencyCode,
  });
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cartUrl: null,
      items: [],
      totalQuantity: 0,
      total: '0',
      currencyCode: 'CLP',
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      hydrateCart: async () => {
        const { cartId } = get();
        if (!cartId) return;
        const result = await fetchCart(cartId);
        if (!result) {
          set({
            cartId: null,
            cartUrl: null,
            items: [],
            totalQuantity: 0,
            total: '0',
          });
          return;
        }
        applyCartUpdate(set, result);
      },

      addItem: async (variantId, quantity = 1) => {
        set({ isLoading: true });
        try {
          const { cartId } = get();
          const result = cartId
            ? await addToCart(cartId, variantId, quantity)
            : await createCart(variantId, quantity);
          applyCartUpdate(set, result);
          set({ isOpen: true });
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const result = await updateCartLine(cartId, lineId, quantity);
          applyCartUpdate(set, result);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId) => {
        const { cartId } = get();
        if (!cartId) return;
        set({ isLoading: true });
        try {
          const result = await removeCartLine(cartId, lineId);
          applyCartUpdate(set, result);
        } finally {
          set({ isLoading: false });
        }
      },

      saveCheckoutDetails: async (details) => {
        const { cartId } = get();
        if (!cartId) throw new Error('No hay carrito activo');
        set({ isLoading: true });
        try {
          const result = await updateCheckoutDetails(cartId, details);
          applyCartUpdate(set, result);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'nm3e-cart',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);
