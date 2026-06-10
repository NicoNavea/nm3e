import { storefrontServerClient } from "@/lib/shopify/server-client";
import { getProductsQuery } from "@/lib/shopify/queries";
import type { ShopifyProduct } from "@/lib/shopify/types";
import TiendaGrid from "./TiendaGrid";

async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const { data, errors } = await storefrontServerClient.request(
      getProductsQuery,
      { variables: { first: 24 } }
    );

    if (errors || !data) return [];

    return (data.products.edges as { node: ShopifyProduct }[]).map(
      (edge) => edge.node
    );
  } catch {
    return [];
  }
}

export default async function Tienda() {
  const products = await getProducts();

  const categories = Array.from(
    new Set(products.map((product) => product.productType).filter(Boolean))
  );

  return (
    <section id="tienda" className="section">
      <div className="inner">
        <div className="shop-hd">
          <div>
            <p className="s-label rv">Equipamiento Profesional</p>
            <h2 className="s-title rv">Tienda</h2>
            <p
              className="s-body rv"
              style={{ maxWidth: 460, marginTop: 10 }}
            >
              Equipos certificados para diagnóstico, protección y monitoreo de
              instalaciones eléctricas industriales. Despacho a todo Chile.
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <TiendaGrid products={products} categories={categories} />
        ) : (
          <p className="shop-empty rv">
            No se pudieron cargar los productos. Intenta más tarde.
          </p>
        )}
      </div>
    </section>
  );
}
