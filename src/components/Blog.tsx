import Link from "next/link";
import { articles } from "@/lib/articles";

export default function Blog() {
  return (
    <section id="blog" className="section" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <p className="s-label rv">Blog</p>
        <h2 className="s-title rv">Últimos Artículos</h2>

        <div className="blog-grid">
          {articles.map((a, i) => (
            <article
              key={i}
              className="blog-card rv"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="blog-meta">
                <span className="blog-tag">{a.tag}</span>
                <span className="blog-date">{a.date}</span>
              </div>
              <h3 className="blog-t">{a.title}</h3>
              <p className="blog-b">{a.excerpt}</p>
              <Link href={`/articulos/${a.slug}`} className="blog-more">
                Leer artículo
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
