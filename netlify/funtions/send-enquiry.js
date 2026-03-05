
// functions/api/send-enquiry.js
import { Resend } from "resend";

export async function onRequestPost(context) {
  try {
    // 1. Leer el cuerpo JSON enviado desde React
    const body = await context.request.json();
    const { name, email, message, files } = body;

    // 2. Preparar adjuntos para Resend
    const attachments = (files || []).map(file => ({
      filename: file.name,
      content: file.data,      // base64
      encoding: "base64",
      type: file.type,
    }));

    // 3. Inicializar Resend
    const resend = new Resend(context.env.RESEND_API_KEY);

    // 4. Enviar email
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",  // usa aquí tu dominio verificado
      to: ["db@dbsdesigner.com"],
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje desde formulario DB+</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>Adjuntos:</strong> ${files.length}</p>
      `,
      atta
