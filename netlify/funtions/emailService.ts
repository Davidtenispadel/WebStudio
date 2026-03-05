
// src/services/emailService.ts

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[];
}

// Convierte archivo en Base64
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
  });

// Envía el JSON al backend /api/send-enquiry
export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    const response = await fetch("/api/send-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error al enviar solicitud");

    return true;
  } catch (error) {
    console.error("Error sending enquiry:", error);
    return false;
  }
};
