"use client";
import { useState } from "react";
import type { ShopifyProductDetail, ShopifyVariant } from "@/lib/shopify/types";
import { useCartStore } from "@/store/cart";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default function ProductoDetalle({ product }: { product: ShopifyProductDetail }) {
  const variants = product.variants.edges.map((e) => e.node);
  const images = product.images.edges.map((e) => e.node);

  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(variants[0]);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, isLoading } = useCartStore();

  const hasVariantChoice = variants.length > 1 || variants[0]?.title !== "Default Title";
  const price = selectedVariant
    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : formatPrice(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode
    );

  return (
    <div className="pd-wrap">
      {/* Galería */}
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
            {images.map((img, i) => (
              <button
                key={i}
                className={`pd-thumb${activeImage === i ? " active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img.url} alt={img.altText ?? `${product.title} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pd-info">
        {product.productType && (
          <span className="pd-badge">{product.productType}</span>
        )}
        <h1 className="pd-title">{product.title}</h1>
        <p className="pd-price">{price}</p>
        <p className="pd-desc">{product.description}</p>

        {hasVariantChoice && (
          <div className="pd-variants">
            <p className="pd-variants-label">Variante</p>
            <div className="pd-variants-grid">
              {variants.map((v) => (
                <button
                  key={v.id}
                  className={`pd-var-btn${selectedVariant?.id === v.id ? " active" : ""}${!v.availableForSale ? " disabled" : ""}`}
                  onClick={() => v.availableForSale && setSelectedVariant(v)}
                  disabled={!v.availableForSale}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pd-actions">
          <button
            className="btn btn-cyan btn-lg"
            disabled={!selectedVariant?.availableForSale || isLoading}
            onClick={() => selectedVariant && addItem(selectedVariant.id)}
          >
            {isLoading ? "Agregando…" : selectedVariant?.availableForSale ? "Agregar al carro" : "Sin stock"}
          </button>
        </div>

        {product.tags.length > 0 && (
          <div className="pd-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="pd-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
