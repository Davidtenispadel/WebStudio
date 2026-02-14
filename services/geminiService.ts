
import { GoogleGenAI } from "@google/genai";

// Initialize with direct access to process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Removed generateStudioInsight function

export const askStudioAssistant = async (question: string) => {
  try {
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