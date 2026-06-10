"use client";

import { useEffect, useState } from "react";
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

      const matchingCategory = categories.find(
        (category) => categorySlug(category) === hash
      );

      setActive(matchingCategory ?? "all");
    };

    selectCategoryFromHash();
    window.addEventListener("hashchange", selectCategoryFromHash);

    return () => {
      window.removeEventListener("hashchange", selectCategoryFromHash);
    };
  }, [categories]);

  const selectCategory = (category: string) => {
    setActive(category);

    const nextHash =
      category === "all" ? window.location.pathname : `#${categorySlug(category)}`;

    window.history.replaceState(null, "", nextHash);
  };

  const visible =
    active === "all"
      ? products
      : products.filter(
          (product) =>
            product.productType.toLowerCase() === active.toLowerCase()
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
            className={`f-btn${active === category ? " active" : ""}`}
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
