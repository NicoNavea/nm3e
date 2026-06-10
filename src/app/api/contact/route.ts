import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nombre, empresa, email, mensaje } = await req.json();

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim())
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  if (nombre.length > 80 || (empresa && empresa.length > 100) || email.length > 120 || mensaje.length > 1000)
    return NextResponse.json({ error: "Campo demasiado largo." }, { status: 400 });
  if (mensaje.trim().length < 10)
    return NextResponse.json({ error: "Mensaje demasiado corto." }, { status: 400 });

  const { error } = await resend.emails.send({
    from: "Formulario NM3E <contacto@nm3e.cl>",
    to: "n.navea@nm3e.cl",
    replyTo: email,
    subject: `Contacto NM3E — ${nombre}`,
    text: `Nombre: ${nombre}\nEmpresa: ${empresa || "—"}\nEmail: ${email}\n\n${mensaje}`,
  });

  if (error) {
    return NextResponse.json({ error: "Error al enviar el correo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
