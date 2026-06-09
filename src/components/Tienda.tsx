"use client";
import { useState } from "react";

type Filter = "all" | "analizadores" | "ups" | "filtros";

const products = [
  {
    id: "nm3e-pq3000",
    cat: "analizadores" as Filter,
    name: "Analizador PQ3000",
    badge: "Analizadores",
    imgLabel: "Analizador de red",
    desc: "Análisis completo de armónicos, potencia y calidad de señal en tiempo real. Certificado IEC 61000-4-30 Clase A.",
    price: "$1.850",
    delay: "0s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="3" y="6" width="46" height="36" rx="2"/>
        <polyline points="10,34 18,22 26,28 34,14 42,22"/>
        <circle cx="10" cy="34" r="2" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="22" r="2" fill="currentColor" stroke="none"/>
        <circle cx="26" cy="28" r="2" fill="currentColor" stroke="none"/>
        <circle cx="34" cy="14" r="2" fill="currentColor" stroke="none"/>
        <circle cx="42" cy="22" r="2" fill="currentColor" stroke="none"/>
        <line x1="20" y1="46" x2="32" y2="46"/><line x1="26" y1="42" x2="26" y2="46"/>
      </svg>
    ),
  },
  {
    id: "nm3e-re400",
    cat: "analizadores" as Filter,
    name: "Registrador RE-400",
    badge: "Analizadores",
    imgLabel: "Registrador de energía",
    desc: "Registro continuo de parámetros eléctricos para auditorías energéticas. Almacenamiento SD y envío remoto integrado.",
    price: "$890",
    delay: ".08s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="8" y="3" width="36" height="46" rx="2"/>
        <line x1="15" y1="14" x2="37" y2="14"/><line x1="15" y1="21" x2="37" y2="21"/>
        <line x1="15" y1="28" x2="28" y2="28"/>
        <circle cx="37" cy="39" r="8" strokeWidth="1.2"/>
        <polyline points="33,39 36,42 42,36" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    id: "nm3e-ups10kva",
    cat: "ups" as Filter,
    name: "UPS Trifásico 10 kVA",
    badge: "UPS",
    imgLabel: "UPS industrial trifásico",
    desc: "Conmutación <4 ms con 30 min de autonomía. Diseñado para sistemas industriales críticos trifásicos.",
    price: "$3.200",
    delay: ".16s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="7" y="8" width="38" height="28" rx="2"/>
        <rect x="11" y="38" width="30" height="6" rx="1"/>
        <line x1="19" y1="44" x2="19" y2="48"/><line x1="33" y1="44" x2="33" y2="48"/>
        <path d="M25 13l-5 12h6l-1 9 9-14h-7l2-7H25z"/>
      </svg>
    ),
  },
  {
    id: "nm3e-ups3kva",
    cat: "ups" as Filter,
    name: "UPS Online 3 kVA",
    badge: "UPS",
    imgLabel: "UPS online monofásico",
    desc: "Doble conversión continua para protección permanente de equipos de misión crítica monofásicos.",
    price: "$1.450",
    delay: ".24s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="12" y="6" width="28" height="36" rx="2"/>
        <rect x="18" y="2" width="16" height="5" rx="1"/>
        <rect x="15" y="34" width="22" height="6" rx="1"/>
        <circle cx="26" cy="20" r="6"/>
        <line x1="26" y1="14" x2="26" y2="26"/>
      </svg>
    ),
  },
  {
    id: "nm3e-faa50",
    cat: "filtros" as Filter,
    name: "Filtro Activo FAA-50",
    badge: "Filtros",
    imgLabel: "Filtro activo de armónicos",
    desc: "Compensación dinámica hasta el armónico 50°. THD garantizado inferior a 5% post-instalación.",
    price: "$4.800",
    delay: ".32s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 26 Q13 10 22 26 Q31 42 40 26 Q44 18 48 26"/>
        <path d="M4 34 Q9 28 14 34 Q19 40 24 34 Q29 28 34 34 Q39 40 44 34 Q46 31 48 34" strokeWidth=".9" opacity=".5"/>
        <line x1="4" y1="10" x2="48" y2="10"/><line x1="4" y1="42" x2="48" y2="42"/>
      </svg>
    ),
  },
  {
    id: "nm3e-cap20kvar",
    cat: "filtros" as Filter,
    name: "Banco Capacitores 20 kVAr",
    badge: "Filtros",
    imgLabel: "Banco de capacitores",
    desc: "Corrección automática del factor de potencia con conmutación estática inteligente. FP > 0.98 garantizado.",
    price: "$1.200",
    delay: ".4s",
    icon: (
      <svg className="prod-ico" width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <line x1="26" y1="4" x2="26" y2="18"/>
        <line x1="10" y1="18" x2="42" y2="18"/><line x1="10" y1="23" x2="42" y2="23"/>
        <line x1="26" y1="23" x2="26" y2="35"/>
        <circle cx="26" cy="41" r="7"/>
        <line x1="23" y1="41" x2="29" y2="41"/><line x1="26" y1="38" x2="26" y2="44"/>
      </svg>
    ),
  },
];

export default function Tienda() {
  const [active, setActive] = useState<Filter>("all");

  return (
    <section id="tienda" className="section">
      <div className="inner">
        <div className="shop-hd">
          <div>
            <p className="s-label rv">Equipamiento Profesional</p>
            <h2 className="s-title rv">Tienda</h2>
            <p className="s-body rv" style={{ maxWidth: 460, marginTop: 10 }}>
              Equipos certificados para diagnóstico, protección y monitoreo de instalaciones eléctricas industriales. Despacho a todo Chile.
            </p>
          </div>
          <a href="#" className="btn btn-ghost rv">Ver catálogo completo</a>
        </div>

        <div className="shop-filters rv">
          {(["all", "analizadores", "ups", "filtros"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`f-btn${active === f ? " active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f === "all" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="prod-grid">
          {products.map((p) => (
            <div
              key={p.id}
              className={`prod-card rv${active !== "all" && active !== p.cat ? " hidden" : ""}`}
              style={{ transitionDelay: p.delay }}
              data-cat={p.cat}
            >
              <div className="prod-img">
                {p.icon}
                <span className="prod-img-lbl">{p.imgLabel}</span>
                <span className="prod-badge">{p.badge}</span>
                <span className="prod-dot" />
              </div>
              <div className="prod-body">
                <h3 className="prod-name">{p.name}</h3>
                <p className="prod-desc">{p.desc}</p>
                <div className="prod-foot">
                  <span className="prod-price">{p.price} <em>USD</em></span>
                  <div className="prod-acts">
                    <a href="#" className="btn btn-ghost btn-sm">Ver</a>
                    <button className="btn btn-acc btn-sm" data-shopify-id={p.id}>+ Carro</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="shop-cta-wrap rv">
          <a href="#" className="btn btn-ghost btn-lg">Ver todos los productos</a>
        </div>
      </div>
    </section>
  );
}
