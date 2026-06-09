"use client";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const tag = document.querySelector<HTMLElement>(".hero-tag");
    const lines = document.querySelectorAll<HTMLElement>(".hero-h1 .ln");
    const sub = document.querySelector<HTMLElement>(".hero-sub");
    const ctas = document.querySelector<HTMLElement>(".hero-ctas");
    const scrl = document.querySelector<HTMLElement>(".hero-scroll");

    const show = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      setTimeout(() => {
        if (el.classList.contains("hero-ln-hidden")) {
          el.classList.add("hero-ln-visible");
        } else {
          el.classList.add("hero-intro-visible");
        }
      }, delay);
    };

    show(tag, 80);
    lines.forEach((ln, i) => show(ln, 220 + i * 140));
    show(sub, 720);
    show(ctas, 900);
    show(scrl, 1100);

    const vid = document.getElementById("hero-video") as HTMLVideoElement | null;
    if (vid) {
      const savedT = parseFloat(localStorage.getItem("nm3e-vid-t") || "0");
      vid.addEventListener("loadedmetadata", () => {
        if (savedT > 0 && savedT < vid.duration) vid.currentTime = savedT;
      });
      vid.addEventListener("timeupdate", () => {
        localStorage.setItem("nm3e-vid-t", String(vid.currentTime));
      });
    }
  }, []);

  return (
    <section id="hero">
      <video id="hero-video" autoPlay muted loop playsInline>
        <source src="/uploads/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-grad" />
      <div className="hero-body">
        <p className="hero-tag hero-intro-hidden">
          <span>{"// "}</span>Sistema activo — Diagnóstico inteligente en tiempo real
        </p>
        <h1 className="hero-h1">
          <span className="ln hero-ln-hidden">Tu operación</span>
          <span className="ln hero-ln-hidden">no puede <span className="c">detenerse.</span></span>
          <span className="ln hero-ln-hidden">La nuestra tampoco.</span>
        </h1>
        <p className="hero-sub hero-intro-hidden">
          Diagnóstico, implementación y monitoreo continuo para instalaciones eléctricas industriales críticas en Chile.
        </p>
        <div className="hero-ctas hero-intro-hidden">
          <a href="#contacto" className="btn btn-fire btn-lg">
            Solicitar Diagnóstico
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <a href="/tienda" className="btn btn-ghost btn-lg">Ver Tienda</a>
        </div>
      </div>
      <div className="hero-scroll hero-intro-hidden">
        <div className="scroll-bar" />
        <p>Scroll</p>
      </div>
    </section>
  );
}
