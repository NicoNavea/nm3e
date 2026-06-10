"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cart";

const shopCategories = [
  { label: "Calidad de Energía", href: "/tienda#calidad-de-energia" },
  { label: "Respaldo Energético", href: "/tienda#respaldo-energetico" },
  { label: "Iluminación", href: "/tienda#iluminacion" },
  { label: "Monitoreo Energético", href: "/tienda#monitoreo-energetico" },
  { label: "Servicios", href: "/tienda#servicios" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const { totalQuantity, toggleCart } = useCartStore();
  const pathname = usePathname();

  const anchorHref = (hash: string) =>
    pathname === "/" ? hash : `/${hash}`;

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (!saved) localStorage.setItem("theme", "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    const next = current === "dark" ? "light" : "dark";

    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", next);
  };

  const closeMob = () => setMobOpen(false);

  return (
    <>
      {/* Mobile Menu */}
      <div id="mob-menu" className={mobOpen ? "open" : ""}>
        <a href="/" onClick={closeMob}>Inicio</a>
        <a href={anchorHref("#blog")} onClick={closeMob}>Blog</a>
        <a href={anchorHref("#servicios")} onClick={closeMob}>Servicios</a>

        <div className="mob-shop">
          <a href="/tienda" onClick={closeMob}>Tienda</a>
          <div className="mob-shop-categories">
            {shopCategories.map((category) => (
              <a
                key={category.href}
                href={category.href}
                onClick={closeMob}
              >
                {category.label}
              </a>
            ))}
          </div>
        </div>

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
              src="/uploads/logo-dark.png"
              className="logo-img logo-img-light"
              alt="NM3E"
              width={189}
              height={52}
              priority
            />
            <Image
              src="/uploads/logo-white.png"
              className="logo-img logo-img-dark"
              alt="NM3E"
              width={189}
              height={52}
              priority
            />
          </a>

          <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href={anchorHref("#blog")}>Blog</a></li>
            <li><a href={anchorHref("#servicios")}>Servicios</a></li>

            <li className="nav-shop">
              <a href="/tienda" className="tienda-link">
                Tienda
                <svg
                  className="dropdown-arrow"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>

              <div className="shop-dropdown">
                {shopCategories.map((category) => (
                  <a key={category.href} href={category.href}>
                    {category.label}
                  </a>
                ))}
              </div>
            </li>

            <li><a href={anchorHref("#proceso")}>Proceso</a></li>
            <li><a href={anchorHref("#contacto")}>Contacto</a></li>
          </ul>

          <div className="nav-right">
            <a
              href={anchorHref("#contacto")}
              className="btn btn-cyan nav-cta-d"
            >
              Solicitar Diagnóstico
            </a>

            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              <svg className="ico-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="ico-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>

            <button
              className="cart-btn"
              onClick={toggleCart}
              aria-label="Carrito"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </button>

            <button
              className="ham"
              type="button"
              onClick={() => setMobOpen((open) => !open)}
              aria-label="Abrir menú"
              aria-expanded={mobOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
