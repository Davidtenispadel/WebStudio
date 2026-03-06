export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => null);
    if (!body) return json({ error: "Cuerpo inválido (no es JSON)" }, 400);

    const { name, email, message, files } = body;
    if (!name || !email || !message) {
      return json({ error: "Faltan campos obligatorios (name, email, message)" }, 400);
    }

    const safeFiles = Array.isArray(files) ? files.slice(0, 10) : [];
    const attachments = safeFiles
      .map((file) => {
        if (!file?.data || !file?.name) return null;
        return {
          filename: file.name,
          content: file.data, // base64 sin prefijo
          type: file.type || "application/octet-stream",
        };
      })
      .filter(Boolean);

    const resendKey = context.env.RESEND_API_KEY;
    if (!resendKey) return json({ error: "Falta RESEND_API_KEY" }, 500);

    const payload = {
      from: "forms@dbsdesigner.com",
      to: ["db@dbsdesigner.com"],
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong><br/>${nl2br(escapeHtml(message))}</p>
        <p><strong>Adjuntos:</strong> ${attachments.length}</p>
      `,
      attachments,
    };

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
      console.log("Resend error:", res.status, JSON.stringify(result));
      return json({ error: "Resend API error", details: result }, 502);
    }

    return json({ ok: true, id: result.id ?? null }, 200);
  } catch (err) {
    console.log("Handler crash:", err?.message);
    return json({ error: err?.message ?? "Unexpected error" }, 500);
  }
}

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
