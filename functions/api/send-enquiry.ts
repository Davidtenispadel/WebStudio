export async function onRequestPost(context) {
  try {
    const body = await context.request.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400 }
      );
    }

    const { name, email, message, files } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing name, email or message" }),
        { status: 400 }
      );
    }

    // --- Adjuntos en formato Resend REST API ---
    const attachments = (files || []).map(file => ({
      filename: file.name,
      content: file.data,      // Base64 sin prefijo
      type: file.type
    }));

    // --- payload para Resend REST API ---
    const payload = {
      from: "forms@dbsdesigner.com",
      to: ["db@dbsdesigner.com"],
      subject: `Mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje recibido</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>Adjuntos:</strong> ${attachments.length}</p>
      `,
      attachments,
    };

    const resendKey = context.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY" }),
        { status: 500 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: result }), { status: 502 });
    }

    return new Response(
      JSON.stringify({ ok: true, id: result.id }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
