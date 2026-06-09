# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript rules)
```

No test suite is configured yet.

## Architecture

Headless Shopify storefront built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and Zustand.

**Shopify integration** (`src/lib/shopify/`): two separate Storefront API clients are exported from `client.ts` — `storefrontClient` uses the public access token and is safe for `"use client"` components; `storefrontServerClient` uses the private access token and must only run in Server Components or Route Handlers. GROQ-style GraphQL queries live in `queries.ts`.

**State management** (`src/store/`): Zustand stores. `cart.ts` currently tracks cart open/close state and is the intended home for cart items and Shopify Cart ID.

**Path alias**: `@/*` resolves to `src/*`.

**Environment variables required**:
- `SHOPIFY_STORE_DOMAIN` — used by both clients
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — public token for browser client
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` — private token for server client

**Tailwind v4** is configured via `@tailwindcss/postcss` (PostCSS plugin), not the classic `tailwind.config.js` approach.
