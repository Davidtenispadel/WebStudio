import emailjs from '@emailjs/browser';

// Inicializar EmailJS (solo se necesita una vez)
emailjs.init('TU_PUBLIC_KEY'); // Reemplaza con tu Public Key

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[];
}

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    // Preparar los parámetros para la plantilla
    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
      attachments: data.files.length > 0 
        ? `${data.files.length} archivo(s) adjunto(s) (no visibles por EmailJS gratis)`
        : 'Ninguno'
    };

    // Enviar el email usando EmailJS
    const response = await emailjs.send(
      'TU_SERVICE_ID',      // Reemplaza con tu Service ID
      'TU_TEMPLATE_ID',     // Reemplaza con tu Template ID
      templateParams
    );

    console.log('Email enviado con éxito:', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
};
