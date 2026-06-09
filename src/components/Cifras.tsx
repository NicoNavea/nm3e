"use client";
import { useEffect, useRef } from "react";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        const dur = 2000;
        const t0  = performance.now();
        const tick = (ts: number) => {
          const p = Math.min((ts - t0) / dur, 1);
          const v = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(v * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span className="cif-num" ref={ref}>0</span>;
}

export default function Cifras() {
  return (
    <section id="cifras">
      <div className="cif-grid">
        <div className="cif-item rv">
          <div className="cif-val">
            <span className="cif-pre">+</span>
            <Counter target={50} />
          </div>
          <p className="cif-lbl">Proyectos completados</p>
        </div>
        <div className="cif-item rv" style={{ transitionDelay: ".1s" }}>
          <div className="cif-val">
            <span className="cif-pre">+</span>
            <Counter target={200} />
          </div>
          <p className="cif-lbl">Equipos instalados</p>
        </div>
        <div className="cif-item rv" style={{ transitionDelay: ".2s" }}>
          <div className="cif-val">
            <Counter target={15} />
            <span className="cif-suf">años</span>
          </div>
          <p className="cif-lbl">Experiencia en el sector</p>
        </div>
        <div className="cif-item rv" style={{ transitionDelay: ".3s" }}>
          <div className="cif-val">
            <Counter target={100} />
            <span className="cif-suf">%</span>
          </div>
          <p className="cif-lbl">Uptime en sistemas críticos</p>
        </div>
      </div>
    </section>
  );
}
