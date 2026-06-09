import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GraciasPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="gracias-wrap">
        <div className="gracias-inner">
          <div className="gracias-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <p className="gracias-eyebrow">Pedido confirmado</p>
          <h1 className="gracias-title">¡Gracias por tu compra!</h1>
          <p className="gracias-body">
            Recibirás un correo con los detalles y el seguimiento de tu pedido en breve.
          </p>

          <div className="gracias-actions">
            <Link href="/tienda" className="btn btn-cyan btn-lg">
              Seguir comprando
            </Link>
            <Link href="/#contacto" className="btn btn-ghost btn-lg">
              ¿Tienes dudas?
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
