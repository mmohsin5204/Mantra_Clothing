import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'PLACEHOLDER_API_KEY') {
  console.warn('Gemini API key not found. AI Stylist chat will be disabled.');
}

const ai = (API_KEY && API_KEY !== 'PLACEHOLDER_API_KEY') ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateStylingAdvice = async (query) => {
  if (!ai) return "AI services are currently unavailable (Missing API Key).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a world-class men's fashion stylist named 'Mantra AI'. 
      Your tone is professional, trendy, and helpful. 
      The user will ask for advice. Give a concise, actionable 2-3 sentence tip.
      User Query: "${query}"`,
    });

    return response.text || "I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the fashion mainframe.";
  }
};

export const generateProductDescription = async (name, category) => {
  if (!ai) return "Enter a description manually.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, premium e-commerce product description for a men's clothing item.
      Item Name: ${name}
      Category: ${category}
      Tone: Sophisticated, modern, persuasive. 
      Length: Max 40 words.`,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description.";
  }
};
