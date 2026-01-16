
import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryRequest, ItineraryResponse } from "../types";

export const generateItinerary = async (params: ItineraryRequest): Promise<ItineraryResponse> => {
  // @ts-ignore
  const apiKey = process.env.API_KEY || '';
  
  if (!apiKey) {
    throw new Error("Kunci API belum dikonfigurasi di Vercel Settings.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const prompt = `Anda adalah ahli petualangan alam liar (wilderness guide) khusus Papua untuk layanan "JelajahPapua".
  Buatkan rencana perjalanan (itinerary) yang SANGAT FOKUS PADA EKSPLORASI ALAM dan KONSERVASI.
  
  Parameter:
  - Fokus: ${params.interest}
  - Durasi: ${params.duration} hari
  - Gaya: ${params.budget}
  
  Output harus dalam Bahasa Indonesia yang menginspirasi jiwa petualang.`;

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
          essentials: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          ecoTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "summary", "dailyPlan", "essentials", "ecoTips"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("AI tidak memberikan respon.");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Gagal menyusun jadwal alam. Silakan coba lagi.");
  }
};
