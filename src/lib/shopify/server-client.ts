import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Solo para Server Components y Route Handlers — NUNCA importar desde "use client".
export const storefrontServerClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2026-04',
  privateAccessToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
});
