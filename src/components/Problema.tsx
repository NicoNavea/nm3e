export default function Problema() {
  return (
    <section id="problema" className="section">
      <div className="inner">
        <div className="prob-grid">
          <div>
            <p className="s-label rv">Sistema en riesgo</p>
            <h2 className="s-title rv">Las fallas no<br />avisan.</h2>
            <div className="prob-issues">
              <div className="prob-issue rv" style={{ transitionDelay: ".05s" }}>
                <div className="prob-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <p className="prob-issue-t">Paradas no programadas</p>
                  <p className="prob-issue-b">Una falla eléctrica imprevista puede costar cientos de miles de dólares en producción parada. Sin diagnóstico previo, el riesgo es invisible.</p>
                </div>
              </div>
              <div className="prob-issue rv" style={{ transitionDelay: ".12s" }}>
                <div className="prob-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div>
                  <p className="prob-issue-t">Armónicos invisibles</p>
                  <p className="prob-issue-b">Variadores de frecuencia y cargas no lineales generan distorsión armónica que destruye motores, transformadores y equipos en silencio.</p>
                </div>
              </div>
              <div className="prob-issue rv" style={{ transitionDelay: ".2s" }}>
                <div className="prob-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
                  </svg>
                </div>
                <div>
                  <p className="prob-issue-t">Multas por factor de potencia</p>
                  <p className="prob-issue-b">Un factor de potencia bajo genera sobrecargos acumulados mes a mes en tu factura eléctrica. La corrección se paga sola en meses.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rv" style={{ transitionDelay: ".18s" }}>
            <div className="data-panel">
              <div className="panel-head">
                <div className="panel-dot" />
                MONITOR_SISTEMA // ESTADO_ACTUAL
              </div>
              <div className="d-row"><span className="d-k">THD tensión (V)</span><span className="d-v">8.4 %</span></div>
              <div className="d-row"><span className="d-k">Factor de potencia</span><span className="d-v">0.72</span></div>
              <div className="d-row"><span className="d-k">Temp. tablero principal</span><span className="d-v">67 °C</span></div>
              <div className="d-row"><span className="d-k">Interrupciones / mes</span><span className="d-v">3 eventos</span></div>
              <div className="d-row"><span className="d-k">Pérdida estimada mensual</span><span className="d-v">$41.200 USD</span></div>
              <div className="panel-div">── POST-INTERVENCIÓN NM3E ──────────</div>
              <div className="d-row">
                <span className="d-k" style={{ color: "var(--accent)" }}>THD tensión (V)</span>
                <span className="d-v ok">1.2 % ✓</span>
              </div>
              <div className="d-row">
                <span className="d-k" style={{ color: "var(--accent)" }}>Factor de potencia</span>
                <span className="d-v ok">0.98 ✓</span>
              </div>
              <div className="d-row">
                <span className="d-k" style={{ color: "var(--accent)" }}>Interrupciones / mes</span>
                <span className="d-v ok">0 eventos ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
