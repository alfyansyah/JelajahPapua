
import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryRequest, ItineraryResponse } from "./types";

export const generateItinerary = async (params: ItineraryRequest): Promise<ItineraryResponse> => {
  // @ts-ignore
  const apiKey = process.env.API_KEY || '';
  
  if (!apiKey) {
    throw new Error("API Key configuration missing.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const langMap: Record<string, string> = {
    id: "Bahasa Indonesia",
    en: "English",
    zh: "Mandarin Chinese (Simplified)",
    de: "German"
  };

  const prompt = `You are a professional wilderness guide for "JelajahPapua" specifically for Papua, Indonesia.
  Create a nature exploration and conservation focused itinerary.
  
  Parameters:
  - Interest: ${params.interest}
  - Duration: ${params.duration} days
  - Budget Style: ${params.budget}
  
  CRITICAL: The entire response MUST be written in ${langMap[params.language]}.
  The tone should be inspiring and adventurous.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          dailyPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                activity: { type: Type.STRING },
                tips: { type: Type.STRING }
              },
              required: ["day", "activity", "tips"]
            }
          },
          essentials: { type: Type.ARRAY, items: { type: Type.STRING } },
          ecoTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "summary", "dailyPlan", "essentials", "ecoTips"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("AI failed to respond.");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};
