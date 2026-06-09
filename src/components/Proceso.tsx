"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function Proceso() {
  useEffect(() => {
    const ln  = document.getElementById("proc-ln");
    const sec = document.getElementById("proceso");
    if (!ln || !sec) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        ln.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.25,.46,.45,.94) .3s";
        ln.style.strokeDashoffset = "0";
        obs.disconnect();
      },
      { threshold: 0.5 }
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="proceso" className="section">
      <div className="inner">
        <div className="proc-head">
          <p className="s-label rv" style={{ justifyContent: "center" }}>Metodología</p>
          <h2 className="s-title rv" style={{ textAlign: "center" }}>Cómo trabajamos</h2>
          <p className="s-body rv" style={{ maxWidth: 480, margin: "16px auto 0", textAlign: "center" }}>
            Un proceso probado en industrias, hospitales y centros de datos donde cada minuto de uptime importa.
          </p>
        </div>
        <div className="proc-steps">
          <div className="proc-line-wrap">
            <svg viewBox="0 0 100 4" preserveAspectRatio="none" style={{ width: "100%", height: 4, overflow: "visible" }}>
              <line x1="0" y1="2" x2="100" y2="2" stroke="rgba(107,174,214,.12)" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke"/>
              <line id="proc-ln" x1="0" y1="2" x2="100" y2="2" stroke="var(--primary)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" vectorEffect="non-scaling-stroke"/>
            </svg>
          </div>
          <div className="paso rv">
            <div className="paso-n">01</div>
            <h3 className="paso-t">Diagnóstico</h3>
            <p className="paso-b">Medición de calidad de energía en tu instalación. Identificamos armónicos, factor de potencia, desequilibrios y vulnerabilidades ocultas.</p>
          </div>
          <div className="paso rv" style={{ transitionDelay: ".2s" }}>
            <div className="paso-n">02</div>
            <h3 className="paso-t">Implementación</h3>
            <p className="paso-b">Ingeniería y ejecución del plan correctivo. Instalación de equipamiento certificado con la mínima interrupción posible a tu operación.</p>
          </div>
          <div className="paso rv" style={{ transitionDelay: ".4s" }}>
            <div className="paso-n">03</div>
            <h3 className="paso-t">Monitoreo</h3>
            <p className="paso-b">Seguimiento continuo post-implementación. Alertas en tiempo real y reportes periódicos para garantizar el uptime a largo plazo.</p>
          </div>
        </div>
        <div className="rv" style={{ marginTop: 72, maxWidth: 720, margin: "72px auto 0" }}>
          <div style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            position: "relative",
            padding: "32px",
          }}>
            {/* top-left corner cut */}
            <svg style={{ position: "absolute", top: -1, left: -1, display: "block" }} width="24" height="24" viewBox="0 0 24 24">
              <polygon points="0,0 24,0 0,24" fill="var(--bg)" />
              <polyline points="24,0 0,0 0,24" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
            </svg>
            {/* bottom-right corner cut */}
            <svg style={{ position: "absolute", bottom: -1, right: -1, display: "block" }} width="24" height="24" viewBox="0 0 24 24">
              <polygon points="24,24 0,24 24,0" fill="var(--bg)" />
              <polyline points="0,24 24,24 24,0" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
            </svg>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(to right, var(--primary), transparent)",
            }} />
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "var(--fMono)", fontSize: 9.5, color: "var(--muted)",
              letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block", animation: "blink 1.4s ease-in-out infinite" }} />
              Ciclo de servicios
            </div>
            <div style={{
              clipPath: "polygon(28px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 28px)",
            }}>
              <Image
                src="/uploads/workflow.png"
                alt="Ciclo de servicios NM3E"
                width={656}
                height={437}
                unoptimized
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
