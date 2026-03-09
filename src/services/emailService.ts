// src/services/emailService.ts
import emailjs from '@emailjs/browser';

// Inicializa EmailJS con tu Public Key (obténla en https://www.emailjs.com)
emailjs.init('YOUR_PUBLIC_KEY'); // Reemplaza con tu Public Key

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[]; // data es base64 (sin prefijo)
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '');
    reader.onerror = reject;
  });

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    // Prepara los adjuntos para EmailJS (requiere nombre, data base64 y tipo)
    const attachments = data.files.map(file => ({
      name: file.name,
      data: file.data,
      type: file.type,
    }));

    // Parámetros que coincidan con tu plantilla de EmailJS
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      attachments: attachments, // EmailJS soporta attachments en la versión pro (pero incluso gratis puedes enviar archivos pequeños si los incluyes en el cuerpo como enlaces)
    };

    // Envía usando tu Service ID y Template ID
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',      // Reemplaza con tu Service ID
      'YOUR_TEMPLATE_ID',     // Reemplaza con tu Template ID
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
