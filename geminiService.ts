
import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryRequest, ItineraryResponse } from "../types";

export const generateItinerary = async (params: ItineraryRequest): Promise<ItineraryResponse> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === '') {
    throw new Error("Kunci API (API_KEY) belum terpasang. Jika Anda pemilik website, silakan atur API_KEY di pengaturan hosting Anda.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const prompt = `Buatkan rencana perjalanan (itinerary) detail untuk liburan ke Papua dengan nama layanan "JelajahPapua".
  Fokus perjalanan: ${params.interest}. 
  Durasi: ${params.duration} hari. 
  Gaya perjalanan: ${params.budget}. 
  
  Pastikan mencakup destinasi yang relevan seperti:
  - Jelajah Danau Sentani (Desa Adat, Kuliner Papeda)
  - Trekking Pegunungan Cycloop (Air terjun, camping hutan)
  - Birdwatching Cendrawasih
  - Island Hopping gaya backpacker (Homestay lokal)
  
  Berikan tips praktis untuk budget ${params.budget} dan peralatan wajib. Output harus ramah, menginspirasi, dan informatif.`;

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
          }
        },
        required: ["title", "summary", "dailyPlan", "essentials"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("AI tidak memberikan respon.");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Gagal menyusun jadwal. Silakan coba lagi dalam beberapa saat.");
  }
};
