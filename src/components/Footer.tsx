import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#hero" className="nav-logo">
              <Image src="/uploads/nm3e-letras-claras.jpeg" className="logo-img logo-img-light" alt="NM3E" width={160} height={54} />
              <Image src="/uploads/nm3e-letras-oscuras.jpeg" className="logo-img logo-img-dark"  alt="NM3E" width={160} height={54} />
            </a>
            <p>Ingeniería eléctrica industrial. Diagnóstico, implementación y monitoreo continuo para instalaciones que no pueden detenerse.</p>
          </div>
          <div>
            <p className="foot-col-t">Servicios</p>
            <ul className="foot-links">
              <li><a href="#servicios">Análisis de calidad</a></li>
              <li><a href="#servicios">Suministro e instalación</a></li>
              <li><a href="#servicios">Monitoreo continuo</a></li>
              <li><a href="#servicios">Mantenimiento</a></li>
            </ul>
          </div>
          <div>
            <p className="foot-col-t">Tienda</p>
            <ul className="foot-links">
              <li><a href="#tienda">Analizadores de red</a></li>
              <li><a href="#tienda">UPS industriales</a></li>
              <li><a href="#tienda">Filtros activos</a></li>
              <li><a href="#tienda">Ver catálogo</a></li>
            </ul>
          </div>
          <div>
            <p className="foot-col-t">Contacto</p>
            <ul className="foot-links">
              <li><a href="mailto:contacto@nm3e.cl">contacto@nm3e.cl</a></li>
              <li><a href="tel:+56976932386">+56 9 7693 2386</a></li>
              <li><a href="#">Santiago, Chile</a></li>
            </ul>
            <p className="foot-col-t" style={{ marginTop: 24 }}>Redes</p>
            <div className="foot-social">
              <a href="#" className="soc-a" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="soc-a" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="foot-copy">© 2025 NM3E — Todos los derechos reservados</span>
          <span className="foot-copy">Santiago, Chile</span>
        </div>
      </div>
    </footer>
  );
}
