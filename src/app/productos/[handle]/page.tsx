import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import ProductoDetalle from "@/components/ProductoDetalle";
import { storefrontServerClient } from "@/lib/shopify/server-client";
import { getProductByHandleQuery } from "@/lib/shopify/queries";
import type { ShopifyProductDetail } from "@/lib/shopify/types";
import type { Metadata } from "next";

type Props = { params: Promise<{ handle: string }> };

async function getProduct(handle: string): Promise<ShopifyProductDetail | null> {
  try {
    const { data, errors } = await storefrontServerClient.request(
      getProductByHandleQuery,
      { variables: { handle } }
    );
    if (errors || !data?.product) return null;
    return data.product as ShopifyProductDetail;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: `${product.title} — NM3E`,
    description: product.description.slice(0, 160),
  };
}

export const revalidate = 3600;

export default async function ProductoPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <CustomCursor />
      <div className="pd-page">
        <header className="art-topbar">
          <Link href="/" className="art-topbar-logo">
            <Image
              src="/uploads/logo-dark.png"
              className="logo-img-light"
              alt="NM3E"
              width={120}
              height={33}
              priority
            />
            <Image
              src="/uploads/logo-white.png"
              className="logo-img-dark"
              alt="NM3E"
              width={120}
              height={33}
              priority
            />
          </Link>
          <Link href="/tienda" className="art-back">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a la tienda
          </Link>
        </header>

        <main className="pd-main">
          <ProductoDetalle product={product} />
        </main>

        <footer className="art-foot">
          <span className="art-foot-copy">© 2025 NM3E — Calidad de Energía Eléctrica</span>
          <Link href="/tienda" className="art-back">Volver a la tienda</Link>
        </footer>
      </div>
    </>
  );
}
