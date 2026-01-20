
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStudioInsight = async (category: string, projectName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an architectural critic for the studio DB+, write a very short, poetic 2-sentence design philosophy insight for a project named "${projectName}" in the category of "${category}". Focus on materials, light, and space.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Architecture is the art of balancing light and shadow in silence.";
  }
};

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
