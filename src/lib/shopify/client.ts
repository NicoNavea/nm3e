import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || '';
const apiVersion = '2026-04';

// Cliente para componentes de navegador ("use client")
// Utiliza el token público (seguro para el frontend).
export const storefrontClient = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
});

// Cliente para Server Components y Route Handlers
// Utiliza el token privado que permite acceso a más features (metafields, menús, etc.).
// NUNCA debe usarse en componentes "use client".
export const storefrontServerClient = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  privateAccessToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || '',
});
