"use client";

import { useState } from "react";
import type {
  ShopifyProductDetail,
  ShopifyVariant,
} from "@/lib/shopify/types";
import { useCartStore } from "@/store/cart";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function ProductoDetalle({
  product,
}: {
  product: ShopifyProductDetail;
}) {
  const variants = product.variants.edges.map((edge) => edge.node);
  const images = product.images.edges.map((edge) => edge.node);

  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyVariant>(variants[0]);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, isLoading } = useCartStore();

  const isQuoteOnly = product.tags.some(
    (tag) => normalizeText(tag) === "solo cotizacion"
  );

  const hasVariantChoice =
    variants.length > 1 ||
    variants[0]?.title !== "Default Title";

  const price = selectedVariant
    ? formatPrice(
        selectedVariant.price.amount,
        selectedVariant.price.currencyCode
      )
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      );

  return (
    <div className="pd-wrap">
      <div className="pd-gallery">
        <div className="pd-img-main">
          {images[activeImage] ? (
            <img
              src={images[activeImage].url}
              alt={images[activeImage].altText ?? product.title}
            />
          ) : (
            <div className="pd-img-placeholder">
              <span>{product.title}</span>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="pd-thumbs">
            {images.map((image, index) => (
              <button
                key={index}
                className={`pd-thumb${
                  activeImage === index ? " active" : ""
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img
                  src={image.url}
                  alt={
                    image.altText ??
                    `${product.title} ${index + 1}`
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pd-info">
        {product.productType && (
          <span className="pd-badge">
            {product.productType}
          </span>
        )}

        <h1 className="pd-title">{product.title}</h1>

        {selectedVariant?.sku && (
          <p className="pd-sku">
            SKU: {selectedVariant.sku}
          </p>
        )}

        {!isQuoteOnly && (
          <p className="pd-price">{price}</p>
        )}

        <p className="pd-desc">{product.description}</p>

        {hasVariantChoice && (
          <div className="pd-variants">
            <p className="pd-variants-label">Variante</p>

            <div className="pd-variants-grid">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`pd-var-btn${
                    selectedVariant?.id === variant.id
                      ? " active"
                      : ""
                  }${
                    !variant.availableForSale && !isQuoteOnly
                      ? " disabled"
                      : ""
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={
                    !variant.availableForSale && !isQuoteOnly
                  }
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pd-actions">
          {isQuoteOnly ? (
            <a
              href={`/?producto=${encodeURIComponent(
                product.title
              )}#contacto`}
              className="btn btn-cyan btn-lg"
            >
              Solicitar cotización
            </a>
          ) : (
            <button
              className="btn btn-cyan btn-lg"
              disabled={
                !selectedVariant?.availableForSale || isLoading
              }
              onClick={() => {
                if (selectedVariant) {
                  addItem(selectedVariant.id);
                }
              }}
            >
              {isLoading
                ? "Agregando…"
                : selectedVariant?.availableForSale
                  ? "Agregar al carro"
                  : "Sin stock"}
            </button>
          )}
        </div>

        {product.tags.length > 0 && (
          <div className="pd-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="pd-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

