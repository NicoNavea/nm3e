"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const { totalQuantity, toggleCart } = useCartStore();
  const pathname = usePathname();

  const anchorHref = (hash: string) =>
    pathname === "/" ? hash : `/${hash}`;

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
        <a href="/" onClick={closeMob}>Inicio</a>
        <a href={anchorHref("#blog")} onClick={closeMob}>Blog</a>
        <a href={anchorHref("#servicios")} onClick={closeMob}>Servicios</a>
        <a href="/tienda" onClick={closeMob}>Tienda</a>
        <a href={anchorHref("#proceso")} onClick={closeMob}>Proceso</a>

        <a href={anchorHref("#contacto")} onClick={closeMob}>Contacto</a>
        <a
          href={anchorHref("#contacto")}
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
          <a href={anchorHref("#hero")} className="nav-logo">
            <Image
              src="/uploads/logo-white.png"
              className="logo-img"
              alt="NM3E"
              width={160}
              height={44}
              priority
            />
          </a>

          <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href={anchorHref("#blog")}>Blog</a></li>
            <li><a href={anchorHref("#servicios")}>Servicios</a></li>
            <li><a href="/tienda">Tienda</a></li>
            <li><a href={anchorHref("#proceso")}>Proceso</a></li>

            <li><a href={anchorHref("#contacto")}>Contacto</a></li>
          </ul>

          <div className="nav-right">
            <a href={anchorHref("#contacto")} className="btn btn-cyan nav-cta-d">
              Solicitar Diagnóstico
            </a>

            <button className="cart-btn" onClick={toggleCart} aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
            </button>

            <div className="ham" onClick={() => setMobOpen(o => !o)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
