"use client";
import { useEffect } from "react";

export default function Servicios() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".svc-card");
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transition = "transform .08s ease, box-shadow .3s";
        card.style.transform  = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(6px)`;
      };
      const onLeave = () => {
        card.style.transition = "transform .5s var(--ease), box-shadow .3s";
        card.style.transform  = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <section id="servicios" className="section">
      <div className="inner">
        <div className="svc-header">
          <div>
            <p className="s-label rv">Soluciones</p>
            <h2 className="s-title rv">Lo que hacemos</h2>
          </div>
          <a href="mailto:contacto@nm3e.cl" className="btn btn-ghost rv">Consultar servicios</a>
        </div>
        <div className="svc-grid">

          <div className="svc-card rv" style={{ transitionDelay: "0s" }}>
            <div className="svc-shimmer" />
            <p className="svc-n">01</p>
            <svg className="svc-ico" viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <circle cx="23" cy="23" r="9"/><circle cx="23" cy="23" r="18" strokeDasharray="3 3"/>
              <line x1="23" y1="2" x2="23" y2="10"/><line x1="23" y1="36" x2="23" y2="44"/>
              <line x1="2" y1="23" x2="10" y2="23"/><line x1="36" y1="23" x2="44" y2="23"/>
              <line x1="8.4" y1="8.4" x2="14.2" y2="14.2"/><line x1="31.8" y1="31.8" x2="37.6" y2="37.6"/>
            </svg>
            <h3 className="svc-t">Análisis de Calidad de Energía</h3>
            <p className="svc-b">Medición y diagnóstico completo: armónicos, flicker, desequilibrios y factor de potencia. Detectamos lo que el ojo no ve antes de que se convierta en falla.</p>
            <span className="svc-more">
              Conocer más{" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>

          <div className="svc-card rv" style={{ transitionDelay: ".08s" }}>
            <div className="svc-shimmer" />
            <p className="svc-n">02</p>
            <svg className="svc-ico" viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="6" y="6" width="14" height="34" rx="1"/><rect x="26" y="6" width="14" height="34" rx="1"/>
              <line x1="6" y1="23" x2="20" y2="23"/><line x1="26" y1="23" x2="40" y2="23"/>
              <line x1="13" y1="13" x2="13" y2="33"/><line x1="33" y1="13" x2="33" y2="33"/>
              <circle cx="6" cy="23" r="2" fill="currentColor" stroke="none"/><circle cx="40" cy="23" r="2" fill="currentColor" stroke="none"/>
            </svg>
            <h3 className="svc-t">Suministro e Instalación</h3>
            <p className="svc-b">Filtros activos de armónicos, UPS industriales y bancos de capacitores. Desde la ingeniería del proyecto hasta la puesta en marcha con mínima interrupción.</p>
            <span className="svc-more">
              Conocer más{" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>

          <div className="svc-card rv" style={{ transitionDelay: ".16s" }}>
            <div className="svc-shimmer" />
            <p className="svc-n">03</p>
            <svg className="svc-ico" viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="3" y="3" width="40" height="40" rx="2"/>
              <polyline points="8,32 16,20 23,27 31,14 38,20"/>
              <circle cx="8" cy="32" r="1.8" fill="currentColor" stroke="none"/>
              <circle cx="16" cy="20" r="1.8" fill="currentColor" stroke="none"/>
              <circle cx="23" cy="27" r="1.8" fill="currentColor" stroke="none"/>
              <circle cx="31" cy="14" r="1.8" fill="currentColor" stroke="none"/>
              <circle cx="38" cy="20" r="1.8" fill="currentColor" stroke="none"/>
            </svg>
            <h3 className="svc-t">Monitoreo Eléctrico Continuo</h3>
            <p className="svc-b">Supervisión remota 24/7. Dashboard en tiempo real, alertas automáticas y reportes periódicos para que tu equipo siempre sepa lo que pasa en la red.</p>
            <span className="svc-more">
              Conocer más{" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>

          <div className="svc-card rv" style={{ transitionDelay: ".24s" }}>
            <div className="svc-shimmer" />
            <p className="svc-n">04</p>
            <svg className="svc-ico" viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="3" y="11" width="40" height="26" rx="2"/><path d="M13 11V8H33V11"/>
              <line x1="12" y1="21" x2="12" y2="29"/><line x1="18" y1="18" x2="18" y2="29"/>
              <line x1="24" y1="23" x2="24" y2="29"/><line x1="30" y1="20" x2="30" y2="29"/>
              <circle cx="37" cy="14" r="3.5" stroke="var(--warn)" fill="var(--warn10)"/>
            </svg>
            <h3 className="svc-t">Mantenimiento de Tableros</h3>
            <p className="svc-b">Inspección termográfica, ajuste de conexiones, limpieza de componentes y verificación de protecciones. Cero tolerancia a fallos en sistemas críticos.</p>
            <span className="svc-more">
              Conocer más{" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
