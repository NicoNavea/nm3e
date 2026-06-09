import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Cliente seguro para "use client" — usa token público.
export const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2026-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});
