
// src/services/emailService.ts
export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[];
}

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    const response = await fetch('/.netlify/functions/send-enquiry', {
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
