export interface CartLineItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      images: {
        edges: {
          node: { url: string; altText: string | null };
        }[];
      };
    };
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: { node: CartLineItem }[] };
}

export interface CartItem {
  lineId: string;
  variantId: string;
  quantity: number;
  title: string;
  productTitle: string;
  handle: string;
  image: string;
  imageAlt: string | null;
  price: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface ShopifyProductDetail {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: { url: string; altText: string | null };
    }[];
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: { url: string; altText: string | null };
    }[];
  };
  variants: {
    edges: {
      node: { id: string; availableForSale: boolean };
    }[];
  };
}

