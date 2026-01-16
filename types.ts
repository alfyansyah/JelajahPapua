
export type Language = 'id' | 'en' | 'zh' | 'de';

export interface TranslatedText {
  id: string;
  en: string;
  zh: string;
  de: string;
}

export interface Destination {
  id: string;
  name: string; // Nama tempat biasanya tetap
  region: string;
  category: 'cendrawasih' | 'island-hopping' | 'camping' | 'lake-sentani' | 'trekking';
  description: TranslatedText;
  imageUrl: string;
  difficulty: TranslatedText;
  priceRange: string;
  adventureStats?: {
    elevation?: string;
    trekDistance?: string;
    wildlife?: TranslatedText[];
  };
}

export interface ItineraryRequest {
  duration: number;
  interest: string;
  budget: string;
  language: Language;
}

export interface ItineraryResponse {
  title: string;
  summary: string;
  dailyPlan: {
    day: number;
    activity: string;
    tips: string;
  }[];
  essentials: string[];
  ecoTips: string[];
}
