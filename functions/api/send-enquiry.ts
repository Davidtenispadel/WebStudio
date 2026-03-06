// functions/api/send-enquiry.js
export async function onRequestPost(context) {
  try {
    // 1) Parseo seguro del JSON
    const body = await context.request.json().catch(() => null);
    if (!body) {
      return json({ error: "Cuerpo inválido (no es JSON)" }, 400);
    }

    const { name, email, message, files } = body;

    // 2) Validación básica
    if (!name || !email || !message) {
      return json({ error: "Faltan campos obligatorios (name, email, message)" }, 400);
    }

    // 3) Límite de adjuntos (defensivo)
    const safeFiles = Array.isArray(files) ? files.slice(0, 10) : [];
    const attachments = safeFiles
      .map((file) => {
        if (!file?.data || !file?.name) return null;
        // ⚠️ 'data' debe ser base64 LIMPIO (sin 'data:...;base64,')
        return {
          filename: file.name,
          content: file.data,            // base64 sin prefijo
          type: file.type || "application/octet-stream",
        };
      })
      .filter(Boolean);

    // 4) Clave de Resend
    const resendKey = context.env.RESEND_API_KEY;
    if (!resendKey) {
      return json({ error: "Falta RESEND_API_KEY en variables de entorno" }, 500);
    }

    // 5) Payload para Resend API REST (sin SDK)
    const payload = {
      from: "forms@dbsdesigner.com",         // dominio verificado en Resend
      to: ["db@dbsdesigner.com"],            // destinatarios
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong><br/>${nl2br(escapeHtml(message))}</p>
        <p><strong>Adjuntos:</strong> ${attachments.length}</p>
      `,
      attachments, // [{ filename, content(base64), type }]
    };

    // 6) Llamada HTTP a Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Log técnico mínimo (Cloudflare logs)
      console.log("Resend error:", res.status, JSON.stringify(result));
      return json({ error: "Resend API error", details: result }, 502);
    }

    return json({ ok: true, id: result.id ?? null }, 200);
  } catch (err) {
    console.log("Handler crash:", err?.message);
    return json({ error: err?.message ?? "Unexpected error" }, 500);
  }
}

/** Helpers */
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nl2br(str = "") {
  return String(str).replace(/\n/g, "<br/>");
}
