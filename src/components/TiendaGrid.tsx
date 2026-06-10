"use client";

import { useEffect, useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { useCartStore } from "@/store/cart";

interface Props {
  products: ShopifyProduct[];
  categories: string[];
}

const menuCategories = [
  "calidad-de-energia",
  "respaldo-energetico",
  "iluminacion",
  "monitoreo-energetico",
  "servicios",
];

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

function categorySlug(category: string) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TiendaGrid({ products, categories }: Props) {
  const [active, setActive] = useState("all");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const selectCategoryFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));

      if (!hash) {
        setActive("all");
        return;
      }

      setActive(menuCategories.includes(hash) ? hash : "all");
    };

    selectCategoryFromHash();
    window.addEventListener("hashchange", selectCategoryFromHash);

    return () => {
      window.removeEventListener("hashchange", selectCategoryFromHash);
    };
  }, []);

  const selectCategory = (category: string) => {
    const slug = category === "all" ? "all" : categorySlug(category);

    setActive(slug);

    const nextUrl =
      slug === "all"
        ? window.location.pathname
        : `${window.location.pathname}#${slug}`;

    window.history.replaceState(null, "", nextUrl);
  };

  const visible =
    active === "all"
      ? products
      : products.filter(
          (product) => categorySlug(product.productType) === active
        );

  return (
    <>
      <div className="shop-filters rv">
        <button
          className={`f-btn${active === "all" ? " active" : ""}`}
          onClick={() => selectCategory("all")}
        >
          Todos
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`f-btn${
              active === categorySlug(category) ? " active" : ""
            }`}
            onClick={() => selectCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="prod-grid">
        {visible.map((product) => {
          const image = product.images.edges[0]?.node;
          const price = product.priceRange.minVariantPrice;

          return (
            <div
              key={product.id}
              className="prod-card rv"
              data-cat={product.productType}
            >
              <div className="prod-img">
                {image ? (
                  <img
                    src={image.url}
                    alt={image.altText ?? product.title}
                    className="prod-photo"
                    loading="lazy"
                  />
                ) : (
                  <span className="prod-img-lbl">
                    {product.title}
                  </span>
                )}

                {product.productType && (
                  <span className="prod-badge">
                    {product.productType}
                  </span>
                )}

                <span className="prod-dot" />
              </div>

              <div className="prod-body">
                <h3 className="prod-name">{product.title}</h3>

                <p className="prod-desc">
                  {product.description}
                </p>

                <div className="prod-foot">
                  <span className="prod-price">
                    {formatPrice(price.amount, price.currencyCode)}
                  </span>

                  <div className="prod-acts">
                    {product.availableForSale && (
                      <a
                        href={`/productos/${product.handle}`}
                        className="btn btn-ghost btn-sm"
                      >
                        Ver
                      </a>
                    )}

                    <button
                      className={`btn btn-acc btn-sm${
                        !product.availableForSale
                          ? " btn-disabled"
                          : ""
                      }`}
                      disabled={!product.availableForSale}
                      onClick={() => {
                        const variantId =
                          product.variants.edges[0]?.node.id;

                        if (variantId) {
                          addItem(variantId);
                        }
                      }}
                    >
                      {product.availableForSale
                        ? "+ Carro"
                        : "Sin stock"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="shop-empty">
          No hay productos en esta categoría.
        </p>
      )}
    </>
  );
}
