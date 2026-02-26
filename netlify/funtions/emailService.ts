// src/services/emailService.ts
export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[];
}

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    // ANTES: '/.netlify/functions/send-enquiry'
    // DESPUÉS: '/api/send-enquiry' (para Cloudflare Pages)
    const response = await fetch('/api/send-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al enviar');
    }

    return true;
  } catch (error) {
    console.error('Error sending enquiry:', error);
    return false;
  }
};
