
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key not found. AI Assistant will be unavailable.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const askStudioAssistant = async (question: string) => {
  try {
    const ai = getAI();
    if (!ai) return "Our studio is currently focused on redefining the boundaries of spatial experience.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: "You are the AI assistant for DB+, a world-class architectural and design studio. You speak with elegance, brevity, and deep architectural knowledge. Focus on 'DB+ Architecture', 'DB+ Design', 'DB+ Urbanism', and 'DB+ Interiors'.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our studio is currently focused on redefining the boundaries of spatial experience.";
  }
};