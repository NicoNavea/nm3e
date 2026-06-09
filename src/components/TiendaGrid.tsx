"use client";
import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { useCartStore } from "@/store/cart";

interface Props {
  products: ShopifyProduct[];
  categories: string[];
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default function TiendaGrid({ products, categories }: Props) {
  const [active, setActive] = useState("all");
  const addItem = useCartStore((s) => s.addItem);

  const visible =
    active === "all"
      ? products
      : products.filter(
          (p) => p.productType.toLowerCase() === active.toLowerCase()
        );

  return (
    <>
      <div className="shop-filters rv">
        <button
          className={`f-btn${active === "all" ? " active" : ""}`}
          onClick={() => setActive("all")}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`f-btn${active === cat ? " active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="prod-grid">
        {visible.map((p) => {
          const image = p.images.edges[0]?.node;
          const price = p.priceRange.minVariantPrice;

          return (
            <div key={p.id} className="prod-card rv" data-cat={p.productType}>
              <div className="prod-img">
                {image ? (
                  <img
                    src={image.url}
                    alt={image.altText ?? p.title}
                    className="prod-photo"
                    loading="lazy"
                  />
                ) : (
                  <span className="prod-img-lbl">{p.title}</span>
                )}
                {p.productType && (
                  <span className="prod-badge">{p.productType}</span>
                )}
                <span className="prod-dot" />
              </div>
              <div className="prod-body">
                <h3 className="prod-name">{p.title}</h3>
                <p className="prod-desc">{p.description}</p>
                <div className="prod-foot">
                  <span className="prod-price">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>
                  <div className="prod-acts">
                    {p.availableForSale && (
                      <a href={`/productos/${p.handle}`} className="btn btn-ghost btn-sm">
                        Ver
                      </a>
                    )}
                    <button
                      className={`btn btn-acc btn-sm${!p.availableForSale ? " btn-disabled" : ""}`}
                      disabled={!p.availableForSale}
                      onClick={() => {
                        const variantId = p.variants.edges[0]?.node.id;
                        if (variantId) addItem(variantId);
                      }}
                    >
                      {p.availableForSale ? "+ Carro" : "Sin stock"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="shop-empty">No hay productos en esta categoría.</p>
      )}
    </>
  );
}
