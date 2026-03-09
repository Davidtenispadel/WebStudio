// src/services/emailService.ts
import emailjs from '@emailjs/browser';

// Inicializa EmailJS con tu Public Key
emailjs.init('SVBQHbGAkYV6qE7qo');

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[]; // data base64 sin prefijo
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
    const attachments = data.files.map(file => ({
      name: file.name,
      data: file.data,
      type: file.type,
    }));

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'db@dbsdesigner.com', // destinatario fijo
      attachments: attachments,
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
