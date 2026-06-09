export default function Proyectos() {
  return (
    <section id="proyectos" className="section">
      <div className="inner">
        <div className="proy-header">
          <div>
            <p className="s-label rv">Casos reales</p>
            <h2 className="s-title rv">Proyectos</h2>
          </div>
          <a href="mailto:contacto@nm3e.cl" className="btn btn-ghost rv">Ver portafolio</a>
        </div>
        <div className="proy-grid">
          <div className="proy-card rv">
            <p className="proy-sector">Minería</p>
            <h3 className="proy-t">Planta Procesadora Norte</h3>
            <p className="proy-b">Instalación de filtros activos de armónicos en planta de 15 MW. Alta presencia de variadores de frecuencia con THD &gt;30% que generaba pérdidas continuas.</p>
            <div className="proy-result">
              <p className="proy-result-lbl">Resultado clave</p>
              <p className="proy-result-val">THD: 32% → 1.8% — Ahorro $80K USD/año en penalizaciones</p>
            </div>
          </div>
          <div className="proy-card rv" style={{ transitionDelay: ".12s" }}>
            <p className="proy-sector">Salud</p>
            <h3 className="proy-t">Hospital Regional Privado</h3>
            <p className="proy-b">UPS trifásica 20 KVA para pabellones quirúrgicos y UTI. Conmutación &lt;20 ms y autonomía de 45 minutos en sistemas de soporte vital.</p>
            <div className="proy-result">
              <p className="proy-result-lbl">Resultado clave</p>
              <p className="proy-result-val">0 interrupciones en 3 años — 100% disponibilidad en pabellones</p>
            </div>
          </div>
          <div className="proy-card rv" style={{ transitionDelay: ".24s" }}>
            <p className="proy-sector">Tecnología</p>
            <h3 className="proy-t">Centro de Datos Tier III</h3>
            <p className="proy-b">Monitoreo eléctrico continuo para data center de 2 MW. 48 puntos de medición, alertas automáticas y reportes de calidad semanales.</p>
            <div className="proy-result">
              <p className="proy-result-lbl">Resultado clave</p>
              <p className="proy-result-val">3 fallas preventivas detectadas — 18 hrs de downtime evitadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
