export default function CtaFinal() {
  return (
    <section id="cta-final">
      <div className="ctaf-inner rv">
        <p className="ctaf-tag">{"// No esperes la falla"}</p>
        <h2 className="ctaf-h">
          Tu operación no<br />puede permitirse<br /><em>una sola falla.</em>
        </h2>
        <p className="ctaf-sub">
          La nuestra tampoco. Contáctanos y agenda un diagnóstico gratuito de tu instalación eléctrica.
        </p>
        <a href="#contacto" className="btn btn-fire btn-lg">
          Solicitar Diagnóstico Gratuito
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
