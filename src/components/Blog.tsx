const articles = [
  {
    date: "Junio 2025",
    tag: "Calidad de Energía",
    title: "Armónicos en redes industriales: qué son y por qué importan",
    excerpt:
      "Las distorsiones armónicas pueden elevar el consumo energético hasta un 30% sin que lo notes. Conoce cómo identificarlas antes de que provoquen fallas graves en tus equipos.",
  },
  {
    date: "Mayo 2025",
    tag: "Eficiencia",
    title: "Cómo el factor de potencia afecta tu factura eléctrica",
    excerpt:
      "Un factor de potencia bajo no solo genera multas en tu tarifa: sobrecalienta transformadores y reduce la vida útil de tus equipos. Te explicamos cómo corregirlo paso a paso.",
  },
  {
    date: "Abril 2025",
    tag: "Mantenimiento",
    title: "5 señales de alerta en una instalación eléctrica industrial",
    excerpt:
      "Desde disyuntores que saltan con frecuencia hasta iluminación inestable: estas señales indican que tu sistema eléctrico necesita diagnóstico urgente antes de la próxima parada.",
  },
];

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
              <a href="#blog" className="blog-more">
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
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
