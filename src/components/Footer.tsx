"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const anchorHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href={anchorHref("#hero")} className="nav-logo">
              <Image src="/uploads/logo-dark.png" className="logo-img logo-img-light" alt="NM3E" width={160} height={44} />
              <Image src="/uploads/logo-white.png" className="logo-img logo-img-dark" alt="NM3E" width={160} height={44} />
            </a>
            <p>Ingeniería eléctrica industrial. Diagnóstico, implementación y monitoreo continuo para instalaciones que no pueden detenerse.</p>
          </div>
          <div>
            <p className="foot-col-t">Servicios</p>
            <ul className="foot-links">
              <li><a href={anchorHref("#servicios")}>Análisis de calidad</a></li>
              <li><a href={anchorHref("#servicios")}>Suministro e instalación</a></li>
              <li><a href={anchorHref("#servicios")}>Monitoreo continuo</a></li>
              <li><a href={anchorHref("#servicios")}>Mantenimiento</a></li>
            </ul>
          </div>

          <div>
            <p className="foot-col-t">Contacto</p>
            <ul className="foot-links">
              <li><a href={anchorHref("#contacto")}>contacto@nm3e.cl</a></li>
              <li><a href="https://wa.me/56976932386" target="_blank" rel="noopener noreferrer">+56 9 7693 2386</a></li>
              <li>Santiago, Chile</li>
            </ul>
            <p className="foot-col-t" style={{ marginTop: 24 }}>Redes</p>
            <div className="foot-social">
              <a href="https://www.linkedin.com/company/nmingenieria/" className="soc-a" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/nm3e_ingenieria/" className="soc-a" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="foot-copy">© 2026 NM3E — Todos los derechos reservados</span>
          <span className="foot-copy">Santiago, Chile</span>
        </div>
      </div>
    </footer>
  );
}
