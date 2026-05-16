import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI(apiKey);

export const generateStylingAdvice = async (query: string): Promise<string> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') return "AI services are currently unavailable (Missing API Key).";

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(`You are a world-class men's fashion stylist named 'Mantra AI'. 
      Your tone is professional, trendy, and helpful. 
      The user will ask for advice. Give a concise, actionable 2-3 sentence tip.
      User Query: "${query}"`);
    
    const result = await response.response;
    return result.text() || "I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the fashion mainframe.";
  }
};

export const generateProductDescription = async (name: string, category: string): Promise<string> => {
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') return "Enter a description manually.";

  try {
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(`Write a compelling, premium e-commerce product description for a men's clothing item.
      Item Name: ${name}
      Category: ${category}
      Tone: Sophisticated, modern, persuasive. 
      Length: Max 40 words.`);
    
    const result = await response.response;
    return result.text() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description.";
  }
};
