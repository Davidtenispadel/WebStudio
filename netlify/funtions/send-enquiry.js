// functions/api/send-enquiry.js
import { Resend } from 'resend';

export async function onRequestPost(context) {
  try {
    // 1. Obtener datos del formulario (incluye archivos)
    const formData = await context.request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message'); // Ajusta según tu campo
    const files = formData.getAll('files'); // Array de archivos

    // 2. Inicializar Resend con la variable de entorno
    const resend = new Resend(context.env.RESEND_API_KEY);

    // 3. Procesar archivos adjuntos
    const attachments = [];
    for (const file of files) {
      if (file && file.size > 0) {
        // Convertir el archivo a base64 (similar a tu código original)
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        attachments.push({
          filename: file.name,
          content: base64,
          encoding: 'base64',
        });
      }
    }

    // 4. Enviar email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Cambia a tu dominio verificado
      to: ['db@dbsdesigner.com'],    // O el nuevo email DB+
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje desde DB+</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>Adjuntos:</strong> ${files.length} archivo(s)</p>
      `,
      attachments,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    // 5. Respuesta al usuario (puede ser un redirect o un mensaje)
    return new Response('Solicitud enviada correctamente', { status: 200 });
    
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
