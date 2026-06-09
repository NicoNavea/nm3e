"use client";
import { useState } from "react";

const LIMITS = { nombre: 80, empresa: 100, email: 120, mensaje: 1000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = keyof typeof LIMITS;
type Errors = Partial<Record<Fields, string>>;

function validate(form: Record<Fields, string>): Errors {
  const e: Errors = {};
  if (!form.nombre.trim())                          e.nombre  = "El nombre es obligatorio.";
  else if (form.nombre.length > LIMITS.nombre)      e.nombre  = `Máximo ${LIMITS.nombre} caracteres.`;
  if (form.empresa.length > LIMITS.empresa)         e.empresa = `Máximo ${LIMITS.empresa} caracteres.`;
  if (!form.email.trim())                           e.email   = "El email es obligatorio.";
  else if (!EMAIL_RE.test(form.email))              e.email   = "Ingresa un email válido.";
  else if (form.email.length > LIMITS.email)        e.email   = `Máximo ${LIMITS.email} caracteres.`;
  if (!form.mensaje.trim())                         e.mensaje = "El mensaje es obligatorio.";
  else if (form.mensaje.trim().length < 10)         e.mensaje = "El mensaje es demasiado corto.";
  else if (form.mensaje.length > LIMITS.mensaje)    e.mensaje = `Máximo ${LIMITS.mensaje} caracteres.`;
  return e;
}

export default function Contacto() {
  const [form, setForm] = useState<Record<Fields, string>>({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set = (k: Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setForm(f => ({ ...f, [k]: val }));
    if (fieldErrors[k]) setFieldErrors(fe => ({ ...fe, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("No se pudo enviar el mensaje. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="inner">
        <div className="prob-grid">

          {/* Left — info */}
          <div>
            <p className="s-label rv">Contacto</p>
            <h2 className="s-title rv">
              Hablemos de<br />
              <span style={{ color: "var(--primary)" }}>tu proyecto</span>
            </h2>
            <p className="s-body rv" style={{ marginTop: 20, marginBottom: 44 }}>
              Cuéntanos el desafío que enfrenta tu operación. Nuestro equipo revisa cada consulta y responde en menos de 24 horas hábiles.
            </p>

            <div className="data-panel rv">
              <div className="panel-head">
                <div className="panel-dot" style={{ background: "var(--primary)", boxShadow: "0 0 8px rgba(107,174,214,.5)" }} />
                CANAL_DIRECTO // NM3E
              </div>
              <div className="d-row">
                <span className="d-k">Email</span>
                <a href="mailto:contacto@nm3e.cl" className="d-v" style={{ color: "var(--primary)" }}>
                  contacto@nm3e.cl
                </a>
              </div>
              <div className="d-row">
                <span className="d-k">Tiempo de respuesta</span>
                <span className="d-v ok">{"< 24 hrs hábiles"}</span>
              </div>
              <div className="d-row">
                <span className="d-k">Cobertura</span>
                <span className="d-v ok">Chile</span>
              </div>
              <div className="d-row">
                <span className="d-k">Diagnóstico inicial</span>
                <span className="d-v ok">Sin costo en Santiago ✓</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rv" style={{ transitionDelay: ".18s" }}>
            <div className="ct-panel">
              <div className="panel-head">
                <div className="panel-dot" />
                FORMULARIO_CONTACTO
              </div>

              {sent ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="paso-t" style={{ marginBottom: 8 }}>Mensaje enviado</p>
                  <p className="paso-b">
                    Recibimos tu consulta. Te respondemos en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <form className="ct-form" onSubmit={handleSubmit} noValidate>
                  <div className="ct-row-2">
                    <div className="ct-field">
                      <label className="d-k ct-label">Nombre</label>
                      <input className="ct-input" type="text" placeholder="Tu nombre" value={form.nombre} onChange={set("nombre")} maxLength={LIMITS.nombre} />
                      {fieldErrors.nombre && <span className="ct-err">{fieldErrors.nombre}</span>}
                    </div>
                    <div className="ct-field">
                      <label className="d-k ct-label">Empresa <span className="ct-optional">(opcional)</span></label>
                      <input className="ct-input" type="text" placeholder="Tu empresa" value={form.empresa} onChange={set("empresa")} maxLength={LIMITS.empresa} />
                      {fieldErrors.empresa && <span className="ct-err">{fieldErrors.empresa}</span>}
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className="d-k ct-label">Email</label>
                    <input className="ct-input" type="email" placeholder="correo@empresa.cl" value={form.email} onChange={set("email")} maxLength={LIMITS.email} />
                    {fieldErrors.email && <span className="ct-err">{fieldErrors.email}</span>}
                  </div>

                  <div className="ct-field">
                    <label className="d-k ct-label" style={{ display: "flex", justifyContent: "space-between" }}>
                      Mensaje
                      <span className="ct-optional">{form.mensaje.length}/{LIMITS.mensaje}</span>
                    </label>
                    <textarea className="ct-input ct-textarea" placeholder="Describe brevemente el desafío de tu operación…" rows={5} value={form.mensaje} onChange={set("mensaje")} maxLength={LIMITS.mensaje} />
                    {fieldErrors.mensaje && <span className="ct-err">{fieldErrors.mensaje}</span>}
                  </div>

                  {error && (
                    <p style={{ color: "var(--danger, #f87171)", fontSize: 13, marginBottom: 4 }}>{error}</p>
                  )}

                  <div className="panel-div" style={{ margin: "4px 0 0" }}>
                    ── ENVÍO SEGURO — RESPUESTA GARANTIZADA ──────────
                  </div>

                  <button type="submit" className="btn btn-cyan btn-lg" disabled={sending} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                    {sending ? "Enviando…" : "Enviar mensaje"}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
