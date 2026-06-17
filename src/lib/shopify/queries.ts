export const getProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 8) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const cartFragment = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    attributes {
      key
      value
    }
    cost {
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                images(first: 1) {
                  edges { node { url altText } }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`;

const userErrorsFragment = `
  userErrors { field message }
`;

export const cartCreateMutation = `
  ${cartFragment}
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const cartLinesAddMutation = `
  ${cartFragment}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const cartLinesUpdateMutation = `
  ${cartFragment}
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const cartLinesRemoveMutation = `
  ${cartFragment}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const cartAttributesUpdateMutation = `
  ${cartFragment}
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const cartBuyerIdentityUpdateMutation = `
  ${cartFragment}
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { ...CartFields }
      ${userErrorsFragment}
    }
  }
`;

export const getCartQuery = `
  ${cartFragment}
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

export const getProductsQuery = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          availableForSale
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;


