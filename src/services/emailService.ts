// src/services/emailService.ts
import emailjs from '@emailjs/browser';

// Inicializa EmailJS con tu Public Key
emailjs.init('SVBQHbGAkYV6qE7qo');

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  fileUrls: string[]; // Ahora recibimos las URLs de los archivos subidos
}

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    // Construir un texto con los enlaces a los archivos
    const fileLinks = data.fileUrls.length > 0
      ? `\n\nArchivos adjuntos:\n${data.fileUrls.join('\n')}`
      : '';

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message + fileLinks,
      to_email: 'db@dbsdesigner.com', // destinatario fijo
    };

    const response = await emailjs.send(
      'service_6w3daws',      // <-- TU SERVICE ID
      'template_76z945r',      // <-- TU TEMPLATE ID
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
