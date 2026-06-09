"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const trackRing = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.11;
      p.ry += (p.my - p.ry) * 0.11;
      ring.style.left = p.rx + "px";
      ring.style.top  = p.ry + "px";
      raf = requestAnimationFrame(trackRing);
    };
    raf = requestAnimationFrame(trackRing);

    const onEnter = () => document.body.classList.add("hov");
    const onLeave = () => document.body.classList.remove("hov");
    const targets = document.querySelectorAll("a,button,.svc-card,.proy-card,.prod-card");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur-dot"  ref={dotRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}
