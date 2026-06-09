"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen,  setMobOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMob = () => setMobOpen(false);

  return (
    <>
      {/* Mobile Menu */}
      <div id="mob-menu" className={mobOpen ? "open" : ""}>
        <a href="#servicios" onClick={closeMob}>Servicios</a>
        <a href="#tienda"    onClick={closeMob}>Tienda</a>
        <a href="#proceso"   onClick={closeMob}>Proceso</a>
        <a href="#blog"      onClick={closeMob}>Blog</a>
        <a href="#cifras"    onClick={closeMob}>Nosotros</a>
        <a
          href="mailto:contacto@nm3e.cl"
          onClick={closeMob}
          className="btn btn-cyan"
          style={{ fontSize: 18, marginTop: 12 }}
        >
          Solicitar Diagnóstico
        </a>
      </div>

      {/* Navbar */}
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <Image
              src="/uploads/nm3e-letras-oscuras.jpeg"
              className="logo-img"
              alt="NM3E"
              width={160}
              height={44}
              priority
            />
          </a>

          <ul className="nav-links">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#tienda" className="tienda-link">Tienda</a></li>
            <li><a href="#proceso">Proceso</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#cifras">Nosotros</a></li>
          </ul>

          <div className="nav-right">
            <a href="mailto:contacto@nm3e.cl" className="btn btn-cyan nav-cta-d">
              Solicitar Diagnóstico
            </a>

            <div className="ham" onClick={() => setMobOpen(o => !o)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
