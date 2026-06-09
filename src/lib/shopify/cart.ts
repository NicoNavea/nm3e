import { storefrontClient } from './client';
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesUpdateMutation,
  cartLinesRemoveMutation,
  getCartQuery,
} from './queries';
import type { ShopifyCart, CartItem } from './types';

function throwIfUserErrors(userErrors?: { field: string[] | null; message: string }[]) {
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '));
  }
}

function normalizeCart(cart: ShopifyCart): {
  cartId: string;
  cartUrl: string;
  totalQuantity: number;
  total: string;
  currencyCode: string;
  items: CartItem[];
} {
  return {
    cartId: cart.id,
    cartUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    total: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
    items: cart.lines.edges.map(({ node }) => ({
      lineId: node.id,
      variantId: node.merchandise.id,
      quantity: node.quantity,
      title: node.merchandise.title,
      productTitle: node.merchandise.product.title,
      handle: node.merchandise.product.handle,
      image: node.merchandise.product.images.edges[0]?.node.url ?? '',
      imageAlt: node.merchandise.product.images.edges[0]?.node.altText ?? null,
      price: node.cost.totalAmount.amount,
      currencyCode: node.cost.totalAmount.currencyCode,
    })),
  };
}

export async function createCart(variantId: string, quantity = 1) {
  const { data, errors } = await storefrontClient.request(cartCreateMutation, {
    variables: { lines: [{ merchandiseId: variantId, quantity }] },
  });
  if (errors) throw new Error(errors.message ?? 'cartCreate failed');
  const result = data as { cartCreate: { cart: ShopifyCart; userErrors: { field: string[] | null; message: string }[] } };
  throwIfUserErrors(result.cartCreate.userErrors);
  return normalizeCart(result.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const { data, errors } = await storefrontClient.request(cartLinesAddMutation, {
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  });
  if (errors) throw new Error(errors.message ?? 'cartLinesAdd failed');
  const result = data as { cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string[] | null; message: string }[] } };
  throwIfUserErrors(result.cartLinesAdd.userErrors);
  return normalizeCart(result.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const { data, errors } = await storefrontClient.request(cartLinesUpdateMutation, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  if (errors) throw new Error(errors.message ?? 'cartLinesUpdate failed');
  const result = data as { cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string[] | null; message: string }[] } };
  throwIfUserErrors(result.cartLinesUpdate.userErrors);
  return normalizeCart(result.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string) {
  const { data, errors } = await storefrontClient.request(cartLinesRemoveMutation, {
    variables: { cartId, lineIds: [lineId] },
  });
  if (errors) throw new Error(errors.message ?? 'cartLinesRemove failed');
  const result = data as { cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string[] | null; message: string }[] } };
  throwIfUserErrors(result.cartLinesRemove.userErrors);
  return normalizeCart(result.cartLinesRemove.cart);
}

export async function fetchCart(cartId: string) {
  const { data, errors } = await storefrontClient.request(getCartQuery, {
    variables: { cartId },
  });
  if (errors) throw new Error(errors.message ?? 'getCart failed');
  const cart = (data as { cart: ShopifyCart | null }).cart;
  if (!cart) return null;
  return normalizeCart(cart);
}
