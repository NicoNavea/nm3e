import { articles } from "@/lib/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — NM3E`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <CustomCursor />
      <div className="art-wrap">
        <header className="art-topbar">
          <Link href="/" className="art-topbar-logo">
            <Image
              src="/uploads/logo-white.png"
              alt="NM3E"
              width={120}
              height={33}
              priority
            />
          </Link>
          <Link href="/#blog" className="art-back">
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
            Volver al blog
          </Link>
        </header>

        <div className="art-hero">
          <div className="art-hero-meta">
            <span className="art-tag">{article.tag}</span>
            <span className="art-sep" />
            <span className="art-date">{article.date}</span>
            <span className="art-sep" />
            <span className="art-read">{article.readTime} de lectura</span>
          </div>
          <h1 className="art-title">{article.title}</h1>
          <p className="art-lead">{article.excerpt}</p>
        </div>

        <hr className="art-divider" />

        <article className="art-content">
          {article.content.map((block, i) => {
            if (block.type === "p") return <p key={i}>{block.text}</p>;
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "callout")
              return (
                <blockquote key={i} className="art-callout">
                  {block.text}
                </blockquote>
              );
            if (block.type === "ul")
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            return null;
          })}
        </article>

        <section className="art-cta">
          <p className="art-cta-label">¿Tienes este problema?</p>
          <h2 className="art-cta-title">Solicita un diagnóstico profesional</h2>
          <p className="art-cta-sub">
            Nuestro equipo mide, analiza y entrega un informe con
            recomendaciones concretas. Sin compromiso.
          </p>
          <a href="/#contacto" className="btn btn-cyan btn-lg">
            Contactar ahora
          </a>
        </section>

        <footer className="art-foot">
          <span className="art-foot-copy">
            © 2025 NM3E — Calidad de Energía Eléctrica
          </span>
          <Link href="/" className="art-back">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </>
  );
}
