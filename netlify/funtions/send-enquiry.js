// netlify/functions/send-enquiry.js
const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, files } = JSON.parse(event.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const attachments = files.map(file => ({
      filename: file.name,
      content: file.data.split(',')[1], // data es base64 con prefijo data:image/...;base64,
      encoding: 'base64'
    }));

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Cambia a tu dominio verificado
      to: ['db@dbsdesigner.com'],
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
      return { statusCode: 500, body: JSON.stringify({ error }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email enviado correctamente' }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
