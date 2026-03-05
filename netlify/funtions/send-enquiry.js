
// functions/api/send-enquiry.js
import { Resend } from "resend";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => null);
    if (!body) {
      return Response.json({ error: "Cuerpo inválido (no es JSON)" }, { status: 400 });
    }

    const { name, email, message, files } = body;

    if (!name || !email || !message) {
      return Response.json({ error: "Faltan campos obligatorios (name, email, message)" }, { status: 400 });
    }

    const attachments = (files || []).map((file) => {
      if (!file?.data || !file?.name) return null;
      return {
        filename: file.name,
        content: file.data, // base64 sin el prefijo data:
        encoding: "base64",
        type: file.type || "application/octet-stream",
      };
    }).filter(Boolean);

    const resend = new Resend(context.env.RESEND_API_KEY);
    if (!context.env.RESEND_API_KEY) {
      return Response.json({ error: "Falta RESEND_API_KEY en variables de entorno" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "forms@dbsdesigner.com", // <-- usa tu dominio verificado en Resend
      to: ["db@dbsdesigner.com"],    // <-- ojo con la ortografía
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>Adjuntos:</strong> ${attachments.length}</p>
      `,
      attachments,
    });

    if (error) {
      return Response.json({ error }, { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id ?? null }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
