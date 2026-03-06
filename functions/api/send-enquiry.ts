export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  files: { name: string; data: string; type: string }[];
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
  });

export const sendProjectEnquiry = async (data: EnquiryData): Promise<boolean> => {
  try {
    const res = await fetch("/api/send-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("API error:", await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
