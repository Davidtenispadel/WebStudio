// Netlify Function: enviar email usando Resend
export async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: "OK",
      };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { statusCode: 500, body: "Missing RESEND_API_KEY" };

    const { nombre, email, mensaje, archivos } = JSON.parse(event.body || "{}");

    const archivosTexto = Array.isArray(archivos) && archivos.length
      ? archivos.map(a => `• ${a.name} → ${a.downloadURL}`).join("\n")
      : "No attachments";

    const subject = `New enquiry from ${nombre}`;
    const text = `
New enquiry:

Name: ${nombre}
Email: ${email}
Message:
${mensaje}

Attachments:
${archivosTexto}

Sent automatically from Netlify Functions + Resend.
`.trim();

    // Llamada a la API de Resend
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DB+ Website <onboarding@resend.dev>",
        to: ["db@dbsdesigner.com"],
        subject,
        text,
        reply_to: email,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return { statusCode: 500, body: `Resend error: ${errText}` };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "OK",
    };
  } catch (e) {
    return { statusCode: 500, body: `Server error: ${e.message}` };
  }
}
