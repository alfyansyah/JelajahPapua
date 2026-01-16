
export interface Destination {
  id: string;
  name: string;
  region: string;
  category: 'cendrawasih' | 'island-hopping' | 'camping' | 'lake-sentani' | 'trekking';
  description: string;
  imageUrl: string;
  difficulty: 'Mudah' | 'Sedang' | 'Menantang';
  priceRange: string;
  adventureStats?: {
    elevation?: string;
    trekDistance?: string;
    wildlife?: string[];
  };
}

export interface ItineraryRequest {
  duration: number;
  interest: string;
  budget: 'Backpacker' | 'Standard' | 'Luxury';
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
